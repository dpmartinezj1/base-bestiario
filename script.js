// Las tres posiciones usan las mismas fotos de comida
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
  "assets/img/cabeza10.jpg",
];
const listaTroncos = listaCabezas;
const listaPatas = listaCabezas;

// Probabilidad de que salgan las 3 fotos iguales (0.2 = 1 de cada 5 mezclas).
// Con 10 fotos y 0 de ayuda, sería solo 1 de cada 100.
const PROBABILIDAD_TRIPLE = 0.2;

// Elementos HTML
const cabeza = document.getElementById("cabeza");
const tronco = document.getElementById("tronco");
const patas = document.getElementById("patas");
const boton = document.getElementById("boton");

// Canción: prueba cada ruta en orden hasta encontrar el archivo
const rutasMusica = [
  "assets/img/pollera.mp3",
  "pollera.mp3",
  "assets/pollera.mp3",
  "assets/img/La Pollera Colora (Letra Lyrics).mp3",
  "La Pollera Colora (Letra Lyrics).mp3",
].map(encodeURI);

let rutaActual = 0;
const musica = new Audio();
musica.preload = "auto";

musica.addEventListener("error", function () {
  rutaActual++;
  if (rutaActual < rutasMusica.length) {
    musica.src = rutasMusica[rutaActual];
    musica.load();
  } else {
    console.log("No encontré el mp3. Renómbralo a pollera.mp3 y ponlo en assets/img/");
  }
});

// Se carga apenas abre la página, así ya está lista cuando coincidan las 3
musica.src = rutasMusica[rutaActual];
musica.load();

function numeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// Confeti con los colores de la bandera
function lanzarConfetiColombiano() {
  if (typeof confetti === "function") {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#fcd116", "#003893", "#ce1126"],
    });
  }
}

// conEfectos = false en la carga de la página (sin música ni confeti)
function generarBestia(conEfectos) {
  let idxCabeza = numeroAleatorio(0, listaCabezas.length);
  let idxTronco = numeroAleatorio(0, listaTroncos.length);
  let idxPatas = numeroAleatorio(0, listaPatas.length);

  // Ayuda para que las 3 iguales salgan más seguido
  if (conEfectos && Math.random() < PROBABILIDAD_TRIPLE) {
    idxTronco = idxCabeza;
    idxPatas = idxCabeza;
  }

  cabeza.src = listaCabezas[idxCabeza];
  tronco.src = listaTroncos[idxTronco];
  patas.src = listaPatas[idxPatas];

  // Cada mezcla nueva corta la música anterior
  musica.pause();
  musica.currentTime = 0;

  if (!conEfectos) return;

  // Como las tres listas son las mismas, comparamos los índices
  const tresIguales = idxCabeza === idxTronco && idxTronco === idxPatas;

  if (tresIguales) {
    // El play() va directo dentro del clic, así los celulares lo permiten
    musica.play().catch(function (err) {
      console.log("Audio:", err);
    });
    lanzarConfetiColombiano();
  }
}

// Cada clic en el botón arma una nueva mezcla
boton.addEventListener("click", function () {
  generarBestia(true);
});

// Primera carga
generarBestia(false);

