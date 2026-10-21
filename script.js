// Rutas exactas a la carpeta de tus imágenes
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
  "assets/img/tronco1.jpg",
  "assets/img/tronco2.jpg",
  "assets/img/tronco3.jpg",
  "assets/img/tronco1.jpg",
  "assets/img/tronco2.jpg",
  "assets/img/tronco3.jpg",
  "assets/img/tronco1.jpg"
];

const listaPatas = [
  "assets/img/patas1.jpg",
  "assets/img/patas2.jpg",
  "assets/img/patas3.png",
  "assets/img/patas1.jpg",
  "assets/img/patas2.jpg",
  "assets/img/patas3.png",
  "assets/img/patas1.jpg",
  "assets/img/patas2.jpg",
  "assets/img/patas3.png",
  "assets/img/patas1.jpg"
];

// Nombres para comparar combinaciones reales (extrae el número de la imagen)
function obtenerNumero(ruta) {
  const coincidencia = ruta.match(/\d+/);
  return coincidencia ? coincidencia[0] : null;
}

// Elementos HTML
const cabeza = document.getElementById("cabeza");
const tronco = document.getElementById("tronco");
const patas = document.getElementById("patas");
const boton = document.getElementById("boton");
const musica = document.getElementById("musicaPollera");

let audioInicializado = false;

function numeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// Confeti tricolor (Amarillo, Azul y Rojo)
function lanzarConfetiColombiano() {
  if (typeof confetti === "function") {
    confetti({
      particleCount: 110,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#facc15', '#003893', '#ce1126']
    });
  }
}

function generarBestia() {
  const idxCabeza = numeroAleatorio(0, listaCabezas.length);
  const idxTronco = numeroAleatorio(0, listaTroncos.length);
  const idxPatas = numeroAleatorio(0, listaPatas.length);

  cabeza.src = listaCabezas[idxCabeza];
  tronco.src = listaTroncos[idxTronco];
  patas.src = listaPatas[idxPatas];

  // Extraer los números de los nombres del archivo (ej. tronco1.jpg -> 1)
  const numCabeza = obtenerNumero(listaCabezas[idxCabeza]);
  const numTronco = obtenerNumero(listaTroncos[idxTronco]);
  const numPatas = obtenerNumero(listaPatas[idxPatas]);

  // Verificar si hay 2 o 3 iguales por número de pieza
  const coincidencia2 = (numCabeza === numTronco) || (numTronco === numPatas) || (numCabeza === numPatas);
  const coincidencia3 = (numCabeza === numTronco && numTronco === numPatas);

  // Lógica de Sonido y Confeti
  if (coincidencia2 || coincidencia3) {
    musica.currentTime = 0;
    musica.play().catch(err => console.log("Permiso de audio móvil:", err));
  }

  if (coincidencia3) {
    lanzarConfetiColombiano();
  }
}

// Evento principal optimizado para teléfonos
boton.addEventListener("click", function () {
  // Desbloquea restricciones de audio de iOS/Safari en el primer clic
  if (!audioInicializado) {
    musica.play().then(() => {
      musica.pause();
      musica.currentTime = 0;
      audioInicializado = true;
      generarBestia();
    }).catch(() => {
      generarBestia();
    });
  } else {
    generarBestia();
  }
});

// Primera carga
generarBestia();


