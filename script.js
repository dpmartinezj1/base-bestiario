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

// Ayuda extra para que las coincidencias salgan más seguido.
// 0.35 = 35% de las mezclas fuerzan coincidencia (de esas, 1 de cada 4 es triple).
// Pon 0 si quieres que sea 100% azar.
const PROBABILIDAD_EXTRA = 0.35;

// Elementos HTML
const cabeza = document.getElementById("cabeza");
const tronco = document.getElementById("tronco");
const patas = document.getElementById("patas");
const boton = document.getElementById("boton");
const botonMusica = document.getElementById("botonMusica");
const mensaje = document.getElementById("mensaje");
const contenedorPersonaje = document.getElementById("contenedorPersonaje");
const musica = document.getElementById("musicaPollera");

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

// Reproduce la canción y avisa en pantalla si algo falla
function sonarMusica() {
  musica.currentTime = 0;
  const promesa = musica.play();
  if (promesa !== undefined) {
    promesa.catch(function (err) {
      console.log("Audio:", err);
      if (err.name === "NotSupportedError") {
        mensaje.textContent = "🔇 No encuentro el mp3: revisa su nombre y carpeta";
      } else {
        mensaje.textContent = "🔇 Toca 'Probar música' para activar el sonido";
      }
    });
  }
}

// conEfectos = false en la carga de la página (sin música ni confeti)
function generarBestia(conEfectos) {
  let idxCabeza = numeroAleatorio(0, listaCabezas.length);
  let idxTronco = numeroAleatorio(0, listaTroncos.length);
  let idxPatas = numeroAleatorio(0, listaPatas.length);

  // Ayuda extra para que haya coincidencias más seguido
  if (conEfectos) {
    const suerte = Math.random();
    if (suerte < PROBABILIDAD_EXTRA * 0.25) {
      // Triple
      idxTronco = idxCabeza;
      idxPatas = idxCabeza;
    } else if (suerte < PROBABILIDAD_EXTRA) {
      // Doble: un espacio al azar copia a otro
      const copiar = numeroAleatorio(0, 3);
      if (copiar === 0) idxTronco = idxCabeza;
      if (copiar === 1) idxPatas = idxTronco;
      if (copiar === 2) idxPatas = idxCabeza;
    }
  }

  cabeza.src = listaCabezas[idxCabeza];
  tronco.src = listaTroncos[idxTronco];
  patas.src = listaPatas[idxPatas];

  // Limpiamos los efectos de la mezcla anterior
  contenedorPersonaje.classList.remove("casi");
  mensaje.textContent = "";
  musica.pause();
  musica.currentTime = 0;
  botonMusica.textContent = "🔊 Probar música";

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
    sonarMusica();
    botonMusica.textContent = "⏸ Pausar música";
  }

  if (tresIguales) {
    lanzarConfetiColombiano();
  }
}

// Cada clic en el botón arma una nueva mezcla
boton.addEventListener("click", function () {
  generarBestia(true);
});

// Botón para probar o pausar la música
botonMusica.addEventListener("click", function () {
  if (musica.paused) {
    mensaje.textContent = "";
    sonarMusica();
    botonMusica.textContent = "⏸ Pausar música";
  } else {
    musica.pause();
    botonMusica.textContent = "🔊 Probar música";
  }
});

// Cuando la canción termina, el botón vuelve a su texto normal
musica.addEventListener("ended", function () {
  botonMusica.textContent = "🔊 Probar música";
});

// Primera carga
generarBestia(false);


