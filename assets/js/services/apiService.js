(function () {
  const API_URL = "https://jsonplaceholder.typicode.com/todos";

  window.apiService = {
    async recuperarTareasDemo(limite = 3) {
      const respuesta = await fetch(`${API_URL}?_limit=${limite}`);

      if (!respuesta.ok) {
        throw new Error("No fue posible recuperar datos de la API.");
      }

      return respuesta.json();
    },

    async guardarTareaDemo(tarea) {
      const respuesta = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
          title: tarea.descripcion,
          completed: tarea.estado,
          userId: 1
        })
      });

      if (!respuesta.ok) {
        throw new Error("No fue posible sincronizar la tarea.");
      }

      return respuesta.json();
    }
  };
})();
