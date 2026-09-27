# Rage Store — Tienda de videojuegos

Proyecto de **Desarrollo Frontend I (PFY2201)** — Duoc UC
Autora: **Ambar Aguilar**

- 🌐 Sitio publicado: <https://ambaraguilar93.github.io/tienda_videojuegosRageStore/>
- 📁 Repositorio: <https://github.com/ambaraguilar93/tienda_videojuegosRageStore>

---

# Semana 7 — Construyendo componentes funcionales en React para un eCommerce interactivo

## Descripción

El sitio de Rage Store (HTML, CSS, Bootstrap y JavaScript) se migró a **React** usando
**Vite**. La tienda ahora se construye con **componentes funcionales** que reciben
**props** y manejan **estado** con `useState` y `useEffect`, y usa **renderizado
condicional** para cambiar la interfaz según lo que hace el usuario.

Funcionalidades implementadas:

- **Listado de productos** con nombre, precio normal, precio oferta, porcentaje de
  descuento, descripción corta, plataforma e imagen.
- **Carrito de compras** para agregar productos, sumar o restar unidades, eliminar un
  producto o vaciar el carrito.
- **Contador** con el número total de productos en el carrito.
- **Total a pagar** con precio oferta y el ahorro obtenido.
- **Buscador** que filtra los productos mientras se escribe.
- El carrito **se guarda en `localStorage`**, así no se pierde al recargar la página.

> La versión anterior del sitio (HTML + JavaScript, Semanas 1 a 6) quedó guardada en
> la etiqueta [`semana-6`](https://github.com/ambaraguilar93/tienda_videojuegosRageStore/tree/semana-6)
> del repositorio.

## Tecnologías

- React 19 + Vite
- Bootstrap 5 (solo el CSS, instalado con npm)
- gh-pages (publicación en GitHub Pages)

## Estructura del proyecto

```
tienda_videojuegosRageStore/
├── index.html               Página base donde React monta la aplicación (#root)
├── vite.config.js           Configuración de Vite (ruta base para GitHub Pages)
├── package.json             Dependencias y scripts (dev, build, deploy)
├── public/
│   └── favicon.png
└── src/
    ├── main.jsx             Punto de entrada: importa Bootstrap, estilos y App
    ├── App.jsx              Componente principal: estado del carrito y búsqueda
    ├── styles.css           Estilos propios (paleta Rage Store)
    ├── assets/img/          Imágenes de los productos y logo
    ├── data/
    │   └── productos.js     Catálogo y próximos lanzamientos (precio y precio oferta)
    ├── utils/
    │   ├── precios.js       formatearPrecio(), calcularDescuento()
    │   └── carrito.js       agregarItem(), restarItem(), eliminarItem(), totales y localStorage
    └── components/
        ├── Header.jsx       Logo y menú de navegación (se abre en celular con useState)
        ├── Hero.jsx         Banner de ofertas de temporada
        ├── Buscador.jsx     Input controlado para filtrar productos (onChange)
        ├── ProductList.jsx  Sección con la grilla de productos (se reutiliza 2 veces)
        ├── ProductCard.jsx  Tarjeta de un producto
        ├── BotonCarrito.jsx Botón flotante con el contador del carrito
        ├── Carrito.jsx      Panel lateral del carrito
        ├── CartItem.jsx     Fila de un producto dentro del carrito
        ├── CartTotal.jsx    Cantidad de productos, ahorro y total
        ├── Contacto.jsx     Canales de atención y sucursales
        └── Footer.jsx       Pie de página
```

## Componentes, props y estado

El estado del carrito vive en `App.jsx` (componente padre) y se entrega a los
componentes hijos mediante **props**. Así el contador, las tarjetas y el panel del
carrito siempre muestran la misma información.

```
App  (estado: carrito, carritoAbierto, busqueda)
├── Header
├── Hero
├── Buscador      ← props: valor, onCambiar, totalResultados
├── ProductList   ← props: productos, carrito, onAgregar   (catálogo)
│   └── ProductCard  ← props: producto, cantidad, onAgregar
├── ProductList   ← (próximos lanzamientos)
├── Contacto
├── Footer
├── BotonCarrito  ← props: cantidad, onAbrir
└── Carrito       ← props: items, onCerrar, onSumar, onRestar, onEliminar, onVaciar
    ├── CartItem  ← props: item, onSumar, onRestar, onEliminar
    └── CartTotal ← props: items
```

## Elementos de React aplicados

| Requerimiento | Dónde se aplica |
| --- | --- |
| Componentes funcionales reutilizables | Un componente por archivo en `src/components`. `ProductList` y `ProductCard` se reutilizan para el catálogo y los lanzamientos |
| Props | Los datos y las funciones del carrito pasan de `App` a los hijos (ver el árbol de arriba) |
| `useState` | `App.jsx`: `carrito`, `carritoAbierto`, `busqueda`. `Header.jsx`: `menuAbierto` |
| `useEffect` | `App.jsx`: guarda el carrito en `localStorage` cada vez que cambia. `Carrito.jsx`: cierra el panel con la tecla Escape y limpia el listener al cerrarse |
| Evento `onClick` | Agregar / Reservar, botones + y −, eliminar (✕), vaciar carrito, abrir y cerrar el carrito, menú en celular, botón Limpiar del buscador |
| Evento `onChange` | Input controlado del buscador (`Buscador.jsx`) |
| Renderizado condicional | Etiqueta `-X%` solo si hay descuento · etiqueta "Reserva" · botón "Agregar" ↔ "✓ En el carrito (n)" · panel del carrito abierto/cerrado · mensaje "Tu carrito está vacío" · ahorro solo si es mayor a $0 · botón "Vaciar" solo con productos · mensajes del buscador y "sin resultados" por sección · clase `show` del menú |
| Listas con `.map()` y `key` | Productos, items del carrito, enlaces del menú, sucursales y redes sociales |
| Estado inmutable | `utils/carrito.js` siempre devuelve un arreglo nuevo (`map`, `filter`, spread `...`), nunca usa `push` ni `splice` |
| Funciones reutilizables | `utils/precios.js` y `utils/carrito.js`, usadas por varios componentes |

## Cómo ejecutar el proyecto

Requisitos: [Node.js](https://nodejs.org/) (versión LTS).

```bash
git clone https://github.com/ambaraguilar93/tienda_videojuegosRageStore.git
cd tienda_videojuegosRageStore
npm install        # instala las dependencias
npm run dev        # abre el sitio en http://localhost:5173/tienda_videojuegosRageStore/
```

## Publicación en GitHub Pages

El proyecto se publica en la rama `gh-pages` con el paquete `gh-pages`:

```bash
npm run deploy     # ejecuta "npm run build" y sube la carpeta dist/ a la rama gh-pages
```

En `vite.config.js` se configuró `base: '/tienda_videojuegosRageStore/'` para que las
rutas de los archivos funcionen dentro de GitHub Pages.

## Créditos de imágenes

Las portadas e íconos utilizados pertenecen a sus respectivos propietarios y se
emplean únicamente con fines académicos. Las imágenes de los próximos lanzamientos
son referenciales.

---

# Historial de semanas anteriores

Estas semanas corresponden a la versión en HTML, CSS y JavaScript, disponible en la
etiqueta `semana-6` del repositorio.

## Semana 1 — Crear una estructura básica en HTML

### Descripción
 
Estructura básica de una página web para una tienda de videojuegos, construida
únicamente con HTML5 y etiquetas semánticas. No se utiliza CSS ni JavaScript, ya que
el foco de esta semana es la organización y el marcado del contenido.

### Estructura del proyecto
 
```
rage-store/
├── index.html          Página de inicio (destacados, categorías, promociones)
├── productos.html      Catálogo de videojuegos y accesorios
├── contacto.html       Canales de atención, sucursales y preguntas frecuentes
├── img/                Imágenes del sitio
├── css/                Reservada para los estilos (se completa más adelante)
└── js/                 Reservada para los scripts (se completa más adelante)
```

### Elementos aplicados
 
| Requerimiento | Dónde se aplica |
| --- | --- |
| Etiquetas semánticas | `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<address>` |
| Encabezados | Un `<h1>` por página, `<h2>` por sección, `<h3>` por producto |
| Párrafos | Descripción de la tienda, de cada juego y de las promociones |
| Listas | `<ul>` para el menú, juegos y accesorios; `<ol>` para categorías, pasos de compra y sucursales |
| Enlaces | Navegación interna, anclas `#categorias` y `#promociones`, `mailto:`, `tel:` y sitios externos |
| Imágenes | Logotipo, portadas de los juegos y banner de promociones, todas con atributo `alt` |

### Validación
 
Código revisado con el validador del W3C: <https://validator.w3.org/>
Resultado: *Document checking completed. No errors or warnings to show.*
 
### Créditos de imágenes
 
Las portadas e íconos utilizados pertenecen a sus respectivos propietarios y se
emplean únicamente con fines académicos.

---

## Semana 2 — Optimizando la página web con CSS

### Descripción

Se optimizó visualmente el sitio aplicando una hoja de estilos CSS externa
(`css/styles.css`), vinculada desde el `<head>` de `index.html`, `productos.html`
y `contacto.html`. La identidad visual es la de un panel de interfaz de videojuego
(paneles con esquina cortada, acentos en tres colores y tipografía técnica),
coherente con el nombre de la tienda.

### Estructura del proyecto (actualizada)

```
rage-store/
├── index.html
├── productos.html
├── contacto.html
├── css/
│   └── styles.css      Hoja de estilos externa de la Semana 2
├── img/
└── js/                  Reservada para JavaScript (semanas siguientes)
```

### Elementos de CSS aplicados

| Requerimiento | Dónde se aplica |
| --- | --- |
| Hoja de estilos externa | `<link rel="stylesheet" href="css/styles.css">` en las 3 páginas |
| Modelo de cajas | `box-sizing: border-box` global; `padding`, `margin` y `border` en `.panel`, `.product-card`, listas y footer |
| Colores | Variables CSS (`--ink`, `--surface`, `--rage`, `--volt`, `--gold`, `--paper`, `--mist`) para fondo, texto y bordes |
| Tipografías | `Chakra Petch` (títulos) y `Work Sans` (texto), vía Google Fonts, definidas con `font-family` y `font-size` |
| Selectores de clase | `.panel`, `.product-card`, `.nav-list`, `.faq-item`, `.social-links`, etc. |
| Selectores de ID | `#destacados`, `#categorias`, `#promociones`, `#juegos`, `#accesorios`, `#proceso-compra`, `#canales`, `#sucursales`, `#preguntas` |
| Selectores avanzados | `:nth-child()` para alternar el color de las tarjetas de producto; `::before`/`::after` con `counter()` para numerar listas; selectores de atributo (`a[href^="tel:"]`, `a[href^="mailto:"]`, `a[target="_blank"]`) para diferenciar tipos de enlace |
| Responsivo | `@media (max-width: 640px)` ajusta la grilla de productos y el espaciado en móviles |

---

## Semana 5 — Manipulando el DOM con JavaScript para mejorar la interactividad

### Descripción

Se incorporó JavaScript (`js/scripts.js`) para agregar interactividad dinámica
al sitio, tal como manipulación del DOM, gestión de eventos de usuario y consumo de
datos externos mediante la Fetch API. El foco de esta semana es transformar
el sitio estático de semanas anteriores en una experiencia interactiva.

### Estructura del proyecto (actualizada)

```
tienda_videojuegosRageStore/
├── index.html
├── productos.html
├── contacto.html
├── css/
│   └── styles.css      Estilos + Semana 5: formulario, favoritos, encabezado
├── data/
│   └── juegos.json      Catálogo de próximos lanzamientos (fuente del Fetch)
├── img/
└── js/
    └── scripts.js       Lógica de interactividad de la Semana 5
```

### Elementos de JavaScript aplicados

| Requerimiento | Función en `scripts.js` | Dónde se aplica |
| --- | --- | --- |
| Selección de elementos del DOM | `initFavoritos()`, `initNavHoverInfo()`, `initCatalogoDinamico()` | `.product-card`, `#header-desc`, `.nav-list a[data-tip]`, `#lista-dinamica` |
| Crear y agregar contenido (`createElement` + `appendChild`) | `crearContadorFavoritos()`, `initFavoritos()` | Contador de favoritos y botón "☆ Favorito" en cada tarjeta |
| Agregar/reemplazar contenido (`innerHTML`) | `mostrarCatalogoDinamico()` | Sección "Próximos lanzamientos" en `productos.html` |
| Evento `click` | `initFavoritos()` | Botón de favoritos en las tarjetas de producto |
| Evento `mouseover` / `mouseout` | `initNavHoverInfo()` | Enlaces del menú de navegación, en las 3 páginas |
| Evento `submit` + validación | `initFormularioContacto()` | Formulario de contacto en `contacto.html` |
| Fetch API + promesas (`.then`/`.catch`) | `initCatalogoDinamico()` | Carga de `data/juegos.json` |
| Manejo de errores de la carga de datos | bloque `.catch()` de `initCatalogoDinamico()` | Mensaje de error mostrado en pantalla si falla el Fetch |

---

## Semana 6 — Optimizando la lógica y el rendimiento de una página web con JavaScript

### Descripción

Se integró **Bootstrap 5** para la maquetación (navbar responsivo y tarjetas de
producto), manteniendo la identidad visual del sitio. Además, se amplió la
interactividad con un **carrito de compras** persistente, un **buscador** de
productos, y se extendió el uso de la **Fetch API** a todas las secciones de
productos. Por último, se reorganizaron las carpetas del proyecto según la 
estructura solicitada.

### Estructura del proyecto (actualizada)

tienda_videojuegosRageStore/
├── index.html
├── productos.html
├── contacto.html
├── assets/
│ ├── css/
│ │ └── styles.css Estilos + Semana 6: Bootstrap, carrito, buscador, reservas
│ ├── js/
│ │ └── scripts.js Lógica de interactividad + Semana 6: carrito, buscador, Fetch ampliado
│ └── img/
└── data/
├── catalogo.json Destacados y catálogo principal (fuente del Fetch)
└── juegos.json Próximos lanzamientos / reservas (fuente del Fetch)


### Elementos aplicados

| Requerimiento | Función / Selector | Dónde se aplica |
| --- | --- | --- |
| Integración de Bootstrap 5 | Variables `--bs-primary`, `--bs-body-font-family`, etc. sobreescritas en `:root` | `assets/css/styles.css`, aplicado en toda la interfaz |
| Navbar responsivo | `navbar-expand-lg` + `navbar-toggler` + `collapse` | Menú de navegación en las 3 páginas |
| Grilla de tarjetas responsiva | `row-cols-1 row-cols-md-2 row-cols-lg-3` + `card` | Destacados, catálogo principal y próximos lanzamientos |
| Fetch API + promesas, ampliado a toda la tienda | `initDestacados()`, `initCatalogoPrincipal()`, `initCatalogoDinamico()` | `data/catalogo.json` y `data/juegos.json` |
| Función reutilizable para renderizar productos | `crearTarjetaProducto()`, `pintarProductos()` (`createElement` + `DocumentFragment`) | Genera las tarjetas de las 3 secciones sin repetir código |
| Manejo de errores de la carga de datos | `mostrarErrorCatalogo()` | Mensaje amigable si falla cualquiera de los dos `fetch` |
| Evento `click` — carrito de compras | `agregarAlCarrito()`, `quitarDelCarrito()`, `initCarrito()` | Botón "Agregar al carrito" / "Reservar" en cada tarjeta |
| Manipulación dinámica del DOM — resumen del carrito | `actualizarResumenCarrito()` | Modal del carrito (contador, lista de productos y total) |
| Persistencia de datos | `localStorage` (carrito y favoritos) | El carrito y los favoritos se mantienen al recargar o cambiar de página |
| Evento `submit` — buscador | `initBusqueda()` | Formulario de búsqueda en `productos.html` |
| Diferenciación de reservas | Etiqueta `.badge-reserva`, texto "Reservar" / "✓ Reservado" | Tarjetas de "Próximos lanzamientos" |
