import os
import requests
from ics import Calendar, Event
from datetime import datetime, timedelta
from dotenv import load_dotenv

# Cargar la API Key desde .env
load_dotenv()
TMDB_API_KEY = os.getenv("TMDB_API_KEY")

def obtener_estrenos(paginas=2, region="ES", idioma="es-ES"):
    estrenos = []

    for page in range(1, paginas + 1):
        url = "https://api.themoviedb.org/3/movie/upcoming"
        params = {
            "api_key": TMDB_API_KEY,
            "language": idioma,
            "region": region,
            "page": page
        }

        response = requests.get(url, params=params)
        if response.status_code == 200:
            data = response.json()
            estrenos.extend(data.get("results", []))
        else:
            print(f"Error al obtener la página {page}: {response.status_code}")

    return estrenos

def generar_calendario_ics(estrenos):
    calendario = Calendar()

    for peli in estrenos:
        if not peli.get("release_date"):
            continue

        fecha_estreno = datetime.strptime(peli["release_date"], "%Y-%m-%d").date()
        evento = Event()
        evento.name = peli["title"]
        evento.begin = fecha_estreno
        evento.make_all_day()  # 👈 esto marca el evento como "todo el día"
        evento.description = peli.get("overview", "Sin descripción.")
        evento.url = f"https://www.themoviedb.org/movie/{peli['id']}"

        calendario.events.add(evento)

    with open("estrenos.ics", "w", encoding="utf-8") as f:
        f.writelines(calendario)
    print("Archivo 'estrenos.ics' generado correctamente (eventos todo el día).")


if __name__ == "__main__":
    estrenos = obtener_estrenos(paginas=2)
    generar_calendario_ics(estrenos)
