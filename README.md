# Rage Store — Tienda de videojuegos

Proyecto de **Desarrollo Frontend I** — Duoc UC · Autora: **Ambar Aguilar**

- Sitio publicado: <https://ambaraguilar93.github.io/tienda_videojuegosRageStore/>
- Repositorio: <https://github.com/ambaraguilar93/tienda_videojuegosRageStore>

## ¿Qué es?

Una tienda online de videojuegos hecha con **React + Vite** y **Bootstrap 5**. Muestra el
catálogo en tarjetas, tiene carrito de compras y, para la **EFT (Semana 9)**, suma filtro
por categoría, formulario de contacto y gestión del catálogo.

## Qué se agregó en la EFT

| Función | Cómo funciona |
|---|---|
| **Filtro por categoría** | Botones (Acción, RPG, Deportes, etc.) que muestran solo esos juegos. Se pueden combinar con el buscador. |
| **Formulario de contacto** | Pide nombre, correo y mensaje. Si falta algo o el correo es incorrecto, muestra el error bajo el campo. |
| **Agregar videojuegos** | Formulario con validación. Si la categoría es nueva, aparece sola en el filtro. |
| **Eliminar videojuegos** | Botón en cada tarjeta, con confirmación. También lo quita del carrito. |

> Agregar y eliminar se guardan en el estado de React: al recargar la página el catálogo vuelve al original.

## Mejoras según la retroalimentación de la Semana 8

- **Cancelar solicitudes (`AbortController`):** si la carga del catálogo queda pendiente y la persona sale o reintenta, se cancela. Una cancelación no se muestra como error.
- **Indicadores de espera:** al enviar el contacto o guardar un juego, el botón se deshabilita y muestra un spinner ("Enviando mensaje…"). Después recupera el foco.
- **Estados claros:** cada acción muestra espera, éxito o error.

> El envío y el guardado son simulados, pero funcionan como lo harían con un servidor real.

## Cómo ejecutarlo

Necesitas [Node.js](https://nodejs.org/) 18 o superior.

```bash
git clone https://github.com/ambaraguilar93/tienda_videojuegosRageStore.git
cd tienda_videojuegosRageStore
npm install
npm run dev
```

Abre la dirección que muestra la terminal **con la ruta base**, por ejemplo
`http://localhost:5173/tienda_videojuegosRageStore/`.

Otros comandos:

| Comando | Para qué sirve |
|---|---|
| `npm run build` | Compila el sitio en la carpeta `dist/` |
| `npm run preview` | Prueba el sitio compilado |
| `npm run deploy` | Compila y publica en GitHub Pages |

> No abras `index.html` con doble clic, el catálogo se carga con `fetch` y necesita un servidor.

## Cómo usarlo

1. **Filtrar:** presiona una categoría ("Todas" muestra todo).
2. **Agregar:** completa *Agregar un videojuego* y presiona *Agregar al catálogo*.
3. **Eliminar:** presiona *Eliminar* en una tarjeta y confirma.
4. **Contacto:** completa el formulario al final de la página.
5. **Carrito:** agrega juegos con *Agregar al carrito* y ábrelo con el botón flotante.

## Estructura

```
public/data/productos.json   Catálogo (con categoría de cada juego)
src/
├── App.jsx                  Estado principal y unión de los componentes
├── components/              Un archivo por componente
│   ├── FiltroCategorias.jsx, FormularioContacto.jsx,
│   ├── FormularioAgregarProducto.jsx, BotonConEspera.jsx   ← nuevos en la EFT
│   └── Carrito, TarjetaProducto, ListaProductos, Buscador, etc.
├── utils/                   Funciones reutilizables
│   ├── productos.js         Carga (fetch cancelable), filtros, crear producto
│   ├── validaciones.js      Validación de los dos formularios
│   ├── espera.js            Esperas cancelables
│   └── carrito.js, precios.js
└── hooks/useFocoAtrapado.js Manejo del foco en el carrito y el modal
```

Los datos pasan de `App` a los componentes por **props**, y los cambios suben a `App`
mediante funciones (`onAgregar`, `onEliminar`, `onCambiar`).

## Tecnologías

React 19 · Vite · Bootstrap 5 · JavaScript · HTML5 · CSS3 · GitHub Pages (`gh-pages`)

## Pruebas realizadas

- Filtro por categoría (solo y con el buscador), agregar y eliminar juegos.
- Formularios con campos vacíos, correo incorrecto y datos correctos.
- Cancelación de la carga, reintento tras un error y botones con spinner.
- Pantallas de 375, 768 y 1280 px sin desbordes.

## Historial

Cada semana quedó guardada con una etiqueta de git: `semana-6` (HTML, CSS y JS),
`semana-7` (migración a React) y `semana-8` (carga dinámica, avisos y accesibilidad).

## Créditos de imágenes

Las portadas e íconos pertenecen a sus respectivos propietarios y se usan solo con fines
académicos. Las imágenes de los próximos lanzamientos son referenciales.