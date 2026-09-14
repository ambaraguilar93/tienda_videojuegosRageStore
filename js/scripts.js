/* ------------------------------------------------------------
   Este archivo se enlaza desde index.html, productos.html y contacto.html. 
   ------------------------------------------------------------ */

document.addEventListener('DOMContentLoaded', () => {
    initFavoritos();
    initNavHoverInfo();
    initFormularioContacto();
    initCatalogoDinamico();
});

/* ------------------------------------------------------------
   1. BOTÓN DE FAVORITOS
   ------------------------------------------------------------ */
function initFavoritos() {
    const tarjetas = document.querySelectorAll('.product-card');
    if (tarjetas.length === 0) return; // esta página no tiene productos

    // Se ejecuta la funcion que crea el contador de favoritos
    if (!document.getElementById('contador-favoritos')) {
        crearContadorFavoritos();
    }

    tarjetas.forEach(tarjeta => {
        // Evita duplicar el botón si la tarjeta ya fue seleccionada
        if (tarjeta.querySelector('.btn-favorito')) return;

        const boton = document.createElement('button');
        boton.type = 'button';
        boton.className = 'btn-favorito';
        boton.textContent = '☆ Favorito';
        tarjeta.appendChild(boton);

        boton.addEventListener('click', () => {
            const esFavorito = tarjeta.classList.toggle('es-favorito');
            boton.textContent = esFavorito ? '★ En favoritos' : '☆ Favorito';
            actualizarContadorFavoritos();
        });
    });
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
    if (!formulario) return; // esta página no tiene el formulario

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

        // Simulación de envío exitoso (no hay backend real en este proyecto)
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
   4. CATÁLOGO DINÁMICO CARGADO CON FETCH API
   ------------------------------------------------------------ */
function initCatalogoDinamico() {
    const contenedor = document.getElementById('lista-dinamica');
    if (!contenedor) return; // esta página no tiene catálogo dinámico

    fetch('data/juegos.json') // Devuelve una promesa
        .then(respuesta => { // Se ejecuta cuando la promesa se resuelve
            if (!respuesta.ok) {
                throw new Error(`Error HTTP: ${respuesta.status}`);
            }
            return respuesta.json(); // Devuelve otra promesa 
        })
        .then(juegos => mostrarCatalogoDinamico(juegos, contenedor)) // Recibe el dato listo
        .catch(error => { // Atrapa cualquier fallo de toda la cadena
            contenedor.innerHTML = '<li class="mensaje-carga">No se pudo cargar el catálogo en este momento. Intenta más tarde.</li>';
            console.error('Error al cargar el catálogo:', error);
        });
}

// Recorre los juegos recibidos y arma las tarjetas 
function mostrarCatalogoDinamico(juegos, contenedor) {
    contenedor.innerHTML = '';

    juegos.forEach(juego => {
        const tarjeta = `
            <li class="product-card">
                <h3>${juego.titulo}</h3>
                <img src="${juego.imagen.src}" alt="${juego.imagen.alt}" width="100" height="100">
                <p>${juego.descripcion} Precio: ${juego.precio} — Plataforma: ${juego.plataforma}.</p>
                <a href="${juego.boton.url}" class="btn-detalle">${juego.boton.texto}</a>
            </li>
        `;
        contenedor.innerHTML += tarjeta;
    });

    // Vuelve a ejecutar initFavoritos (evita duplicados).
    initFavoritos();
}
