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
    const response = await fetch(`/.netlify/functions/tmdb?page=${page}`);
    const data = await response.json();

    data.results.forEach((movie) => {
      if (movie.release_date) {
        events.push({
          title: movie.title,
          start: movie.release_date,
          allDay: true,
        });
      }
    });
  }

  return events;
}
