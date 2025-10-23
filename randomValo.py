import sqlite3
import random

DB_PATH = r"C:\Users\marti\OneDrive\Escritorio\tempo\VocacionPlus\Backend\Backend\VocacionPlus.db"

# Comentarios genéricos para mezclar
COMENTARIOS = [
    "Una experiencia académica muy buena, con docentes dedicados.",
    "El contenido de la carrera es interesante, aunque algo denso en algunos temas.",
    "Buena infraestructura y acompañamiento docente.",
    "Me gustaría que hubiera más práctica profesional.",
    "Excelente formación, pero la carga horaria es alta.",
    "Recomiendo esta carrera si te gusta investigar y resolver problemas.",
    "Las materias están bien estructuradas y actualizadas.",
    "Hay cosas para mejorar, pero en general estoy conforme.",
    "El nivel de exigencia es alto, pero vale la pena.",
    "Una carrera con muchas oportunidades laborales."
]

def randomizar_valoraciones():
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()

    cur.execute("SELECT Id FROM valoraciones")
    valoraciones = cur.fetchall()

    print(f"Total de valoraciones a actualizar: {len(valoraciones)}")

    for (id_val,) in valoraciones:
        nuevo_puntaje = random.randint(1, 5)
        nuevo_comentario = random.choice(COMENTARIOS)
        cur.execute("""
            UPDATE valoraciones
            SET Puntuacion = ?, Comentario = ?
            WHERE Id = ?
        """, (nuevo_puntaje, nuevo_comentario, id_val))

    conn.commit()
    conn.close()
    print("✅ Valoraciones actualizadas con éxito.")

if __name__ == "__main__":
    randomizar_valoraciones()
