/**
 * Alejandro Barrionuevo Rosado
 * Fernando Sanchez Lagos
 * Raquel López
 * Jose Molina
 * Pablo Ruiz
 */

// Cargar DOM
const botonVaciarCarrito = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
const carrito = document.querySelector("#lista-carrito");
const botonAgregarCarrito = document.querySelectorAll(".agregar-carrito");
const table = document.getElementById('lista-carrito');

// Variables
let curso = {};
let carritoProductos;

async function init() {
  actualizarVariableConLocalStorage();
  const data = await getCatalogo();
  mostrarCard(data);
  crearHtmlCarrito();
}

init();

// Eventos
listaCursos.addEventListener('click', recogerDatosCurso);
botonVaciarCarrito.addEventListener('click', vaciarCarrito);
table.addEventListener('click', borrarCurso);

// Funciones

/**
 * Funcion para recoger datos al hacer click en el boton "agregar carrito"
 */
function recogerDatosCurso(event) {
  event.preventDefault();
  if (event.target.classList.contains("agregar-carrito")) {
    let cursoSeleccionado = event.target.parentElement.parentElement;
    curso = {
      id: cursoSeleccionado.children[1].children[4].getAttribute("data-id"),
      imagenCurso: cursoSeleccionado.children[0].src,
      nombreCurso: cursoSeleccionado.children[1].children[0].textContent,
      precioCurso: parseInt(cursoSeleccionado.children[1].children[3].children[0].textContent.replace("$", "")),
      cantidad: 1
    }
    setcarritoProducto(curso);
  }
}

/**
 * Funcion para agregar un producto al carrito
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
  carritoProductos = [];
  localStorage.removeItem("carrito");
  crearHtmlCarrito();
}

/**
 * Funcion para crear un tr para el carrito
 */
function crearHtmlCarrito() {

  actualizarVariableConLocalStorage();
  const tbody = table.querySelector("tbody");
  tbody.innerHTML = "";

  carritoProductos.forEach(curso => {
    const tr = document.createElement('tr');

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
 * Función para borrar un curso.
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
 * Funcion para actualizar la variable
 */
function actualizarVariableConLocalStorage() {
  carritoProductos = JSON.parse(localStorage.getItem("carrito")) || [];
}

/**
 * Funcion para actualizar el local storage
 */
function actualizarLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(carritoProductos));
}

/**
 * Obtener el json
 * 
 * @returns data o error
 */
async function getCatalogo() {
  let response;
  try {
    // Usa fetch para obtener el archivo JSON
    response = await fetch('data/data.json');
    // Convierte la respuesta a JSON
    let data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener el catálogo:', error);
  }
  return response;
}

/**
 * Crear el html
 * 
 * @param {Array} data 
 */
function mostrarCard(data) {

  // for (let i = 0; i < data.length; i += 3) {
  //   const div = document.createElement('div');
  //   div.classList.add('row');

  //   data.forEach(c => {
  //     const div = document.createElement('div');
  //     div.classList.add('row');
  //     div.innerHTML = `
  //         <div class="four columns">
  //           <div class="card">
  //               <img src="${c.url}" class="imagen-curso u-full-width" />
  //               <div class="info-card">
  //                 <h4>${c.nombre}</h4>
  //                 <p>${c.autor}$</p>
  //                 <img src="img/estrellas.png" />
  //                 <p class="precio">
  //                   $200
  //                   <span class="u-pull-right">${c.precio}</span>
  //                 </p>
  //                 <a
  //                   href="#"
  //                   class="u-full-width button-primary button input agregar-carrito"
  //                   data-id="${c.id}"
  //                   >Agregar Al Carrito</a
  //                 >
  //               </div>
  //             </div>
  //         </div>
  //     `;
  //     listaCursos.appendChild(div);
  //   });

  // }
  for (let i = 0; i < data.length; i += 3) {
    const divRow = document.createElement('div');
    divRow.classList.add('row');

    for (let j = 0; j < data.length; j++) {
      const div = document.createElement('div');
      div.classList.add('four columns');
      div.innerHTML = `
                <div class="card">
                    <img src="${data[j].url}" class="imagen-curso u-full-width" />
                    <div class="info-card">
                      <h4>${data[j].nombre}</h4>
                      <p>${data[j].autor}$</p>
                      <img src="img/estrellas.png" />
                      <p class="precio">
                        $200
                        <span class="u-pull-right">${data[j].precio}</span>
                      </p>
                      <a
                        href="#"
                        class="u-full-width button-primary button input agregar-carrito"
                        data-id="${data[j].id}"
                        >Agregar Al Carrito</a
                      >
                    </div>
                  </div>
          `;
    }
    divRow.appendChild(div);
  }
  listaCursos.appendChild(divRow);
}