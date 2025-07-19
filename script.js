document.addEventListener("DOMContentLoaded", async function () {
  const calendarEl = document.getElementById("calendar");
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalPoster = document.getElementById("modal-poster");
  const modalOverview = document.getElementById("modal-overview");
  const modalClose = document.getElementById("modal-close");

  // Al cerrar modal
  modalClose.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Cerrar modal si se hace click fuera del contenido
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

  // Obtener eventos con detalles de películas (incluyendo overview y poster_path)
  const events = await obtenerEventos();

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    locale: "es",
    events: events,
    eventClick: function (info) {
      const event = info.event.extendedProps.fullData;

      modalTitle.textContent = event.title;
      if (event.poster_path) {
        modalPoster.src = `https://image.tmdb.org/t/p/w300${event.poster_path}`;
        modalPoster.style.display = "block";
      } else {
        modalPoster.style.display = "none";
      }
      modalOverview.textContent =
        event.overview || "Sin descripción disponible.";

      modal.style.display = "flex";
    },
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
              extendedProps: { fullData: movie }, // Guardamos toda la info para el popup
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
