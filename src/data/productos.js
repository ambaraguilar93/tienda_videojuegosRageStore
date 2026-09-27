/* ------------------------------------------------------------
   Datos de producto
   ------------------------------------------------------------ */

// Las imágenes se importan para publicar en GitHub Pages.
// Es una configuracion de Vite.
import minecraft from '../assets/img/minecraft.png'
import eldenRing from '../assets/img/elden_ring.png'
import fifa from '../assets/img/fifa.png'
import zelda from '../assets/img/zelda.png'
import gtav from '../assets/img/gtav.png'
import crash from '../assets/img/crash.png'
import street from '../assets/img/street.png'

// Catálogo principal
export const catalogo = [
  {
    id: 'catalogo-1',
    nombre: 'Minecraft',
    descripcion: 'Sandbox de construcción y supervivencia con modo multijugador.',
    precio: 22990,
    precioOferta: 18990,
    plataforma: 'PC, PlayStation, Xbox y Nintendo Switch',
    imagen: minecraft,
    alt: 'Portada del videojuego Minecraft',
    reserva: false,
  },
  {
    id: 'catalogo-2',
    nombre: 'Elden Ring',
    descripcion: 'Rol de acción en un mundo abierto de alta dificultad.',
    precio: 44990,
    precioOferta: 37990,
    plataforma: 'PC, PlayStation 5 y Xbox Series X',
    imagen: eldenRing,
    alt: 'Portada del videojuego Elden Ring',
    reserva: false,
  },
  {
    id: 'catalogo-3',
    nombre: 'EA Sports FC 26',
    descripcion: 'Simulador de fútbol con ligas y clubes oficiales.',
    precio: 54990,
    precioOferta: 42990,
    plataforma: 'PC, PlayStation 5 y Nintendo Switch',
    imagen: fifa,
    alt: 'Portada del videojuego EA Sports FC 26',
    reserva: false,
  },
  {
    id: 'catalogo-4',
    nombre: 'The Legend of Zelda: Tears of the Kingdom',
    descripcion: 'Aventura de mundo abierto exclusiva de Nintendo.',
    precio: 59990,
    precioOferta: 49990,
    plataforma: 'Nintendo Switch',
    imagen: zelda,
    alt: 'Portada del videojuego The Legend of Zelda: Tears of the Kingdom',
    reserva: false,
  },
  {
    id: 'catalogo-5',
    nombre: 'Grand Theft Auto V',
    descripcion: 'Acción en mundo abierto con modo en línea. Clasificación +18.',
    precio: 19990,
    precioOferta: 14990,
    plataforma: 'PC, PlayStation 5 y Xbox Series X',
    imagen: gtav,
    alt: 'Portada del videojuego Grand Theft Auto V',
    reserva: false,
  },
  {
    id: 'catalogo-6',
    nombre: 'Crash Bandicoot',
    descripcion: 'Clásico juego de plataformas con niveles lineales y jefes finales.',
    precio: 29990,
    precioOferta: 24990,
    plataforma: 'PC y consolas',
    imagen: crash,
    alt: 'Portada del videojuego Crash Bandicoot',
    reserva: false,
  },
  {
    id: 'catalogo-7',
    nombre: 'Street Fighter',
    descripcion: 'Serie de lucha uno contra uno con golpes, patadas y poderes especiales.',
    precio: 34990,
    precioOferta: 27990,
    plataforma: 'PC y consolas',
    imagen: street,
    alt: 'Portada del videojuego Street Fighter',
    reserva: false,
  },
]

// Próximos lanzamientos (reservas) 
export const lanzamientos = [
  {
    id: 'juego-1',
    nombre: 'Hollow Knight: Silksong',
    descripcion: 'Secuela del aclamado metroidvania, con nuevos mundos, enemigos y habilidades para Hornet.',
    precio: 29990,
    precioOferta: 25990,
    plataforma: 'PC, PlayStation 5, Xbox Series X y Nintendo Switch',
    imagen: 'https://picsum.photos/200/200?random=101',
    alt: 'Imagen referencial del videojuego Hollow Knight: Silksong',
    reserva: true,
  },
  {
    id: 'juego-2',
    nombre: 'God of War Ragnarök',
    descripcion: 'Kratos y Atreo enfrentan el fin de los nueve reinos en esta épica aventura nórdica.',
    precio: 49990,
    precioOferta: 41990,
    plataforma: 'PlayStation 5',
    imagen: 'https://picsum.photos/200/200?random=102',
    alt: 'Imagen referencial del videojuego God of War Ragnarök',
    reserva: true,
  },
  {
    id: 'juego-3',
    nombre: "Baldur's Gate 3",
    descripcion: 'RPG por turnos basado en Dungeons & Dragons, con decisiones que cambian la historia.',
    precio: 44990,
    precioOferta: 37990,
    plataforma: 'PC, PlayStation 5 y Xbox Series X',
    imagen: 'https://picsum.photos/200/200?random=103',
    alt: "Imagen referencial del videojuego Baldur's Gate 3",
    reserva: true,
  },
  {
    id: 'juego-4',
    nombre: 'Cyberpunk 2077: Phantom Liberty',
    descripcion: 'Expansión de espionaje en Night City, con una nueva zona y misiones de alto riesgo.',
    precio: 34990,
    precioOferta: 28990,
    plataforma: 'PC, PlayStation 5 y Xbox Series X',
    imagen: 'https://picsum.photos/200/200?random=104',
    alt: 'Imagen referencial del videojuego Cyberpunk 2077: Phantom Liberty',
    reserva: true,
  },
  {
    id: 'juego-5',
    nombre: 'Hades II',
    descripcion: 'Roguelike de acción donde Melinoë enfrenta a los titanes para salvar el inframundo.',
    precio: 24990,
    precioOferta: 20990,
    plataforma: 'PC y Nintendo Switch',
    imagen: 'https://picsum.photos/200/200?random=105',
    alt: 'Imagen referencial del videojuego Hades II',
    reserva: true,
  },
  {
    id: 'juego-6',
    nombre: 'Stardew Valley',
    descripcion: 'Simulador de granja y vida rural con cultivo, minería, pesca y relaciones con el pueblo.',
    precio: 12990,
    precioOferta: 9990,
    plataforma: 'PC, PlayStation, Xbox y Nintendo Switch',
    imagen: 'https://picsum.photos/200/200?random=106',
    alt: 'Imagen referencial del videojuego Stardew Valley',
    reserva: true,
  },
]
