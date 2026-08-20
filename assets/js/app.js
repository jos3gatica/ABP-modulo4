(function () {
  const gestor = new window.GestorTareas(window.storageService.obtenerTareas());
  let filtroActual = "todas";

  const elementos = {
    form: document.querySelector("#task-form"),
    id: document.querySelector("#task-id"),
    descripcion: document.querySelector("#description"),
    fechaLimite: document.querySelector("#due-date"),
    prioridad: document.querySelector("#priority"),
    contador: document.querySelector("#character-counter"),
    mensaje: document.querySelector("#form-message"),
    submit: document.querySelector("#submit-button"),
    cancelar: document.querySelector("#cancel-edit-button"),
    lista: document.querySelector("#task-list"),
    sincronizar: document.querySelector("#sync-button"),
    actualizarClima: document.querySelector("#weather-refresh-button")
  };

  function persistirYRenderizar() {
    window.storageService.guardarTareas(gestor.serializar());
    window.renderizarTareas(gestor.filtrar(filtroActual));
    window.renderizarResumen(gestor.resumen());
  }

  function restablecerFormulario() {
    elementos.form.reset();
    elementos.id.value = "";
    elementos.submit.textContent = "Agregar tarea";
    elementos.cancelar.classList.add("hidden");
    elementos.mensaje.textContent = "";
    elementos.mensaje.classList.remove("error");
    elementos.contador.textContent = "0 / 140 caracteres";
  }

  async function cargarClima() {
    const contenido = document.querySelector("#weather-content");

    contenido.innerHTML = '<p class="muted">Actualizando condiciones meteorológicas…</p>';

    try {
      const clima = await window.weatherService.obtenerClimaValdivia();
      window.renderizarClima(clima);
    } catch (error) {
      contenido.innerHTML = `
        <p class="muted">
          No fue posible cargar el clima. La gestión de tareas continúa disponible.
        </p>
      `;
      window.notificar(error.message, "error");
    }
  }

  function editarTarea(id) {
    const tarea = gestor.obtenerPorId(id);

    if (!tarea) {
      return;
    }

    elementos.id.value = tarea.id;
    elementos.descripcion.value = tarea.descripcion;
    elementos.fechaLimite.value = window.dateUtils.aFormatoInput(tarea.fechaLimite);
    elementos.prioridad.value = tarea.prioridad;
    elementos.contador.textContent = `${tarea.descripcion.length} / 140 caracteres`;
    elementos.submit.textContent = "Guardar cambios";
    elementos.cancelar.classList.remove("hidden");
    elementos.descripcion.focus();
  }

  async function sincronizarTareasDemo() {
    elementos.sincronizar.disabled = true;
    elementos.sincronizar.textContent = "Sincronizando…";

    try {
      const tareasRemotas = await window.apiService.recuperarTareasDemo();

      tareasRemotas.forEach(({ title, completed }) => {
        const existe = gestor.tareas.some((tarea) => tarea.descripcion === title);

        if (!existe) {
          gestor.agregar({
            descripcion: title,
            estado: completed,
            prioridad: "baja"
          });
        }
      });

      persistirYRenderizar();
      window.notificar("Tareas demo sincronizadas.");
    } catch (error) {
      window.notificar(error.message, "error");
    } finally {
      elementos.sincronizar.disabled = false;
      elementos.sincronizar.textContent = "Sincronizar demo";
    }
  }

  elementos.form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const descripcion = elementos.descripcion.value.trim();

    if (!descripcion) {
      elementos.mensaje.textContent = "Escribe una descripción para continuar.";
      elementos.mensaje.classList.add("error");
      elementos.descripcion.focus();
      return;
    }

    const id = elementos.id.value;
    const datos = {
      descripcion,
      fechaLimite: elementos.fechaLimite.value || null,
      prioridad: elementos.prioridad.value
    };

    elementos.submit.disabled = true;
    elementos.mensaje.textContent = id ? "Actualizando tarea…" : "Agregando tarea…";
    elementos.mensaje.classList.remove("error");

    setTimeout(async () => {
      try {
        const tarea = id
          ? gestor.actualizar(id, datos)
          : gestor.agregar(datos);

        persistirYRenderizar();
        restablecerFormulario();

        window.notificar(
          id ? "Tarea actualizada correctamente." : "Tarea agregada correctamente."
        );

        if (!id) {
          try {
            await window.apiService.guardarTareaDemo(tarea);
          } catch (error) {
            console.warn("La tarea se guardó localmente, sin sincronización remota.", error);
          }
        }
      } catch (error) {
        elementos.mensaje.textContent = error.message;
        elementos.mensaje.classList.add("error");
        window.notificar(error.message, "error");
      } finally {
        elementos.submit.disabled = false;
      }
    }, 700);
  });

  elementos.descripcion.addEventListener("keyup", ({ target }) => {
    elementos.contador.textContent = `${target.value.length} / 140 caracteres`;

    if (target.value.trim()) {
      elementos.mensaje.textContent = "";
      elementos.mensaje.classList.remove("error");
    }
  });

  elementos.lista.addEventListener("click", ({ target }) => {
    const boton = target.closest("button[data-action]");

    if (!boton) {
      return;
    }

    const id = boton.closest(".task-item").dataset.id;

    try {
      if (boton.dataset.action === "toggle") {
        gestor.cambiarEstado(id);
        persistirYRenderizar();
        window.notificar("Estado actualizado.");
      }

      if (boton.dataset.action === "delete") {
        gestor.eliminar(id);
        persistirYRenderizar();
        window.notificar("Tarea eliminada.");
      }

      if (boton.dataset.action === "edit") {
        editarTarea(id);
      }
    } catch (error) {
      window.notificar(error.message, "error");
    }
  });

  document.querySelector(".filters").addEventListener("click", ({ target }) => {
    const boton = target.closest("[data-filter]");

    if (!boton) {
      return;
    }

    filtroActual = boton.dataset.filter;

    document.querySelectorAll(".filter-button").forEach((item) => {
      item.classList.toggle("is-active", item === boton);
    });

    persistirYRenderizar();
  });

  elementos.lista.addEventListener("mouseover", ({ target }) => {
    const item = target.closest(".task-item");

    if (item) {
      item.title = "Usa los controles para completar, editar o eliminar.";
    }
  });

  elementos.cancelar.addEventListener("click", restablecerFormulario);
  elementos.actualizarClima.addEventListener("click", cargarClima);
  elementos.sincronizar.addEventListener("click", sincronizarTareasDemo);

  persistirYRenderizar();
  cargarClima();

  setInterval(() => {
    window.renderizarTareas(gestor.filtrar(filtroActual));
  }, 60000);
})();
