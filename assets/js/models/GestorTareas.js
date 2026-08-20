(function () {
  class GestorTareas {
    constructor(tareas = []) {
      this.tareas = tareas.map((tarea) => {
        return tarea instanceof window.Tarea ? tarea : new window.Tarea(tarea);
      });
    }

    agregar(datos) {
      const tarea = new window.Tarea(datos);
      this.tareas = [...this.tareas, tarea];
      return tarea;
    }

    obtenerPorId(id) {
      return this.tareas.find((tarea) => tarea.id === id);
    }

    actualizar(id, datos) {
      const tarea = this.obtenerPorId(id);

      if (!tarea) {
        throw new Error("Tarea no encontrada.");
      }

      tarea.actualizar(datos);
      return tarea;
    }

    cambiarEstado(id) {
      const tarea = this.obtenerPorId(id);

      if (!tarea) {
        throw new Error("Tarea no encontrada.");
      }

      tarea.cambiarEstado();
      return tarea;
    }

    eliminar(id) {
      const tarea = this.obtenerPorId(id);

      if (!tarea) {
        throw new Error("Tarea no encontrada.");
      }

      this.tareas = this.tareas.filter((item) => item.eliminar() !== id);
      return tarea;
    }

    filtrar(filtro = "todas") {
      if (filtro === "pendientes") {
        return this.tareas.filter((tarea) => !tarea.estado);
      }

      if (filtro === "completadas") {
        return this.tareas.filter((tarea) => tarea.estado);
      }

      return [...this.tareas];
    }

    resumen() {
      const total = this.tareas.length;
      const completadas = this.tareas.filter((tarea) => tarea.estado).length;

      return {
        total,
        completadas,
        pendientes: total - completadas
      };
    }

    serializar() {
      return this.tareas.map((tarea) => tarea.toJSON());
    }
  }

  window.GestorTareas = GestorTareas;
})();
