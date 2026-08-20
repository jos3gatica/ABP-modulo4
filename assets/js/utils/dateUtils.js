(function () {
  window.dateUtils = {
    formatearFecha(fecha) {
      if (!fecha) {
        return "Sin fecha límite";
      }

      return new Intl.DateTimeFormat("es-CL", {
        dateStyle: "medium",
        timeStyle: "short"
      }).format(new Date(fecha));
    },

    tiempoRestante(fecha) {
      if (!fecha) {
        return "Sin vencimiento";
      }

      const diferencia = new Date(fecha).getTime() - Date.now();

      if (diferencia <= 0) {
        return "Vencida";
      }

      const minutos = Math.floor(diferencia / 60000);
      const dias = Math.floor(minutos / 1440);
      const horas = Math.floor((minutos % 1440) / 60);
      const minutosRestantes = minutos % 60;

      if (dias > 0) {
        return `Faltan ${dias} d ${horas} h`;
      }

      if (horas > 0) {
        return `Faltan ${horas} h ${minutosRestantes} min`;
      }

      return `Faltan ${Math.max(minutosRestantes, 1)} min`;
    },

    aFormatoInput(fecha) {
      return fecha ? new Date(fecha).toISOString().slice(0, 16) : "";
    }
  };
})();
