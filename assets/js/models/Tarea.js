(function () {
  function generarId() {
    if (window.crypto && typeof window.crypto.randomUUID === "function") {
      return window.crypto.randomUUID();
    }

    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  class Tarea {
    constructor({
      id = generarId(),
      descripcion,
      estado = false,
      fechaCreacion = new Date().toISOString(),
      fechaLimite = null,
      prioridad = "media"
    }) {
      this.id = id;
      this.descripcion = descripcion.trim();
      this.estado = estado;
      this.fechaCreacion = fechaCreacion;
      this.fechaLimite = fechaLimite || null;
      this.prioridad = prioridad;
    }

    cambiarEstado() {
      this.estado = !this.estado;
      return this.estado;
    }

    eliminar() {
      return this.id;
    }

    actualizar({ descripcion, fechaLimite, prioridad }) {
      this.descripcion = descripcion.trim();
      this.fechaLimite = fechaLimite || null;
      this.prioridad = prioridad;
    }

    toJSON() {
      return {
        id: this.id,
        descripcion: this.descripcion,
        estado: this.estado,
        fechaCreacion: this.fechaCreacion,
        fechaLimite: this.fechaLimite,
        prioridad: this.prioridad
      };
    }
  }

  window.Tarea = Tarea;
})();
