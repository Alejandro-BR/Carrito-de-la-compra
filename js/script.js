/**
 * Alejandro Barrionuevo Rosado
 * Fernando Sanchez Lagos
 * Raquel López
 * Jose Molina
 * Pablo Ruiz
 */

// Cargar DOM
const botonVaciarCarrito = document.querySelector("#vaciar-carrito"); // Boton vaciar carrito
const listaCursos = document.querySelector("#lista-cursos"); // Array de todos los cursos total 12  //.container
const carrito = document.querySelector("#lista-carrito") // El contenedor del carrito
const botonAgregarCarrito = document.querySelectorAll(".agregar-carrito");  // Está dentro del <a> en class </a>
const table = document.getElementById('lista-carrito');

// Variables
let curso = {}; // Objeto curso
let carritoProductos = JSON.parse(localStorage.getItem("carrito")) || [];; // Array con todos los cursos

// Actualiza la pagina cuando entramos
crearTrCarrito();

// Eventos

listaCursos.addEventListener('click', recogerDatosCurso);
botonVaciarCarrito.addEventListener('click', vaciarCarrito);
table.addEventListener('click', borrarCurso);

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
      precioCurso: parseInt(cursoSeleccionado.children[1].children[3].children[0].textContent.replace("$", "")), // Quitar primera posicion
      cantidad: 1
    }
    setcarritoProducto(curso);
  }
}

/**
 * Funcion para editar el carrito.
 * 
 * @param {*} curso 
 */
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
  crearTrCarrito();
}

/**
 * Funcion para vaciar el carrito
 * 
 * - Limpia la variable.
 * - Limpia el localStorage.
 * - Actualiza el carrito.
 */
function vaciarCarrito() {
  carritoProductos = [];
  localStorage.removeItem("carrito");

  crearTrCarrito();
}

/**
 * Funcion para crear un tr para el carrito
 */
function crearTrCarrito() {

  actualizarLocalStorage();
  table.children[1].innerHTML = "";

  carritoProductos.forEach(c => {
    const tr = document.createElement('tr');

    let th1 = document.createElement('th');
    let img = document.createElement('img');
    img.setAttribute('src', c.imagenCurso);
    th1.appendChild(img);
    tr.appendChild(th1);

    let th2 = document.createElement('th');
    th2.textContent = c.nombreCurso;
    tr.appendChild(th2);

    let th3 = document.createElement('th');
    th3.textContent = "$" + c.precioCurso;
    tr.appendChild(th3);

    let th4 = document.createElement('th');
    th4.textContent = c.cantidad;
    tr.appendChild(th4);

    // Crear el enlace para borrar el tweet
    const x = document.createElement('a');
    x.textContent = ' X';
    x.className = 'borrar-curso';
    x.id = c.id;
    tr.appendChild(document.createElement('th').appendChild(x));

    table.children[1].appendChild(tr);
  })
}

function borrarCurso(event) {
  if (event.target == document.querySelector("a")) {
    console.log("Borrar");
    carritoProductos = carritoProductos.filter(c => c.id !== event.target.id);
    localStorage.setItem("carrito", JSON.stringify(carritoProductos));
    crearTrCarrito();
  }
}

/**
 * Funcion para cuando recargues la página se cargue el LocalStorage
 */
function actualizarLocalStorage() {
  carritoProductos = JSON.parse(localStorage.getItem("carrito")) || [];
}