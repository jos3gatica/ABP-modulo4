(function () {
  window.renderizarTareas = function renderizarTareas(tareas) {
    const lista = document.querySelector("#task-list");
    const estadoVacio = document.querySelector("#empty-state");
    const template = document.querySelector("#task-template");
    const fragmento = document.createDocumentFragment();

    lista.replaceChildren();
    estadoVacio.classList.toggle("hidden", tareas.length > 0);

    tareas.forEach((tarea) => {
      const item = template.content.firstElementChild.cloneNode(true);
      const badge = item.querySelector(".priority-badge");
      const metadata = item.querySelector(".task-meta");

      item.dataset.id = tarea.id;
      item.classList.toggle("is-completed", tarea.estado);
      item.querySelector(".task-description").textContent = tarea.descripcion;

      badge.textContent = tarea.prioridad;
      badge.classList.add(tarea.prioridad);

      metadata.textContent = tarea.fechaLimite
        ? `Límite: ${window.dateUtils.formatearFecha(tarea.fechaLimite)} · ${window.dateUtils.tiempoRestante(tarea.fechaLimite)}`
        : "Sin fecha límite";

      fragmento.append(item);
    });

    lista.append(fragmento);
  };

  window.renderizarResumen = function renderizarResumen({
    total,
    pendientes,
    completadas
  }) {
    document.querySelector("#total-count").textContent = total;
    document.querySelector("#pending-count").textContent = pendientes;
    document.querySelector("#completed-count").textContent = completadas;
  };

  window.renderizarClima = function renderizarClima(clima) {
    const contenido = document.querySelector("#weather-content");

    contenido.innerHTML = `
      <p class="weather-temperature">${clima.temperatura}°C</p>
      <p><strong>${clima.descripcion}</strong></p>
      <p class="weather-details">
        Sensación ${clima.sensacion}°C · Máx. ${clima.maxima}°C · Mín. ${clima.minima}°C
      </p>
      <p class="weather-details">
        Probabilidad máxima de precipitación: ${clima.precipitacion}%
      </p>
    `;
  };
})();
