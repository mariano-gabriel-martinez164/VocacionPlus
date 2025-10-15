import requests
from bs4 import BeautifulSoup
import sqlite3

# Ruta de la base de datos
DB_PATH = r"C:\Users\marti\OneDrive\Escritorio\tempo\VocacionPlus\Backend\Backend\VocacionPlus.db"

# URL fuente (privadas)
URL = "https://es.wikipedia.org/wiki/Anexo:Universidades_privadas_de_Argentina"


# --- Scraping ---
def obtener_facultades():
    print("Obteniendo universidades privadas desde Wikipedia...")
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                      "AppleWebKit/537.36 (KHTML, like Gecko) "
                      "Chrome/138.0.0.0 Safari/537.36"
    }
    res = requests.get(URL, headers=headers)
    res.raise_for_status()
    soup = BeautifulSoup(res.text, "html.parser")

    # Buscar la tabla principal
    tablas = []
    for t in soup.find_all("table"):
        caption = t.find("caption")
        if caption and "Universidades privadas" in caption.get_text():
            tablas.append(t)

    print(f"Tablas encontradas: {len(tablas)}")
    universidades = []

    for tabla in tablas:
        tbody = tabla.find("tbody")
        if not tbody:
            continue
        filas = tbody.find_all("tr")
        for fila in filas:
            celdas = fila.find_all("td")
            if len(celdas) < 8:
                continue

            enlace = celdas[0].find("a")
            if enlace:
                nombre = enlace.get_text(strip=True)
                url_wiki = "https://es.wikipedia.org" + enlace["href"]
            else:
                nombre = celdas[0].get_text(strip=True)
                url_wiki = ""

            direccion = celdas[3].get_text(strip=True)
            enlace_oficial = celdas[7].find("a")
            url_oficial = ""
            if enlace_oficial:
                url_oficial = enlace_oficial["href"]
                if not url_oficial.startswith("http"):
                    url_oficial = "https://" + url_oficial

            universidad = {
                "Nombre": nombre,
                "Telefono": "",
                "Correo": "",
                "Accesibilidad": False,
                "Descripcion": "",
                "Direccion": direccion,
                "Imagen": "",
                "Url": url_oficial if url_oficial else url_wiki

            }
            universidades.append(universidad)
            print(f"Procesada: {nombre} | {url_oficial or url_wiki}")

    print(f"\nTotal: {len(universidades)} universidades.")
    return universidades

# --- Inserción en SQLite ---
def insertar_en_bd(universidades):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    insertadas = 0
    for u in universidades:
        cursor.execute("SELECT 1 FROM facultades WHERE Nombre = ?", (u["Nombre"],))
        if cursor.fetchone():
            print(f"{u['Nombre']} ya existe, se salta")
            continue

        cursor.execute("""
            INSERT INTO facultades (Nombre, Telefono, Correo, Accesibilidad, Descripcion, Direccion, Imagen, Url)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            u["Nombre"], u["Telefono"], u["Correo"], u["Accesibilidad"],
            u["Descripcion"], u["Direccion"], u["Imagen"], u["Url"]
        ))
        insertadas += 1

    conn.commit()
    conn.close()
    print(f"{insertadas} registros insertados en la base de datos.")


if __name__ == "__main__":
    facultades = obtener_facultades()
    insertar_en_bd(facultades)
