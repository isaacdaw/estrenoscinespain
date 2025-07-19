document.addEventListener('DOMContentLoaded', async function () {
  const calendarEl = document.getElementById('calendar');
  const events = await obtenerEventos();

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    locale: 'es',
    events: events
  });

  calendar.render();
});

async function obtenerEventos() {
  const response = await fetch('/.netlify/functions/estrenos');
  const data = await response.json();

  return data.map(peli => ({
    title: peli.title,
    start: peli.release_date,
    allDay: true,
    url: `https://www.themoviedb.org/movie/${peli.id}`
  }));
}
