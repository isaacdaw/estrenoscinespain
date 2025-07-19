async function obtenerEventos() {
  const events = [];

  for (let page of [1, 2]) {
    try {
      const response = await fetch(`/.netlify/functions/tmdb?page=${page}`);
      const data = await response.json();

      if (data.results) {
        data.results.forEach((movie) => {
          if (movie.release_date) {
            events.push({
              title: movie.title,
              start: movie.release_date,
              allDay: true,
            });
          }
        });
      } else {
        console.warn("Respuesta sin 'results':", data);
      }
    } catch (error) {
      console.error("Error al obtener datos de estrenos:", error);
    }
  }

  return events;
}
