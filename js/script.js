// Alejandro Barrionuevo Rosado, Fernando Sanchez Lagos, Raquel López, Jose Molina, Pablo

// Cargar DOM
const botonVaciarCarrito = document.querySelector("#vaciar-carrito"); // Boton vaciar carrito
const listaCursos = document.querySelector("#lista-cursos"); // Array de todos los cursos total 12  //.container
const carrito = document.querySelector("#carrito") // El contenedor del carrito
const botonAgregarCarrito = document.querySelectorAll(".agregar-carrito");  // Está dentro del <a> en class </a>

// Variables

const objetos = []; // Array de Objetos 

// Eventos

listaCursos.addEventListener('click', agregarCurso);


// botonVaciarCarrito.addEventListener("click", vaciarCarrito());

// Funciones

/**
 * Funcion para agregar curso al carrito.
 */
function agregarCurso(event) {
  if (event.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = event.target.parentElement.parentElement;
    const datosProducto = {
        imagenCurso: cursoSeleccionado.children[0].src,
        nombreCurso: cursoSeleccionado.children[1].children[0].textContent,
        precioCurso: cursoSeleccionado.children[1].children[3].children[0].textContent
    }
    
    console.log(datosProducto);
  }
}

/**
 * Funcion para vaciar el carrito
 */
function vaciarCarrito() {

}

/**
 * funcion para capturar un objeto
 */
function capturarObjetos() {

}





