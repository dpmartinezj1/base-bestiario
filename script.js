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

// Elementos HTML
const cabeza = document.getElementById("cabeza");
const tronco = document.getElementById("tronco");
const patas = document.getElementById("patas");
const boton = document.getElementById("boton");
const mensaje = document.getElementById("mensaje");
const contenedorPersonaje = document.getElementById("contenedorPersonaje");
const musica = document.getElementById("musicaPollera");

function numeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// Confeti con los colores de la bandera (más rosado y turquesa de carnaval)
function lanzarConfetiColombiano() {
  if (typeof confetti === "function") {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#fcd116", "#003893", "#ce1126", "#e6007e", "#00a99d"],
    });
  }
}

// conEfectos = false en la carga de la página (sin música ni confeti)
function generarBestia(conEfectos) {
  const idxCabeza = numeroAleatorio(0, listaCabezas.length);
  const idxTronco = numeroAleatorio(0, listaTroncos.length);
  const idxPatas = numeroAleatorio(0, listaPatas.length);

  cabeza.src = listaCabezas[idxCabeza];
  tronco.src = listaTroncos[idxTronco];
  patas.src = listaPatas[idxPatas];

  // Limpiamos los efectos de la mezcla anterior
  contenedorPersonaje.classList.remove("casi");
  mensaje.textContent = "";
  musica.pause();
  musica.currentTime = 0;

  if (!conEfectos) return;

  // Como las tres listas son las mismas, comparamos los índices
  const tresIguales = idxCabeza === idxTronco && idxTronco === idxPatas;
  const dosIguales =
    idxCabeza === idxTronco || idxTronco === idxPatas || idxCabeza === idxPatas;

  if (dosIguales) {
    void contenedorPersonaje.offsetWidth; // reinicia la animación
    contenedorPersonaje.classList.add("casi");
    mensaje.textContent = tresIguales
      ? "¡Criatura legendaria! 🎉"
      : "¡Casi! Dos platos iguales";

    // El play() va directo dentro del clic, así los celulares lo permiten
    musica.play().catch((err) => console.log("No se pudo reproducir:", err));
  }

  if (tresIguales) {
    lanzarConfetiColombiano();
  }
}

// Cada clic en el botón arma una nueva mezcla
boton.addEventListener("click", function () {
  generarBestia(true);
});

// Primera carga
generarBestia(false);

