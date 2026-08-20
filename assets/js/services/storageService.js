(function () {
  const STORAGE_KEY = "taskflow:tareas";

  window.storageService = {
    obtenerTareas() {
      try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
      } catch (error) {
        console.warn("localStorage no está disponible", error);
        return [];
      }
    },

    guardarTareas(tareas) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tareas));
        return true;
      } catch (error) {
        console.warn("No se pudieron guardar las tareas", error);
        return false;
      }
    }
  };
})();
