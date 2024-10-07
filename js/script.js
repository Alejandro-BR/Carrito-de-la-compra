// Alejandro Barrionuevo Rosado, Fernando Sanchez Lagos, Raquel López, Jose Molina, Pablo

// Cargar DOM
const botonVaciarCarrito = document.querySelector("#vaciar-carrito"); // Boton vaciar carrito
const listaCursos = document.querySelector("#lista-cursos"); // Array de todos los cursos total 12  //.container
const carrito = document.querySelector("#lista-carrito") // El contenedor del carrito
const botonAgregarCarrito = document.querySelectorAll(".agregar-carrito");  // Está dentro del <a> en class </a>
const cantidades = new Map();


// Variables

const curso = [];
let carritoProductos = [];


// Eventos

listaCursos.addEventListener('click', agregarCurso);

// botonVaciarCarrito.addEventListener("click", vaciarCarrito());

// Funciones

/**
 * Funcion para recoger datos al hacer click en el boton "agregar carrito"
 */
function recogerDatosCurso(event) {
  if (event.target.classList.contains("agregar-carrito")) {
    let cursoSeleccionado = event.target.parentElement.parentElement;
    curso = {
      id: cursoSeleccionado.children[1].children[4].getAttribute("data-id"),
      imagenCurso: cursoSeleccionado.children[0].src,
      nombreCurso: cursoSeleccionado.children[1].children[0].textContent,
      precioCurso: cursoSeleccionado.children[1].children[3].children[0].textContent,
      contador: 0
    }

    // setcarritoProducto(datosProducto);
    // crearTrCarrito(datosProducto);
    console.log(curso);
  }
}

function setcarritoProducto(curso) {
  carritoProducto.push(curso);
  localStorage.setItem("productos", JSON.stringify(carritoProductos))

}

/**
 * Funcion para vaciar el carrito
 */
function vaciarCarrito() {

}

/**
 * funcion para crear un tr para el carrito
 */
function crearTrCarrito(producto) {

}


/**
 * Funcion para cuando recargues la página se cargue el LocalStorage
 */
function actualizarLocalStorage() {
  JSON.parse(localStorage.getItem("productos"))
}


