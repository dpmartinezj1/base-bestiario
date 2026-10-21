// Listas de imágenes (las tres usan las mismas fotos de comida)
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

const listaTroncos = [
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

const listaPatas = [
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

// Nombres de los platos, en el mismo orden que las fotos. Cámbialos por los reales.
const listaNombres = [
  "Plato 1", "Plato 2", "Plato 3", "Plato 4", "Plato 5",
  "Plato 6", "Plato 7", "Plato 8", "Plato 9", "Plato 10",
];

// Obtenemos los contenedores de las imágenes del HTML usando los IDs
const cabeza = document.getElementById("cabeza");
const tronco = document.getElementById("tronco");
const patas = document.getElementById("patas");
const boton = document.getElementById("boton");
const contenedorPersonaje = document.getElementById("contenedorPersonaje");
const mensaje = document.getElementById("mensaje");

// Inicializamos las variables de los números aleatorios
let cabezaAleatorio = 0;
let troncoAleatorio = 0;
let patasAleatorio = 0;

// Función para generar un número aleatorio entre dos valores
function numeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// Confeti con los colores de la bandera
function lanzarConfeti() {
  const colores = ["#fcd116", "#003893", "#ce1126"];
  for (let i = 0; i < 60; i++) {
    const pieza = document.createElement("div");
    pieza.className = "confeti";
    pieza.style.left = Math.random() * 100 + "vw";
    pieza.style.backgroundColor = colores[i % 3];
    pieza.style.animationDuration = 2 + Math.random() * 2 + "s";
    pieza.style.animationDelay = Math.random() * 0.8 + "s";
    document.body.appendChild(pieza);
    setTimeout(function () {
      pieza.remove();
    }, 5000);
  }
}

// Revisa cuántos platos coinciden y hace algo especial
function revisarCoincidencias() {
  contenedorPersonaje.classList.remove("casi", "legendario");
  mensaje.textContent = "";
  void contenedorPersonaje.offsetWidth; // reinicia la animación

  if (cabezaAleatorio === troncoAleatorio && troncoAleatorio === patasAleatorio) {
    contenedorPersonaje.classList.add("legendario");
    mensaje.textContent = `¡Criatura legendaria! Triple ${listaNombres[cabezaAleatorio]}`;
    lanzarConfeti();
  } else if (
    cabezaAleatorio === troncoAleatorio ||
    cabezaAleatorio === patasAleatorio ||
    troncoAleatorio === patasAleatorio
  ) {
    contenedorPersonaje.classList.add("casi");
    mensaje.textContent = "¡Casi! Dos platos iguales";
  }
}

// Función para crear una nueva bestia con tres imágenes elegidas aleatoriamente
function generarBestia() {
  cabezaAleatorio = numeroAleatorio(0, listaCabezas.length);
  troncoAleatorio = numeroAleatorio(0, listaTroncos.length);
  patasAleatorio = numeroAleatorio(0, listaPatas.length);

  // Asignamos la nueva fuente (source) a cada imagen
  cabeza.src = listaCabezas[cabezaAleatorio];
  tronco.src = listaTroncos[troncoAleatorio];
  patas.src = listaPatas[patasAleatorio];

  console.log(cabezaAleatorio, troncoAleatorio, patasAleatorio);

  revisarCoincidencias();
}

// Generamos un nuevo collage cada vez que hacemos click en el botón "mezclar"
boton.addEventListener("click", function () {
  generarBestia();
});

generarBestia();
