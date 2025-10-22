import requests
from bs4 import BeautifulSoup
import sqlite3
import re
import time
from urllib.parse import urljoin

DB_PATH = r"C:\Users\marti\OneDrive\Escritorio\tempo\VocacionPlus\Backend\Backend\VocacionPlus.db"
URL = "https://es.wikipedia.org/wiki/Anexo:Universidades_privadas_de_Argentina"

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                  "AppleWebKit/537.36 (KHTML, like Gecko) "
                  "Chrome/138.0.0.0 Safari/537.36"
}

SOCIALS = ["facebook.com", "twitter.com", "youtube.com", "linkedin.com", "instagram.com"]
KEYWORDS_DIR = ["Av.", "Calle", "Ruta", "Direccion", "Av", "calle"]  # por si vienen sin punto


def actualizar_url(universidades):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    actualizadas = 0
    
    for u in universidades:
        cursor.execute("""
            UPDATE facultades
            SET Url = ?
            WHERE Nombre = ?
        """, (u["Url"], u["Nombre"]))
        if cursor.rowcount > 0:
            actualizadas += 1
        
    conn.commit()
    conn.close()
    print(f"se actualizaron {actualizadas} ")
    
# util: normalizar urls encontradas
def normalize_url(href, base=None):
    if not href:
        return ""
    href = href.strip()
    if href.startswith("//"):
        return "https:" + href
    if href.startswith("http://") or href.startswith("https://"):
        return href
    if href.startswith("www."):
        return "https://" + href
    if href.startswith("/"):
        if base:
            return urljoin(base, href)
        return "https://es.wikipedia.org" + href
    # fallback: si es relativo y tenemos base
    if base and not href.startswith("#"):
        return urljoin(base, href)
    return href

# buscar correo/tel dentro de un BeautifulSoup (tambien intenta regex sobre el texto)
def buscar_contacto_soup(soup_local, correo_actual, telefono_actual):
    text = soup_local.get_text(" ", strip=True)
    # enlaces mailto / tel
    for a in soup_local.find_all("a", href=True):
        href = a["href"]
        if "mailto:" in href and not correo_actual:
            correo_actual = href.split("mailto:", 1)[1].split("?")[0].strip()
            print("   -> correo (mailto) encontrado:", correo_actual)
        if href.startswith("tel:") and not telefono_actual:
            telefono_actual = href.split("tel:", 1)[1].strip()
            print("   -> telefono (tel) encontrado:", telefono_actual)

    # si no encontro mail, intentar extraer con regex del texto
    if not correo_actual:
        m = re.search(r"[A-Za-z0-9.\-_+%]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}", text)
        if m:
            correo_actual = m.group(0)
            print("   -> correo (regex) extraído:", correo_actual)

    # si no encontro telefono, intentar regex razonable
    if not telefono_actual:
        # busca cadenas con números, permitiendo +, espacios, (), - y al menos 7 dígitos en total
        m = re.search(r"(\+?\d[\d\-\s().]{6,}\d)", text)
        if m:
            telefono_candidate = m.group(1).strip()
            # filtro básico: evitar capturar años o codes cortos
            digits = re.sub(r"\D", "", telefono_candidate)
            if len(digits) >= 7:
                telefono_actual = telefono_candidate
                print("   -> telefono (regex) extraído:", telefono_actual)

    return correo_actual, telefono_actual

def scrape_privadas():
    res = requests.get(URL, headers=HEADERS, timeout=15)
    res.raise_for_status()
    soup = BeautifulSoup(res.text, "html.parser")

    # buscar la tabla con caption "Universidades privadas"
    tabla_obj = None
    for t in soup.find_all("table"):
        cap = t.find("caption")
        if cap and "Universidades privadas" in cap.get_text():
            tabla_obj = t
            break
    if not tabla_obj:
        print("No se encontró la tabla principal de privadas.")
        return []

    universidades = []
    tbody = tabla_obj.find("tbody") or tabla_obj
    filas = tbody.find_all("tr")
    # saltar header si existe (primera fila que tiene th)
    for fila in filas:
        # ignorar filas de header
        if fila.find("th"):
            continue

        celdas = fila.find_all("td")
        # necesitamos al menos 8 columnas según vos
        if len(celdas) < 8:
            continue

        # nombre
        enlace = celdas[0].find("a")
        if enlace:
            nombre = enlace.get_text(strip=True)
            url_wiki = normalize_url(enlace.get("href", ""), base="https://es.wikipedia.org")
        else:
            nombre = celdas[0].get_text(strip=True)
            url_wiki = ""

        # dirección: columna 3 (índice 2)
        direccion = celdas[2].get_text(" ", strip=True)

        # link oficial: columna 7 (índice 6)
        enlace_oficial_tag = celdas[6].find("a")
        url_oficial = ""
        if enlace_oficial_tag:
            url_oficial = normalize_url(enlace_oficial_tag.get("href", ""), base=None)

        # si el enlace oficial está vacío, fallback al link wiki
        url_final = url_oficial if url_oficial else url_wiki
        print(f"direccion NUEVA {nombre} : {direccion}")
        universidades.append({
            "Nombre": nombre,
            "Direccion": direccion,
            "UrlOficial": url_oficial,
            "Url": url_final
        })
        print(f"Encontrada: {nombre} | Dir: {direccion} | Oficial: {url_oficial or '(no)'}")

    print(f"\nTotal privadas detectadas: {len(universidades)}")
    return universidades

def scrape_publicas():
    URL_PUBLICAS = "https://es.wikipedia.org/wiki/Anexo:Universidades_nacionales_de_Argentina"

    res = requests.get(URL_PUBLICAS, headers=HEADERS, timeout=15)
    res.raise_for_status()
    soup = BeautifulSoup(res.text, "html.parser")
    
    # buscar la tabla más grande que parezca contener universidades
    tablas = [t for t in soup.find_all("table") if len(t.find_all("tr")) > 5]  # tablas con al menos 5 filas
    if tablas:
        tabla_obj = tablas[0]  # normalmente la primera es la que nos interesa
    else:
        print("No se encontró ninguna tabla válida de públicas.")
        return []

    tbody = tabla_obj.find("tbody") or tabla_obj
    filas = tbody.find_all("tr")

    universidades = []
    for fila in filas:
        if fila.find("th"):
            continue

        celdas = fila.find_all("td")
        if len(celdas) < 7:
            continue

        # nombre
        enlace = celdas[0].find("a")
        if enlace:
            nombre = enlace.get_text(strip=True)
            url_wiki = normalize_url(enlace.get("href", ""), base="https://es.wikipedia.org")
        else:
            nombre = celdas[0].get_text(strip=True)
            url_wiki = ""

        # dirección: columna 3 (índice 2)
        direccion = celdas[2].get_text(" ", strip=True)

        # link oficial: columna 7 (índice 6)
        enlace_oficial_tag = celdas[6].find("a")
        url_oficial = ""
        if enlace_oficial_tag:
            url_oficial = normalize_url(enlace_oficial_tag.get("href", ""), base=None)

        url_final = url_oficial if url_oficial else url_wiki
        print(f"direccion NUEVA {nombre} : {direccion}")
        universidades.append({
            "Nombre": nombre,
            "Direccion": direccion,
            "UrlOficial": url_oficial,
            "Url": url_final
        })
        print(f"Encontrada: {nombre} | Dir: {direccion} | Oficial: {url_oficial or '(no)'}")

    print(f"\nTotal públicas detectadas: {len(universidades)}")
    return universidades

def upsert_and_enrich(universidades):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    for uni in universidades:
        nombre = uni["Nombre"]
        direccion_col = uni["Direccion"]
        url_oficial = uni["Url"] 
        url_oficial = normalize_url(url_oficial, base=None)

        # primero intentar extraer contacto desde el sitio oficial
        nuevo_correo = ""
        nuevo_telefono = ""
        # evitamos query excesivos: si no hay url_oficial, saltamos búsqueda
        if url_oficial:
            print(f"\n-> Accediendo a sitio oficial para {nombre}: {url_oficial}")
            try:
                res2 = requests.get(url_oficial, headers=HEADERS, timeout=12)
                res2.raise_for_status()
                soup2 = BeautifulSoup(res2.text, "html.parser")

                # buscar en la página principal
                nuevo_correo, nuevo_telefono = buscar_contacto_soup(soup2, nuevo_correo, nuevo_telefono)

                # buscar subpáginas de contacto si hace falta
                if not nuevo_correo or not nuevo_telefono:
                    subpag = []
                    for a in soup2.find_all("a", href=True):
                        href = a["href"]
                        low = href.lower()
                        if any(word in low for word in ["contact", "contacto", "contactanos", "contáct", "contacte"]):
                            link = normalize_url(href, base=url_oficial)
                            if link and link not in subpag:
                                subpag.append(link)
                    if subpag:
                        print("   Subpáginas contacto:", subpag)
                    for sc in subpag:
                        if nuevo_correo and nuevo_telefono:
                            break
                        try:
                            time.sleep(0.25)
                            print("    -> entrando a subpágina:", sc)
                            res3 = requests.get(sc, headers=HEADERS, timeout=10)
                            res3.raise_for_status()
                            soup3 = BeautifulSoup(res3.text, "html.parser")
                            nuevo_correo, nuevo_telefono = buscar_contacto_soup(soup3, nuevo_correo, nuevo_telefono)
                        except Exception as e:
                            print("    No se pudo abrir subpágina:", sc, e)
            except Exception as e:
                print("   No se pudo acceder al sitio oficial:", e)

        # ahora comprobar si existe la uni en la DB
        nombre_norm = nombre.strip().lower()
        cursor.execute("SELECT rowid, Telefono, Correo, Direccion, Url FROM facultades WHERE LOWER(Nombre) = ?", (nombre_norm,))
        existing = cursor.fetchone()
        if existing:
            rowid_existing, tel_exist, mail_exist, dir_exist, url_exist = existing
            # si hay nuevos datos y campos vacíos en DB, actualizamos solamente los campos vacíos
            tel_new = tel_exist if tel_exist else (nuevo_telefono or "")
            mail_new = mail_exist if mail_exist else (nuevo_correo or "")
            dir_new = direccion_col or dir_exist or ""
            url_new = url_oficial or ""

            # decide si actualizar
            if (tel_new != tel_exist) or (mail_new != mail_exist) or (dir_new != dir_exist) or (url_new != url_exist):
                cursor.execute("""
                    UPDATE facultades
                    SET Direccion = ?, Telefono = ?, Correo = ?, Url = ?
                    WHERE rowid = ?
                """, (dir_new, tel_new, mail_new, url_new, rowid_existing))
                conn.commit()
                print(f"  -> Actualizado existente rowid {rowid_existing}: Dir='{dir_new}' Tel='{tel_new}' Mail='{mail_new}' Url='{url_new}'")
            else:
                print(f"  -> Ya existe y está completo: {nombre}")
        else:
            # insertar nuevo registro
            cursor.execute("""
                INSERT INTO facultades (Nombre, Telefono, Correo, Accesibilidad, Descripcion, Direccion, Imagen, Url)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                nombre,
                nuevo_telefono or "",
                nuevo_correo or "",
                False,
                "",
                direccion_col or "",
                "",
                url_oficial or uni["UrlWiki"] or ""
            ))
            conn.commit()
            print(f"  -> Insertado nuevo: {nombre}  (Tel: {nuevo_telefono} Mail: {nuevo_correo})")

        # ser un poco cortés con los servidores
        time.sleep(0.2)

    conn.close()
    print("\nProceso completado: DB actualizada.")

if __name__ == "__main__":
    print("==== PRIVADAS ====")
    privadas = scrape_privadas()
    actualizar_url(privadas)
    upsert_and_enrich(privadas)

    print("\n==== PÚBLICAS ====")
    publicas = scrape_publicas()
    actualizar_url(publicas)
    upsert_and_enrich(publicas)
