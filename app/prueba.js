var menu_btn = document.querySelector("#menu-btn");
var sidebar = document.querySelector("#sidebar");
var container = document.querySelector(".my-container");
menu_btn.addEventListener("click", () => {
  sidebar.classList.toggle("active-nav");
  container.classList.toggle("active-cont");
});

const mostrarDetallePedido = function (id) {
  let pedidoValor = document.getElementById('pedidoValor')
  let pedidoValorHtml =""
  pedidoValor.innerHTML = pedidoValorHtml
  
  let pedidos = JSON.parse(localStorage.getItem('pedidos')) || []
  let pedido = pedidos.find(function (pedido) {
    return pedido.id === id    
  } )
    
  if (!pedidos.mostrar) {
    
    pedido.forEach(function (producto) {
      
      pedidoValorHtml +=`${producto.nombre}: <br> valor: ${producto.valor} x ${producto.cantidad} `
  
    })
    pedidoValorHtml +=`<a class="btn ms-2" onclick="mostrar(${pedido.id})">
    <i class="bx bx-chevrons-down d-none"></i>
    <i class="bx bx-chevrons-up "></i>
  </a>`
  } else {
    
    pedidoValorHtml +=`<a class="btn ms-2" onclick="mostrar(${pedido.id})">
    <i class="bx bx-chevrons-down "></i>
    <i class="bx bx-chevrons-up d-none"></i>
  </a>`
  }

  pedidoValor.innerHTML = pedidoValorHtml  

  

}

const mostrarPedido = function () {
  let detalleTabla = document.getElementById('detalleTabla')
  let detalleTablaHtml =`<h3>Pedidos</h3>
  <div class="table-responsive">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Ticket</th>
          <th scope="col">Usuario</th>
          <th scope="col">Valor</th>
        </tr>
      </thead>
      <tbody id="tbProducto">`
  let pedidos = JSON.parse(localStorage.getItem('pedidos')) || []
  
  pedidos.forEach(function (pedido) {
    let valorTotal = 0
    pedido[carrito].forEach(function (valor) {
      
      valorTotal += valor.cantidad * valor.valor
    })

    detalleTablaHtml +=`<tr>
                <th scope="row">${pedidos.length + 1}</th>
                <td>${pedido[usuario].correo}</td>
                <td id="pedidoValor">
                  $${valorTotal}
                  <a class="btn ms-2" onclick="mostrar(${product.id})">
                    <i class="bx bx-chevrons-down" id="mostrarMas"></i>
                    <i class="bx bx-chevrons-up d-none" id="mostrarMenos"></i>
                  </a>
                </td>
              </tr>
`
  })
  detalleTablaHtml += `</tbody>
          </table>
  `
  detalleTabla.innerHTML = detalleTablaHtml
}

const mostrarProducto = function () {
  let detalleTabla = document.getElementById('detalleTabla')
  let detalleTablaHtml =`<h3>Productos</h3>
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
      <a class="btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick='modificarCantidad()'>
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

const modificarValor = function (id) {
  let modalBody = document.getElementById('modalBody')
  let productos = JSON.parse(localStorage.getItem('productos'))
  let producto = productos.find((product) => (product.id === id))
  modalBody.innerHTML = `
  <p class="col-auto offset-1">Agregar cantidad:</p>
  <input type="text" value=${parseFloat(producto.valor)} class=" col-auto">
`
}
const modificarCantidad = function (id) {
  
  

}