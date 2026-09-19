/* ------------------------------------------------------------
   Este archivo se enlaza desde index.html, productos.html y contacto.html. 
   ------------------------------------------------------------ */

document.addEventListener('DOMContentLoaded', () => {
    initFavoritos();
    initNavHoverInfo();
    initFormularioContacto();
    initDestacados();
    initCatalogoPrincipal();
    initCatalogoDinamico();
    initCarrito();
    initBusqueda();
});

/* ------------------------------------------------------------
   1. BOTÓN DE FAVORITOS (con persistencia en localStorage)
   ------------------------------------------------------------ */
const FAVORITOS_KEY = 'ragestore-favoritos';

// Lee el arreglo de ids favoritos guardado en localStorage
function leerFavoritos() {
    try {
        const guardados = localStorage.getItem(FAVORITOS_KEY);
        return guardados ? JSON.parse(guardados) : [];
    } catch (error) {
        console.error('No se pudo leer los favoritos guardados:', error);
        return [];
    }
}

// Guarda el arreglo de ids favoritos en localStorage
function guardarFavoritos(idsFavoritos) {
    try {
        localStorage.setItem(FAVORITOS_KEY, JSON.stringify(idsFavoritos));
    } catch (error) {
        console.error('No se pudo guardar los favoritos:', error);
    }
}

// Devuelve un id para la tarjeta. Usa el que tenga o genera uno
// a partir del título de las tarjetas del HTML.
function obtenerIdTarjeta(tarjeta) {
    if (tarjeta.dataset.favId) return tarjeta.dataset.favId;

    const titulo = tarjeta.querySelector('.card-title')?.textContent || '';
    const slug = titulo
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // quita tildes
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    tarjeta.dataset.favId = slug || `tarjeta-${Math.random().toString(36).slice(2, 8)}`;
    return tarjeta.dataset.favId;
}

function initFavoritos() {
    const tarjetas = document.querySelectorAll('.product-card');
    if (tarjetas.length === 0) return;

    // Se ejecuta la funcion que crea el contador de favoritos
    if (!document.getElementById('contador-favoritos')) {
        crearContadorFavoritos();
    }

    const idsFavoritos = leerFavoritos();

    tarjetas.forEach(tarjeta => {
        const id = obtenerIdTarjeta(tarjeta);
        const esFavoritoGuardado = idsFavoritos.includes(id);

        // Aplica el estado guardado.
        tarjeta.classList.toggle('es-favorito', esFavoritoGuardado);

        let boton = tarjeta.querySelector('.btn-favorito');
        if (!boton) {
            boton = document.createElement('button');
            boton.type = 'button';
            boton.className = 'btn-favorito';

            const contenedorAcciones = tarjeta.querySelector('.card-actions') || tarjeta;
            contenedorAcciones.appendChild(boton);

            boton.addEventListener('click', () => {
                const yaEsFavorito = tarjeta.classList.toggle('es-favorito');
                boton.textContent = yaEsFavorito ? '★ En favoritos' : '☆ Favorito';

                const favoritosActuales = leerFavoritos();
                const nuevosFavoritos = yaEsFavorito
                    ? [...favoritosActuales, id]
                    : favoritosActuales.filter(favId => favId !== id);
                guardarFavoritos(nuevosFavoritos);

                actualizarContadorFavoritos();
            });
        }

        boton.textContent = esFavoritoGuardado ? '★ En favoritos' : '☆ Favorito';
    });

    actualizarContadorFavoritos();
}

// Crea el contador de favoritos dentro del encabezado
function crearContadorFavoritos() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    const contador = document.createElement('p');
    contador.id = 'contador-favoritos';
    contador.className = 'contador-favoritos';
    contador.textContent = 'Favoritos: 0';
    header.appendChild(contador);
}

// Cuenta las tarjetas están marcadas como favoritas y actualiza el texto
function actualizarContadorFavoritos() {
    const contador = document.getElementById('contador-favoritos');
    if (!contador) return;

    const totalFavoritos = document.querySelectorAll('.product-card.es-favorito').length;
    contador.textContent = `Favoritos: ${totalFavoritos}`;
}


/* ------------------------------------------------------------
   2. PASAR EL MOUSE POR EL MENÚ - eventos mouseover/mouseout
   ------------------------------------------------------------ */
function initNavHoverInfo() {
    const descripcion = document.getElementById('header-desc');
    const enlaces = document.querySelectorAll('.nav-list a[data-tip]');
    if (!descripcion || enlaces.length === 0) return;

    // Guardamos el texto original para poder restaurarlo en mouseout
    const textoOriginal = descripcion.textContent;

    enlaces.forEach(enlace => {
        enlace.addEventListener('mouseover', () => {
            descripcion.textContent = enlace.dataset.tip;
        });

        enlace.addEventListener('mouseout', () => {
            descripcion.textContent = textoOriginal;
        });
    });
}


/* ------------------------------------------------------------
   3. FORMULARIO DE CONTACTO
   ------------------------------------------------------------ */
function initFormularioContacto() {
    const formulario = document.getElementById('form-contacto');
    if (!formulario) return;

    const mensajeEstado = document.getElementById('form-mensaje');

    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault(); // evita que la página se recargue

        const nombre = formulario.nombre.value.trim();
        const correo = formulario.correo.value.trim();
        const mensaje = formulario.mensaje.value.trim();
        const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

        if (!nombre || !correo || !mensaje) {
            mostrarMensajeFormulario('Por favor completa todos los campos.', 'error');
            return;
        }

        if (!correoValido) {
            mostrarMensajeFormulario('Ingresa un correo electrónico válido.', 'error');
            return;
        }

        // Simulación de envío exitoso.
        mostrarMensajeFormulario(
            `¡Gracias, ${nombre}! Te responderemos a ${correo} a la brevedad.`,
            'exito'
        );
        formulario.reset();
    });

    function mostrarMensajeFormulario(texto, tipo) {
        mensajeEstado.textContent = texto;
        mensajeEstado.className = `form-mensaje form-mensaje-${tipo}`;
    }
}

/* ------------------------------------------------------------
   4. CATÁLOGO DE PRODUCTOS CARGADO CON FETCH API
   ------------------------------------------------------------ */

// Crea el nodo con la tarjeta de un producto.
// Se usa con createElement para que los datos del JSON 
// siempre se inserten como texto.
function crearTarjetaProducto(juego) {
    const columna = document.createElement('div');
    columna.className = 'col';

    const tarjeta = document.createElement('div');
    tarjeta.className = 'card product-card h-100';
    tarjeta.dataset.favId = juego.id; // id para localStorage

    const imagen = document.createElement('img');
    imagen.src = juego.imagen.src;
    imagen.alt = juego.imagen.alt;
    imagen.className = 'card-img-top';

    const cuerpo = document.createElement('div');
    cuerpo.className = 'card-body d-flex flex-column';

    // Etiqueta reserva para "Próximos lanzamientos" 
    if (juego.reserva) {
        const etiquetaReserva = document.createElement('span');
        etiquetaReserva.className = 'badge-reserva';
        etiquetaReserva.textContent = 'Reserva';
        cuerpo.appendChild(etiquetaReserva);
    }

    const titulo = document.createElement('h3');
    titulo.className = 'card-title h5';
    titulo.textContent = juego.titulo;

    const descripcion = document.createElement('p');
    descripcion.className = 'card-text';
    descripcion.textContent =
        `${juego.descripcion} Precio: ${juego.precio} — Plataforma: ${juego.plataforma}.`;

    cuerpo.append(titulo, descripcion);

    const acciones = document.createElement('div');
    acciones.className = 'card-actions mt-auto';

    const botonCarrito = document.createElement('button');
    botonCarrito.type = 'button';
    botonCarrito.className = 'btn btn-primary btn-sm btn-agregar-carrito';
    botonCarrito.dataset.titulo = juego.titulo;
    botonCarrito.dataset.precio = juego.precio;
    botonCarrito.dataset.reserva = juego.reserva ? 'true' : 'false';
    botonCarrito.textContent = juego.reserva ? 'Reservar' : 'Agregar al carrito';
    acciones.appendChild(botonCarrito);

    cuerpo.appendChild(acciones);

    tarjeta.append(imagen, cuerpo);
    columna.appendChild(tarjeta);
    return columna;
}

function pintarProductos(juegos, contenedor) {
    const fragmento = document.createDocumentFragment();
    juegos.forEach(juego => fragmento.appendChild(crearTarjetaProducto(juego)));
    contenedor.replaceChildren(fragmento);

    initFavoritos();
    actualizarResumenCarrito();
}

// Muestra un mensaje de error amigable dentro del contenedor
function mostrarErrorCatalogo(contenedor, texto) {
    const mensaje = document.createElement('p');
    mensaje.className = 'mensaje-carga';
    mensaje.textContent = texto;
    contenedor.replaceChildren(mensaje);
}

// Destacados de (index.html). Filtra data/catalogo.json
// y muestra solo los productos marcados como "destacado".
function initDestacados() {
    const contenedor = document.getElementById('destacados-dinamico');
    if (!contenedor) return;

    fetch('data/catalogo.json')
        .then(respuesta => {
            if (!respuesta.ok) {
                throw new Error(`Error HTTP: ${respuesta.status}`);
            }
            return respuesta.json();
        })
        .then(juegos => pintarProductos(juegos.filter(juego => juego.destacado), contenedor))
        .catch(error => {
            mostrarErrorCatalogo(contenedor, 'No se pudieron cargar los productos destacados.');
            console.error('Error al cargar destacados:', error);
        });
}

// Catálogo principal (productos.html). Carga todos los productos
// de data/catalogo.json
function initCatalogoPrincipal() {
    const contenedor = document.getElementById('catalogo-principal');
    if (!contenedor) return;

    fetch('data/catalogo.json')
        .then(respuesta => {
            if (!respuesta.ok) {
                throw new Error(`Error HTTP: ${respuesta.status}`);
            }
            return respuesta.json();
        })
        .then(juegos => pintarProductos(juegos, contenedor))
        .catch(error => {
            mostrarErrorCatalogo(contenedor, 'No se pudo cargar el catálogo en este momento. Intenta más tarde.');
            console.error('Error al cargar el catálogo principal:', error);
        });
}

// Próximos lanzamientos (productos.html). Carga data/juegos.json
function initCatalogoDinamico() {
    const contenedor = document.getElementById('lista-dinamica');
    if (!contenedor) return;

    fetch('data/juegos.json')
        .then(respuesta => {
            if (!respuesta.ok) {
                throw new Error(`Error HTTP: ${respuesta.status}`);
            }
            return respuesta.json();
        })
        .then(juegos => pintarProductos(juegos, contenedor))
        .catch(error => {
            mostrarErrorCatalogo(contenedor, 'No se pudo cargar el catálogo en este momento. Intenta más tarde.');
            console.error('Error al cargar el catálogo:', error);
        });
}

/* ------------------------------------------------------------
   5. CARRITO DE COMPRAS (con persistencia en localStorage)
   ------------------------------------------------------------ */
const CARRITO_KEY = 'ragestore-carrito';

// Lee el carrito guardado en localStorage
function leerCarrito() {
    try {
        const guardado = localStorage.getItem(CARRITO_KEY);
        return guardado ? JSON.parse(guardado) : [];
    } catch (error) {
        console.error('No se pudo leer el carrito guardado:', error);
        return [];
    }
}

// Guarda el carrito en localStorage
function guardarCarrito(items) {
    try {
        localStorage.setItem(CARRITO_KEY, JSON.stringify(items));
    } catch (error) {
        console.error('No se pudo guardar el carrito:', error);
    }
}

// Convierte el precio a numero poder sumar precios
function parsearPrecio(texto) {
    const soloNumeros = String(texto).replace(/[^\d]/g, '');
    return Number(soloNumeros) || 0;
}

// Le da formato al precio
function formatearPrecio(numero) {
    return `$${numero.toLocaleString('es-CL')}`;
}

// Agrega un producto al carrito (o suma 1 a la cantidad si ya estaba)
function agregarAlCarrito(titulo, precioTexto, esReserva = false) {
    const carrito = leerCarrito();
    const existente = carrito.find(item => item.titulo === titulo);

    if (existente) {
        existente.cantidad += 1;
    } else {
        carrito.push({ titulo, precio: parsearPrecio(precioTexto), cantidad: 1, reserva: esReserva });
    }

    guardarCarrito(carrito);
    actualizarResumenCarrito();
}

// Quita una unidad del producto. Si llega a 0, desaparece la fila completa del carrito.
function quitarDelCarrito(titulo) {
    const carrito = leerCarrito();
    const item = carrito.find(i => i.titulo === titulo);
    if (!item) return;

    if (item.cantidad > 1) {
        item.cantidad -= 1;
    } else {
        carrito.splice(carrito.indexOf(item), 1);
    }

    guardarCarrito(carrito);
    actualizarResumenCarrito();
}

// El contador flotante, el total y la lista dentro del modal,
// usando createElement + DocumentFragment 
function actualizarResumenCarrito() {
    const contador = document.getElementById('contador-carrito');
    const lista = document.getElementById('lista-carrito');
    const mensajeVacio = document.getElementById('carrito-vacio-mensaje');
    const totalElemento = document.getElementById('carrito-total');
    if (!contador || !lista) return;

    const carrito = leerCarrito();
    const totalUnidades = carrito.reduce((suma, item) => suma + item.cantidad, 0);
    const totalPrecio = carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0);

    contador.textContent = totalUnidades;
    totalElemento.textContent = formatearPrecio(totalPrecio);
    mensajeVacio.style.display = carrito.length === 0 ? 'block' : 'none';

    const fragmento = document.createDocumentFragment();
    carrito.forEach(item => {
        const fila = document.createElement('li');
        fila.className = 'item-carrito';

        const texto = document.createElement('span');
        const etiqueta = item.reserva ? ' (Reserva)' : '';
        texto.textContent = `${item.titulo}${etiqueta} × ${item.cantidad} — ${formatearPrecio(item.precio * item.cantidad)}`;

        const botonQuitar = document.createElement('button');
        botonQuitar.type = 'button';
        botonQuitar.className = 'btn-quitar-carrito';
        botonQuitar.setAttribute('aria-label', `Quitar una unidad de ${item.titulo} del carrito`);
        botonQuitar.textContent = '✕';
        botonQuitar.addEventListener('click', () => quitarDelCarrito(item.titulo));

        fila.append(texto, botonQuitar);
        fragmento.appendChild(fila);
    });

    lista.replaceChildren(fragmento);
    sincronizarBotonesCarrito(carrito);
}

// Refleja en cada botón "Agregar al carrito" si ese producto ya
// está en el carrito y con qué cantidad.
function sincronizarBotonesCarrito(carrito) {
    const botones = document.querySelectorAll('.btn-agregar-carrito');

    botones.forEach(boton => {
        const esReserva = boton.dataset.reserva === 'true';
        const item = carrito.find(i => i.titulo === boton.dataset.titulo);
        const cantidad = item ? item.cantidad : 0;

        boton.classList.toggle('btn-primary', cantidad === 0);
        boton.classList.toggle('btn-success', cantidad > 0);

        if (cantidad > 0) {
            boton.textContent = esReserva ? `✓ Reservado (${cantidad})` : `✓ En el carrito (${cantidad})`;
        } else {
            boton.textContent = esReserva ? 'Reservar' : 'Agregar al carrito';
        }
    });
}

function initCarrito() {
    const contador = document.getElementById('contador-carrito');
    if (!contador) return;

    actualizarResumenCarrito();

    // Delegacion de evento agregar un producto al carrito.
    document.addEventListener('click', (evento) => {
        const boton = evento.target.closest('.btn-agregar-carrito');
        if (!boton) return;
        agregarAlCarrito(boton.dataset.titulo, boton.dataset.precio, boton.dataset.reserva === 'true');
    });

    const botonVaciar = document.getElementById('btn-vaciar-carrito');
    if (botonVaciar) {
        botonVaciar.addEventListener('click', () => {
            guardarCarrito([]);
            actualizarResumenCarrito();
        });
    }
}

/* ------------------------------------------------------------
   6. BUSCADOR DE PRODUCTOS - evento submit
   ------------------------------------------------------------ */
function initBusqueda() {
    const formulario = document.getElementById('form-busqueda');
    if (!formulario) return;

    const input = document.getElementById('busqueda-input');
    const mensaje = document.getElementById('busqueda-mensaje');

    const filtrarProductos = (termino) => {
        const terminoNormalizado = termino.trim().toLowerCase();
        const tarjetas = document.querySelectorAll('.product-card');
        let coincidencias = 0;

        tarjetas.forEach(tarjeta => {
            const columna = tarjeta.closest('.col') || tarjeta;
            const tituloTarjeta = tarjeta.querySelector('.card-title')?.textContent.toLowerCase() || '';
            const coincide = terminoNormalizado === '' || tituloTarjeta.includes(terminoNormalizado);

            columna.style.display = coincide ? '' : 'none';
            if (coincide) coincidencias += 1;
        });

        if (terminoNormalizado === '') {
            mensaje.textContent = '';
        } else if (coincidencias === 0) {
            mensaje.textContent = `No se encontraron videojuegos para "${termino.trim()}".`;
        } else {
            mensaje.textContent = `${coincidencias} resultado(s) para "${termino.trim()}".`;
        }
    };

    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault();
        filtrarProductos(input.value);
    });

    // Si la persona borra el texto manualmente, vuelve a mostrar todo
    input.addEventListener('input', () => {
        if (input.value.trim() === '') {
            filtrarProductos('');
        }
    });
}