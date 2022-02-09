const verificacionLoguin = function () {
  let user = JSON.parse(localStorage.getItem("user")) || null
  if (!user.admin) {
      location.href='./home.html';
  }

}
verificacionLoguin ()


var menu_btn = document.querySelector("#menu-btn");
var sidebar = document.querySelector("#sidebar");
var container = document.querySelector(".my-container");
menu_btn.addEventListener("click", () => {
  sidebar.classList.toggle("active-nav");
  container.classList.toggle("active-cont");
});

//--------------PEDIDOS---------------------------

const mostrarPedido = function () {
  
  let detalleTabla = document.getElementById('detalleTabla')
  let detalleTablaHtml =`<h2 class="text-center my-3">Pedidos</h2>
  <div class="accordion" id="accordionExample">`
  let pedidos = JSON.parse(localStorage.getItem('pedidos')) || []
  let numeracion ='ticket'
  let i = 0

  pedidos.forEach(function (pedido) {
    const {usuario, carrito} = pedido
    
    let montoTotal = 0
    let productos =`<div class="table-responsive col-10 offset-1">
    <table class="table ">
      <thead>
        <tr>
          <th>Cantidad</th>
          <th>Producto</th>
          <th>Valor</th>
        </tr>
      </thead>
      <tbody id="tbProducto">` 
    carrito.forEach(function (producto) {
      productos += `<tr>
      <th scope="row">${producto.cantidad}</th>
      <td >${producto.nombre}</td>
      <td>$${producto.valor}</td>
    </tr>` 
      montoTotal = producto.valor * producto.cantidad
      
    })
    productos +=`</tbody>
    </table>
    </div>`
        
    detalleTablaHtml +=` 
    
        <div class="accordion-item ">
          <h2 class="accordion-header "  id="headingTwo">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${numeracion+i}" aria-expanded="false" aria-controls="${numeracion+i}" >
            Ticket ${i+1} 
            </button>
          </h2>
          <div id="${numeracion+i}"  class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
            <div class="accordion-body row" >
            
              <strong>Usuario: ${usuario.correo}</strong>
              <strong class="my-2">Producto:</strong>
              <div class="row">
                <spam>${productos}</spam>
              </div> 
              <strong>Monto Total: ${montoTotal}</strong>  
            </div>
          </div> `
    i++
  })
  detalleTablaHtml +=`</div>`
  detalleTabla.innerHTML = detalleTablaHtml
}

//--------------PEDIDOS---------------------------

//--------------PRODUCTO---------------------------


const mostrarProducto = function () {
  let detalleTabla = document.getElementById('detalleTabla')
  let detalleTablaHtml =`<h2 class="text-center my-3">Productos</h2>
  <div class="table-responsive">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Imagen</th>
          <th scope="col">Nombre</th>
          <th scope="col">Valor</th>
          <th scope="col">Cantidad</th>
        </tr>
      </thead>
      <tbody id="tbProducto">`
  let productos = JSON.parse(localStorage.getItem('productos')) || []
  
  productos.forEach(function (producto) {
    
    

    detalleTablaHtml +=`<tr>
    <td class="producto" scope="">
      <img src="${producto.imagen}" class="img-fluid" />
    </td>
    <td class="detalle">${producto.nombre}</td>
    <td class="detalle">
      $${producto.valor}<a class="btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick='modificarValor(${producto.id})'>
      <i class="bx bx bx-edit ms-2"></i></a>
    </td>
    <td class="detalle">
      ${producto.cantidad}
      <a class="btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick='modificarCantidad(${producto.id})'>
                  <i class="bx bx bx-edit ms-2"></i></a>
    </td>
  </tr>
`
  })
  detalleTablaHtml += `</tbody>
          </table>
  `
  detalleTabla.innerHTML = detalleTablaHtml
}

//--------------ABRE MODAL VALOR---------------------------


const modificarValor = function (id) {
  let modal = document.getElementById('modal')
  let productos = JSON.parse(localStorage.getItem('productos'))
  let producto = productos.find((product) => (product.id === id))
  modal.innerHTML = `
  <div class="modal-body row ">
          
  <p class="col-auto offset-1">Cambiar valor:</p>
  <input type="text" value=${producto.valor} class=" col-auto" id='cambio'>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick='cambiarDato(${id},${true},cambio.value)'>Guardar</button>
        </div>
`
}

//--------------ABRE MODAL CANTIDAD---------------------------

const modificarCantidad = function (id) {
  
  let modal = document.getElementById('modal')
  let productos = JSON.parse(localStorage.getItem('productos'))
  let producto = productos.find((product) => (product.id === id))
  modal.innerHTML = `
  <div class="modal-body row ">
          
  
  <p class="col-auto offset-1">Agregar cantidad:</p>
  <input type="text" value=${producto.cantidad} class="col-auto" id='cambio'>
  </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick='cambiarDato(${id},${false},cambio.value)'>Guardar</button>
        </div>
`

}

//--------------CAMBIA LOS DATOS---------------------------

const cambiarDato = function (id,valor,cambio) {
  let productos = JSON.parse(localStorage.getItem('productos'))
  let producto = productos.find((product) => (product.id === id))
  if (valor) {
    producto.valor = cambio
  } else {
    producto.cantidad = cambio
  }

  localStorage.setItem('productos', JSON.stringify(productos))
  mostrarProducto()
}

//--------------PRODUCTO---------------------------

//--------------USUARIO---------------------------

const mostrarUsuarios = function () {
  let detalleTabla = document.getElementById('detalleTabla')
  let detalleTablaHtml =`<h2 class="text-center my-3">Usuarios</h2>
  <div class="table-responsive">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Nick</th>
          <th scope="col">Correo</th>
          <th scope="col">Estado</th>
        </tr>
      </thead>
  
      <tbody id="tbProducto">`
  let users = JSON.parse(localStorage.getItem('users')) || []
  
  users.forEach(function (user) {
    
    let estado 
    
    if (user.bloqueado) {
      estado=`<a class="btn btn-primary" onClick='bloquear(${user.id})' >Desbloquear</a>
      `
    } else {
      estado = `<a class="btn btn-danger" onClick='bloquear(${user.id})' >Bloquear</a>
      `
    }

    detalleTablaHtml +=`<tr>
    <th scope="row">${user.nick}</th>
    <td>${user.correo}</td>
    <td id="estado">${estado}</td>
    
  </tr>
  
`
  })
  detalleTablaHtml += `</tbody>
          </table>
  `
  detalleTabla.innerHTML = detalleTablaHtml
}

//--------------CAMBIAR ESTADO---------------------------

const bloquear = function (id) {
  let botonEstado = document.getElementById('estado')
  let users = JSON.parse(localStorage.getItem('users'))

  let i = users.find(function (user) {
   return user.id === id
  }
  )
  

  if (i.bloqueado) {
    i.bloqueado = false;
  } else {
    i.bloqueado = true;
    
  }

  localStorage.setItem('users', JSON.stringify(users))
  mostrarUsuarios()
}

//--------------USUARIO---------------------------

//--------------SUGERENCIA---------------------------

const mostrarSugerencia = function () {
  let detalleTabla = document.getElementById('detalleTabla')
  let detalleTablaHtml =`<h2 class="text-center my-3">Sugerencias</h2>
  <div class="accordion" id="accordionExample">`
  let sugerencias = JSON.parse(localStorage.getItem('sugerencias')) || []
  let numeracion ='sugerencia'
  let i = 0

  sugerencias.forEach(function (sugerencia) {
    let leido = ''
    
    
    if (sugerencia.leido) {
      leido=`<i class='bx bxs-envelope-open' ></i>`
    } else {
      leido=`<i class='bx bx-envelope'></i>`
    }

    detalleTablaHtml +=` 
        <div class="accordion-item ">
          <h2 class="accordion-header "  id="headingTwo">
            <button class="accordion-button collapsed" id="botonSugerencia"  onClick="cambiarLeido(${sugerencia.id})" type="button" data-bs-toggle="collapse" data-bs-target="#${numeracion+i}" aria-expanded="false" aria-controls="${numeracion+i}" >
            <span class="badge bg-secondary mx-3">${leido}</span>Fecha ${sugerencia.fecha} 
            </button>
          </h2>
          <div id="${numeracion+i}"  class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
            <div class="accordion-body row" >
              <strong>Correo: ${sugerencia.email}</strong> 
              <strong class="my-2">Nombre: ${sugerencia.nombre}</strong>
              <p>Mensaje: ${sugerencia.sugerencia}</p>  
            </div>
          </div> `
    i++
  })
  detalleTablaHtml +=`</div>`
  detalleTabla.innerHTML = detalleTablaHtml
}

const cambiarLeido = function (id) {
  let sugerencias = JSON.parse(localStorage.getItem('sugerencias')) || []
  
  let sugerencia = sugerencias.find((sugerencia) => (sugerencia.id === id))
  if (!sugerencia.leido) {
    console.log("entro")
    sugerencia.leido = true;
    localStorage.setItem('sugerencias', JSON.stringify(sugerencias))
 
  } 
}


//--------------SUGERENCIA---------------------------
