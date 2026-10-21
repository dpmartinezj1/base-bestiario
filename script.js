// Listas de imágenes
const listaCabezas = [
  "assets/img/cabeza1.jpg",
  "assets/img/cabeza2.jpg",
  "assets/img/cabeza3.jpg",
  "assets/img/cabeza4.jpg",
  "assets/img/cabeza5.jpg",
  "assets/img/cabeza6.jpg",
  "assets/img/cabeza7.jpg",
  "assets/img/cabeza8.jpg",
  "assets/img/cabeza9.jpg",
  "assets/img/cabeza10.jpg"
];

const listaTroncos = [
  "assets/img/tronco1.jpg",
  "assets/img/tronco2.jpg",
  "assets/img/tronco3.jpg",
  "assets/img/cabeza4.jpg",
  "assets/img/cabeza5.jpg",
  "assets/img/cabeza6.jpg",
  "assets/img/cabeza7.jpg",
  "assets/img/cabeza8.jpg",
  "assets/img/cabeza9.jpg",
  "assets/img/cabeza10.jpg"
];

const listaPatas = [
  "assets/img/patas1.jpg",
  "assets/img/patas2.jpg",
  "assets/img/patas3.png",
  "assets/img/cabeza4.jpg",
  "assets/img/cabeza5.jpg",
  "assets/img/cabeza6.jpg",
  "assets/img/cabeza7.jpg",
  "assets/img/cabeza8.jpg",
  "assets/img/cabeza9.jpg",
  "assets/img/cabeza10.jpg"
];

// Elementos HTML
const cabeza = document.getElementById("cabeza");
const tronco = document.getElementById("tronco");
const patas = document.getElementById("patas");
const boton = document.getElementById("boton");
const musica = document.getElementById("musicaPollera");

let cabezaAleatorio = 0;
let troncoAleatorio = 0;
let patasAleatorio = 0;

function numeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// Confeti tricolor (Amarillo, Azul y Rojo)
function lanzarConfetiColombiano() {
  confetti({
    particleCount: 130,
    spread: 90,
    origin: { y: 0.6 },
    colors: ['#facc15', '#003893', '#ce1126']
  });
}

function generarBestia() {
  cabezaAleatorio = numeroAleatorio(0, listaCabezas.length);
  troncoAleatorio = numeroAleatorio(0, listaTroncos.length);
  patasAleatorio = numeroAleatorio(0, listaPatas.length);

  cabeza.src = listaCabezas[cabezaAleatorio];
  tronco.src = listaTroncos[troncoAleatorio];
  patas.src = listaPatas[patasAleatorio];

  // Contar cuántas coincidencias hay entre las 3 selecciones
  const coincidencia2 = (cabezaAleatorio === troncoAleatorio) || 
                       (troncoAleatorio === patasAleatorio) || 
                       (cabezaAleatorio === patasAleatorio);

  const coincidencia3 = (cabezaAleatorio === troncoAleatorio && troncoAleatorio === patasAleatorio);

  // Si coinciden 2 o 3, suena la canción
  if (coincidencia2 || coincidencia3) {
    musica.currentTime = 0;
    musica.play().catch(e => console.log("Permiso de reproducción requerido:", e));
  }

  // Si coinciden las 3, ADEMÁS sale el confeti
  if (coincidencia3) {
    lanzarConfetiColombiano();
  }
}

boton.addEventListener("click", function () {
  generarBestia();
});

// Cargar combinación inicial
generarBestia();


