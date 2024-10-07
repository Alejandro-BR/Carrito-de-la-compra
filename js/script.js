// Alejandro Barrionuevo Rosado, Fernando Sanchez Lagos, Raquel López, Jose Molina, Pablo

// Cargar DOM
const botonVaciarCarrito = document.querySelector("#vaciar-carrito"); // Boton vaciar carrito
const listaCursos = document.querySelector("#lista-cursos"); // Array de todos los cursos total 12  //.container
const carrito = document.querySelector("#lista-carrito") // El contenedor del carrito
const botonAgregarCarrito = document.querySelectorAll(".agregar-carrito");  // Está dentro del <a> en class </a>



// Variables

let curso = {};
let carritoProductos = [];

// Actualizar carrito
//actualizarLocalStorage();


// Eventos

listaCursos.addEventListener('click', recogerDatosCurso);
botonVaciarCarrito.addEventListener('click', vaciarCarrito);


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
      precioCurso: cursoSeleccionado.children[1].children[3].children[0].textContext, // Quitar primera posicion
      cantidad: 1
    }

    setcarritoProducto(curso);
  }
}


function setcarritoProducto(curso) {

  let productoExiste = false;

  carritoProductos.forEach(c => {
    if (c.id == curso.id) {
      c.cantidad++;
      productoExiste = true;
    }
  })

  if (!productoExiste) {
    carritoProductos.push(curso);
  }

  localStorage.setItem("carrito", JSON.stringify(carritoProductos));
  crearTrCarrito(carritoProductos);
}

/**
 * Funcion para vaciar el carrito
 */
function vaciarCarrito() {
  localStorage.removeItem("carrito");
}

/**
 * funcion para crear un tr para el carrito
 */
function crearTrCarrito(carritoProductos) {
  carritoProductos.forEach(t =>{

  })
}

/**
 * Funcion para cuando recargues la página se cargue el LocalStorage
 */
function actualizarLocalStorage() {
  carritoProductos = JSON.parse(localStorage.getItem("carrito"))
}