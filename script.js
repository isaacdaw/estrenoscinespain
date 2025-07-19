document.addEventListener("DOMContentLoaded", async function () {
  const calendarEl = document.getElementById("calendar");
  const events = await obtenerEventos();

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    locale: "es",
    events: events,
  });

  calendar.render();
});

async function obtenerEventos() {
  const events = [];

  for (let page of [1, 2]) {
    try {
      const response = await fetch(`/.netlify/functions/tmdb?page=${page}`);
      const data = await response.json();

      if (data.results && Array.isArray(data.results)) {
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
        console.warn("No se encontraron resultados en la página", page, data);
      }
    } catch (error) {
      console.error("Error al cargar estrenos:", error);
    }
  }

  return events;
}
