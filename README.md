# Rage Store — Tienda de videojuegos
 
Actividad formativa Semana 1 — **Desarrollo Frontend I (PFY2201)**
Actividad: *Crear una estructura básica en HTML*

## Descripción
 
Estructura básica de una página web para una tienda de videojuegos, construida
únicamente con HTML5 y etiquetas semánticas. No se utiliza CSS ni JavaScript, ya que
el foco de esta semana es la organización y el marcado del contenido.

## Estructura del proyecto
 
```
rage-store/
├── index.html          Página de inicio (destacados, categorías, promociones)
├── productos.html      Catálogo de videojuegos y accesorios
├── contacto.html       Canales de atención, sucursales y preguntas frecuentes
├── img/                Imágenes del sitio
├── css/                Reservada para los estilos (se completa más adelante)
└── js/                 Reservada para los scripts (se completa más adelante)
```

## Elementos aplicados
 
| Requerimiento | Dónde se aplica |
| --- | --- |
| Etiquetas semánticas | `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<address>` |
| Encabezados | Un `<h1>` por página, `<h2>` por sección, `<h3>` por producto |
| Párrafos | Descripción de la tienda, de cada juego y de las promociones |
| Listas | `<ul>` para el menú, juegos y accesorios; `<ol>` para categorías, pasos de compra y sucursales |
| Enlaces | Navegación interna, anclas `#categorias` y `#promociones`, `mailto:`, `tel:` y sitios externos |
| Imágenes | Logotipo, portadas de los juegos y banner de promociones, todas con atributo `alt` |


## Cómo visualizar el sitio
 
1. Abrir la carpeta del proyecto en Visual Studio Code.
2. Instalar la extensión **Live Server**.
3. Clic derecho sobre `index.html` → *Open with Live Server*.

## Validación
 
Código revisado con el validador del W3C: <https://validator.w3.org/>
Resultado: *Document checking completed. No errors or warnings to show.*
 
## Créditos de imágenes
 
Las portadas e íconos utilizados pertenecen a sus respectivos propietarios y se
emplean únicamente con fines académicos.

---

# Semana 2 — Optimizando la página web con CSS

## Descripción

Se optimizó visualmente el sitio aplicando una hoja de estilos CSS externa
(`css/styles.css`), vinculada desde el `<head>` de `index.html`, `productos.html`
y `contacto.html`. La identidad visual es la de un panel de interfaz de videojuego
(paneles con esquina cortada, acentos en tres colores y tipografía técnica),
coherente con el nombre de la tienda.

## Estructura del proyecto (actualizada)

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

## Elementos de CSS aplicados

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

## Cómo visualizar el sitio

1. Abrir la carpeta del proyecto en Visual Studio Code.
2. Instalar la extensión **Live Server**.
3. Clic derecho sobre `index.html` → *Open with Live Server*.
