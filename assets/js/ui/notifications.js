(function () {
  window.notificar = function notificar(mensaje, tipo = "success") {
    const contenedor = document.querySelector("#notification-container");
    const notificacion = document.createElement("div");

    notificacion.className = `notification ${tipo}`;
    notificacion.textContent = mensaje;
    contenedor.append(notificacion);

    setTimeout(() => {
      notificacion.remove();
    }, 4200);
  };
})();
