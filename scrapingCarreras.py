import requests
from bs4 import BeautifulSoup
import sqlite3

DB_PATH = "Backend/Backend/VocacionPlus.db"

def obtener_facultades():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT Id, Url FROM facultades WHERE Url IS NOT NULL")
    facultades = cursor.fetchall()
    conn.close()
    return facultades

def extraer_carreras(url):
    try:
        headers = {
            "User-Agent": (
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/138.0.0.0 Safari/537.36"
            )
        }
        r = requests.get(url, headers=headers, timeout=10)
        r.raise_for_status()
        soup = BeautifulSoup(r.text, "html.parser")

        # ejemplo genérico, dependerá del sitio
        carreras = []
        for item in soup.select(".carrera, .programa, .curso"):
            nombre = item.get_text(strip=True)
            if nombre:
                carreras.append({"Nombre": nombre})
        return carreras

    except Exception as e:
        print(f"Error con {url}: {e}")
        return []

def guardar_carreras(facultad_id, carreras):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    for c in carreras:
        cursor.execute("""
            INSERT INTO carreras (Nombre, FacultadId)
            VALUES (?, ?)
        """, (c["Nombre"], facultad_id))
    conn.commit()
    conn.close()

if __name__ == "__main__":
    facultades = obtener_facultades()
    for facultad_id, url in facultades:
        print(f"Extrayendo carreras de: {url}")
        carreras = extraer_carreras(url)
        guardar_carreras(facultad_id, carreras)
        print(f"{len(carreras)} carreras guardadas\n")
