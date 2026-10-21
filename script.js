// Listas de imágenes apuntando a assets/img/
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
  "assets/img/cabeza4.jpg", // Ajusta según el nombre de tus imágenes
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
  "assets/img/cabeza4.jpg", // Ajusta según el nombre de tus imágenes
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

// Función para generar número aleatorio
function numeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// Lanza confeti con los colores de la bandera de Colombia
function lanzarConfetiColombiano() {
  confetti({
    particleCount: 120,
    spread: 80,
    origin: { y: 0.6 },
    colors: ['#facc15', '#003893', '#ce1126'] // Amarillo, Azul y Rojo
  });
}

// Genera la mezcla de imágenes
function generarBestia() {
  cabezaAleatorio = numeroAleatorio(0, listaCabezas.length);
  troncoAleatorio = numeroAleatorio(0, listaTroncos.length);
  patasAleatorio = numeroAleatorio(0, listaPatas.length);

  cabeza.src = listaCabezas[cabezaAleatorio];
  tronco.src = listaTroncos[troncoAleatorio];
  patas.src = listaPatas[patasAleatorio];

  console.log("Cabeza:", cabezaAleatorio, "Tronco:", troncoAleatorio, "Patas:", patasAleatorio);

  // Comprobar si coinciden los 3 espacios
  if (cabezaAleatorio === troncoAleatorio && troncoAleatorio === patasAleatorio) {
    // Reproduce la música
    musica.currentTime = 0;
    musica.play().catch(e => console.log("Permiso de audio requerido:", e));

    // Lanza el confeti tricolor
    lanzarConfetiColombiano();
  }
}

// Evento al hacer clic en Mezclar
boton.addEventListener("click", function () {
  generarBestia();
});

// Cargar la primera combinación al iniciar
generarBestia();

