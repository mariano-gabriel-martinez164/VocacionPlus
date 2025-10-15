import sqlite3
import time
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By

DB_PATH = r"C:\Users\marti\OneDrive\Escritorio\tempo\VocacionPlus\Backend\Backend\VocacionPlus.db"

def obtener_facultades():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT Id, Url FROM facultades WHERE Url IS NOT NULL AND Url != ''")
    data = cursor.fetchall()
    conn.close()
    return data

def insertar_carrera(nombre, facultad_id):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO carreras (Nombre, Descripcion, FacultadId, PlanDeEstudio)
        VALUES (?, ?, ?, ?)
    """, (nombre, "", facultad_id, ""))
    conn.commit()
    conn.close()
    
def extraer_carreras_con_selenium(url):
    try:
        options = Options()
        options.add_argument("--headless=new")
        options.add_argument("--disable-gpu")
        options.add_argument("--no-sandbox")
        options.add_argument("--log-level=3")

        driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
        driver.set_page_load_timeout(25)
        driver.get(url)
        time.sleep(3)

        html = driver.page_source
        soup = BeautifulSoup(html, "html.parser")
        driver.quit()

        # Patrones de palabras útiles y no útiles
        palabras_clave = ["ingeniería", "licenciatura", "tecni", "profesorado", "abogacía", "medicina", "arquitectura", "contabilidad", "ciencias", "diseño", "computación", "informática", "administración", "bio", "farmacia"]
        palabras_ban = ["contacto", "noticias", "campus", "biblioteca", "acceso", "login", "postul", "convocatoria", "beca", "eventos", "inicio", "universidad", "facultad", "concursos", "cine", "cosmos", "blog"]

        selectores = [
            "a[href*='carrera']", "a[href*='programa']", "a[href*='grado']",
            "a[href*='licenciatura']", "a[href*='ingenieria']", 
            ".carrera", ".programa", ".oferta", "li", "td"
        ]

        carreras_encontradas = set()

        for sel in selectores:
            for tag in soup.select(sel):
                texto = tag.get_text(" ", strip=True).lower()
                if not texto:
                    continue
                # filtros de longitud y palabras clave
                if len(texto) < 8 or len(texto) > 100:
                    continue
                if any(p in texto for p in palabras_ban):
                    continue
                if any(p in texto for p in palabras_clave):
                    carreras_encontradas.add(texto.strip().capitalize())

        return list(carreras_encontradas)

    except Exception as e:
        print(f"Error en {url}: {e}")
        return []


if __name__ == "__main__":
    facultades = obtener_facultades()
    print(f"Total facultades a procesar: {len(facultades)}")

    for facultad_id, url in facultades:
        print(f"\nProcesando {url} (Facultad ID {facultad_id})...")
        carreras = extraer_carreras_con_selenium(url)
        if not carreras:
            print("No se encontraron carreras.")
            continue

        for nombre in carreras:
            insertar_carrera(nombre, facultad_id)
        print(f"{len(carreras)} carreras")

        time.sleep(2)  


