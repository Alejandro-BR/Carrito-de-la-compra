/**
 * Alejandro Barrionuevo Rosado
 * Fernando Sanchez Lagos
 * Raquel López
 * Jose Molina
 * Pablo Ruiz
 */

////// Cargar DOM
const botonVaciarCarrito = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
const carrito = document.querySelector("#lista-carrito");
const botonAgregarCarrito = document.querySelectorAll(".agregar-carrito");
const table = document.getElementById('lista-carrito');

////// Variables
let carritoProductos;

/**
 * Inicia la pagina web cargando datos y configuraciones necesarias.
 * Actualiza variables desde el almacenamiento local, obtiene el catalogo de productos
 * y muestra las tarjetas correspondientes. Y contenido inicial del carrito de compras en HTML.
 * 
 */
async function init() {
  actualizarVariableConLocalStorage();
  const data = await getCatalogo();
  mostrarCard(data);
  crearHtmlCarrito();
}

// Llamamos a la funcion que inicia la pagina.
init();

////// Eventos
listaCursos.addEventListener('click', recogerDatosCurso);
botonVaciarCarrito.addEventListener('click', vaciarCarrito);
table.addEventListener('click', borrarCurso);

////// Funciones

/**
 * Recoge los datos de un curso seleccionado.
 * Extrae la informacion del curso.
 * Y envia ese objeto al carrito de compras.
 *
 * @param {Event} event
 * 
 */
function recogerDatosCurso(event) {
  event.preventDefault(); // Evitar que la pagina se recargue
  if (event.target.classList.contains("agregar-carrito")) {
    let cursoSeleccionado = event.target.parentElement.parentElement;
    let curso = {
      id: cursoSeleccionado.children[1].children[4].getAttribute("data-id"),
      imagenCurso: cursoSeleccionado.children[0].src,
      nombreCurso: cursoSeleccionado.children[1].children[0].textContent,
      precioCurso: parseInt(cursoSeleccionado.children[1].children[3].children[0].textContent.replace("$", "")),
      cantidad: 1
    }
    setCarritoProducto(curso);
  }
}

/**
 * Agrega un curso al carrito de compras. 
 * - Si el curso ya existe en el carrito, incrementa la cantidad.
 * - Si no, lo agrega como un nuevo producto.
 *
 * @param {Object} curso 
 * 
 */
function setCarritoProducto(curso) {
  let productoExiste = false;
  // Usamos forEach para verificar si el producto ya esta en el carrito
  carritoProductos.forEach(c => {
    if (c.id == curso.id) {
      // Si esta aumentamos la cantidad
      c.cantidad++;
      productoExiste = true;
    }
  })
  // Si el producto no existe, lo agregamos
  if (!productoExiste) {
    carritoProductos.push(curso);
  }
  // Actualizamos el localStorage y la vista del carrito
  actualizarLocalStorage();
  crearHtmlCarrito();
}

/**
 * Funcion para vaciar el carrito
 * 
 * - Limpia la variable.
 * - Limpia el localStorage.
 * - Actualiza el carrito.
 */
function vaciarCarrito() {
  // Reinicia la variable
  carritoProductos = [];
  // Elimina el localStorage 
  localStorage.removeItem("carrito");
  // Actualizar el carrito
  crearHtmlCarrito();
}

/**
 * Crea y actualiza el contenido del carrito en el HTML.
 * 
 * - Recupera los productos del carrito almacenados en el localStorage.
 * - Limpia el contenido del carrito en la tabla HTML.
 * - Genera una fila por cada producto en el carrito, mostrando su imagen, nombre, precio, cantidad y un botón para eliminarlo.
 */
function crearHtmlCarrito() {

  actualizarVariableConLocalStorage(); //Actualiza el localStorage
  const tbody = table.querySelector("tbody");
  tbody.innerHTML = "";

  // Recorre el array que contiene todos los productos agregados al carrito.
  carritoProductos.forEach(curso => {
    const tr = document.createElement('tr');
    // Crea una fila para cada producto
    tr.innerHTML = `
      <th><img src="${curso.imagenCurso}" width="100"></th>
      <th>${curso.nombreCurso}</th>
      <th>$${curso.precioCurso}</th>
      <th>${curso.cantidad}</th>
      <th><a href="#" class="borrar-curso" id="${curso.id}">X</a></th>
    `;
    tbody.appendChild(tr);
  })
}

/**
 * Borrar un curso seleccionado en el carrito.
 * 
 * @param {*} event 
 */
function borrarCurso(event) {
  if (event.target.classList.contains("borrar-curso")) {
    carritoProductos = carritoProductos.filter(c => c.id !== event.target.id);
    actualizarLocalStorage();
    crearHtmlCarrito();

    if (carritoProductos.length === 0) {
      localStorage.removeItem("carrito");
    }
  }
}

/**
 * Actualiza la variable "carritoProductos".
 */
function actualizarVariableConLocalStorage() {
  carritoProductos = JSON.parse(localStorage.getItem("carrito")) || [];
}

/**
 * Actualiza el local storage.
 */
function actualizarLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(carritoProductos));
}

/**
 * Obtiene el catalogo de cursos desde un archivo JSON.
 * 
 * - Fichero: "data/data.json"
 * 
 * @returns {Promise<Object>} - datos del catalogo en formato JSON
 */
async function getCatalogo() {
  try {
    // Usa fetch para obtener el archivo JSON
    const response = await fetch('data/data.json');
    // Convierte la respuesta a JSON
    const data = await response.json();
    return data; // Devuelve los datos del catalogo en formato JSON
  } catch (error) {
    console.error('Error al obtener el catalogo: ', error);
    return {};
  }
}

/**
 * Crea el HTML dinamicamente para mostrar los cursos en forma de tarjetas.
 * 
 * @param {Array} data - Array[objetos]
 * 
 */
function mostrarCard(data) {
  // Itera en bloques de 3 elementos
  for (let i = 0; i < data.length; i += 3) {
    // Crea un nuevo div para cada fila de 3 tarjetas
    const divRow = document.createElement('div');
    divRow.classList.add('row');

    for (let j = 0; j < 3; j++) {
      // Solo crea la tarjeta si el elemento 'data[i + j]' no es null
      if (data[i + j] != null) {
        const div = document.createElement('div');
        div.classList.add('four', 'columns');
        div.innerHTML = `
                <div class="card">
                    <img src="${data[i + j].url}" class="imagen-curso u-full-width" />
                    <div class="info-card">
                      <h4>${data[i + j].nombre}</h4>
                      <p>${data[i + j].autor}</p>
                      <img src="img/estrellas.png" />
                      <p class="precio">
                        $200
                        <span class="u-pull-right">${data[i + j].precio}</span>
                      </p>
                      <a
                        href="#"
                        class="u-full-width button-primary button input agregar-carrito"
                        data-id="${data[i + j].id}"
                        >Agregar Al Carrito</a
                      >
                    </div>
                  </div>
          `;
        // Añade el div de la tarjeta a la fila
        divRow.appendChild(div);
      }
    }
    // Añade la fila completa al contenedor 'listaCursos'
    listaCursos.appendChild(divRow);
  }
}