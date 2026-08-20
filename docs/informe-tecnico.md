# Informe breve — TaskFlow

## Arquitectura

TaskFlow está organizado por responsabilidad. `models` contiene las clases `Tarea` y `GestorTareas`; `services` maneja `localStorage`, Open-Meteo y JSONPlaceholder; `ui` concentra el renderizado y las notificaciones; y `utils` resuelve formato de fechas y conteo regresivo.

## Requerimientos implementados

La aplicación aplica POO y sintaxis ES6+, maneja eventos de formulario, clicks, keyup y mouseover, actualiza el DOM dinámicamente, usa `setTimeout` para simular retardo y `setInterval` para actualizar fechas límite. Las tareas se guardan en `localStorage`; además, se consulta Open-Meteo y JSONPlaceholder con `fetch`, `async/await` y control de errores con `try/catch`.
