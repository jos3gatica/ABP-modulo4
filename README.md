# TaskFlow — ABP Módulo 4

Aplicación de gestión de tareas en JavaScript clásico, organizada por responsabilidades y sin dependencias externas de ejecución.

## Ejecución

Descomprime el ZIP y abrir `taskflow/index.html` en un navegador.

## Funcionalidades

- Crear, editar, completar, eliminar y filtrar tareas.
- POO: clases `Tarea` y `GestorTareas`.
- ES6+: `const`, `let`, clases, funciones flecha, template literals, destructuring y spread.
- Eventos `submit`, `click`, `keyup` y `mouseover`.
- Retardo controlado con `setTimeout` y actualización de vencimientos con `setInterval`.
- Persistencia de tareas con `localStorage`.
- Clima de Valdivia mediante Open-Meteo.
- Lectura y envío demostrativo a JSONPlaceholder con `fetch`, `async/await` y `try/catch`.

## Organización

```text
assets/
├── css/styles.css
└── js/
    ├── app.js
    ├── models/
    ├── services/
    ├── ui/
    └── utils/
docs/informe-tecnico.md
```

## Observación (para despliegue local)
> Si el navegador restringe llamadas `fetch` al abrir archivos mediante `file://`, el clima y la sincronización pueden no cargar; la gestión local de tareas permanece funcional.
