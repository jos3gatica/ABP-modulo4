(function () {
  const BASE_URL = "https://api.open-meteo.com/v1/forecast";
  const VALDIVIA = {
    latitude: -39.8142,
    longitude: -73.2459,
    timezone: "America/Santiago"
  };

  const descripciones = {
    0: "Cielo despejado",
    1: "Mayormente despejado",
    2: "Parcialmente nublado",
    3: "Cubierto",
    45: "Neblina",
    51: "Llovizna ligera",
    61: "Lluvia ligera",
    63: "Lluvia moderada",
    65: "Lluvia intensa",
    80: "Chubascos ligeros",
    81: "Chubascos moderados",
    95: "Tormenta eléctrica"
  };

  window.weatherService = {
    async obtenerClimaValdivia() {
      const parametros = new URLSearchParams({
        ...VALDIVIA,
        current: "temperature_2m,apparent_temperature,weather_code",
        daily: "temperature_2m_max,temperature_2m_min,precipitation_probability_max",
        forecast_days: "7"
      });

      const respuesta = await fetch(`${BASE_URL}?${parametros}`);

      if (!respuesta.ok) {
        throw new Error("No se pudo obtener el pronóstico meteorológico.");
      }

      const { current, daily } = await respuesta.json();

      return {
        temperatura: Math.round(current.temperature_2m),
        sensacion: Math.round(current.apparent_temperature),
        descripcion: descripciones[current.weather_code] || "Condición no disponible",
        maxima: Math.round(daily.temperature_2m_max[0]),
        minima: Math.round(daily.temperature_2m_min[0]),
        precipitacion: daily.precipitation_probability_max[0]
      };
    }
  };
})();
