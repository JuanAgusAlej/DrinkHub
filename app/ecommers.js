class Pedidos{
    constructor(usuario, carrito) {
        this.id=new Date().getTime();
        this.usuario = usuario,
        this.carrito = carrito
    }
}

// ---------------MUESTRA PRODUCTOS ------------------
const mostrarProductos = function (productos) {
    
    let cardsProductos = document.getElementById("cards-productos")
    let cardsProductosHtml =''
    cardsProductos.innerHTML =''
    productos.forEach(function (product) {

        if (product.stock) {
            
            cardsProductosHtml += `
            <div class="col-6 col-sm-4 col-md-5 col-lg-4 col-xl-3  my-4 ">
                <div class="card">
                  <img src="${product.imagen}" class="img-fluid rounded-start" alt="...">
                  <div class="card-body">
                    <p class="card-title text-center fs-5">${product.nombre}</p>
                    <div class="d-flex justify-content-around">
                       <p>$${product.valor}</p>
                       <a class="btn btn-primary" onclick=agregarCarrito(${product.id})><i class="fas fa-cart-plus"></i></a>
                  </div>
                    </div>
                </div>
              </div>
            
            `
        }
    })
    cardsProductos.innerHTML = cardsProductosHtml

}

//------------ENVIAR TICKET---------------------------
const enviarComprobante = function (carrito) {

    let ticketCompra = `<table class="table">
    <tbody id="tbProducto">
      <tr>
        <th scope="col">cantidad</th>
        <th scope="col">Producto</th>
        <th scope="col">Valor</th>
      </tr>
       
    `
    let valor = 0;
    carrito.forEach(function (product) {
        
        ticketCompra += `
    <tr>
      <td scope="row">${product.cantidad}</td>
      <td>${product.nombre}</td>
      <td>$${product.valor * product.cantidad}</td>
     </br>
    </tr>`
        valor += product.valor * product.cantidad
    })
    ticketCompra +=`
    
    <hr>
        <tr>
      <th scope="row">Valor Total: </th>
      <td>$${valor}</td>
     </tr>
    </tbody>
        </table>`
    
    let user = JSON.parse(localStorage.getItem("user"))
    
    var templateParams = {
        correo: user.correo,
        //correo: 'drinkhubcode@gmail.com',
        compra: ticketCompra
       
    };
     
    emailjs.send('service_v0xibil', 'template_z8dsyju', templateParams)
        .then(function(response) {
           console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
           console.log('FAILED...', error);
        });
    
   
}


// -----------------EVALUA VALOR DE LA COMPRA-----------
const calcularTotal = function (carrito) {
    let precioTodal = document.getElementById("precioTodal")
    let total = 0

    precioTodal.innerHTML = ""
    if (carrito) {
        
        carrito.forEach(function (product) {
            total += product.valor * product.cantidad
        })
    }

    precioTodal.innerHTML=`<p class="card-text">$${total}</p>` 
}

//----------------EVALUA SI HAY STOCK--------------------

const hayStock = function () {

    let productos = JSON.parse(localStorage.getItem("productos")) || []
    let carrito = JSON.parse(localStorage.getItem("carrito")) || []
    

    productos.forEach(function (product) {
        if (product.cantidad > 0) {
                        product.stock = true
        }
    })

    localStorage.setItem("productos", JSON.stringify(productos))
    mostrarProductos(productos)
    calcularTotal(carrito)
}
hayStock()

//----------------EVALUA NO HAY STOCK--------------------

const noHayStock = function (id, productos) {

    let posicion = productos.findIndex(function (product) {
      return product.id === id  
    })
    productos[posicion].stock = false
    localStorage.setItem("productos",JSON.stringify(productos))
}

// -----------AGREGA PRODUCTOS AL CARRO -----------

const agregarCarrito = function (id) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || []
    let productos = JSON.parse(localStorage.getItem("productos")) || []

    
    let producto = productos.find(function (products) {
        return products.id ===id
    })
    let iProducto = carrito.findIndex(function (product) { return product.id === id })

    //console.log(iProducto)
    if (iProducto != -1) {
        if (carrito[iProducto].cantidad < producto.cantidad) {
            carrito[iProducto].cantidad += 1
        } else {
            window.alert("No hay mas producto en stock")
            noHayStock(producto.id, productos)
            mostrarProductos(productos)
        }

    } else {

        
       productos.forEach(function (product) {
            if (product.id === id) {
                carrito.push(product)
                carrito[carrito.length-1].cantidad = 1;
                console.log(product,productos[13])
            }
        })

        //console.log(productos[13])
    }
    localStorage.setItem("carrito", JSON.stringify(carrito))
    //console.log(productos[13])
    calcularTotal(carrito)
}




//----------------BOTON DE COMPRAR-----------------------


const btnComprar = function () {
    
    //mensaje
    let productos = JSON.parse(localStorage.getItem("productos")) || [] 
    let carrito = JSON.parse(localStorage.getItem("carrito")) || []
    let user = JSON.parse(localStorage.getItem("user")) || null

    if (user) {
        window.alert("Gracias Por su compra se enviara un correo con indicaciones")
        let pedidos = JSON.parse(localStorage.getItem('pedidos')) || []
        productos.forEach(function (product) {
            
            carrito.forEach(function (i) {
                
                //console.log(i, product)
                if (i.id === product.id) {
                    //console.log("carrito" + i.cantidad)
                    //console.log("productos"+product.cantidad)
                    product.cantidad = product.cantidad - i.cantidad       
                   // console.log(product.cantidad)
                    if (product.cantidad === 0) {
                        product.stock = false
                    }
                }
                
            })
            
    
        })
        pedidos.push(new Pedidos(user,carrito))
        enviarComprobante(carrito)
        localStorage.setItem("productos", JSON.stringify(productos))
        localStorage.setItem("pedidos", JSON.stringify(pedidos))
        localStorage.removeItem("carrito")
        calcularTotal()
        mostrarProductos(productos)
    } else {
        let ecommer = true
        localStorage.setItem('ecommer', ecommer)
        location.href='../index.html'
    }

}

// ----------------- BOTON DE ELIMINAR --------------

const eliminarProducto = function (id) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || []
    
    let ubicacion = carrito.findIndex(function (product) {
        return product.id === id
    }) 

    carrito.splice(ubicacion,1)

    localStorage.setItem("carrito", JSON.stringify(carrito))
    productoCarrito()
    hayStock()
}

// -----------MUESTRA CARRITO -------------

const productoCarrito = function () {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || []
    let tbProducto = document.getElementById("tbProducto")
    let mostratProducto = ``
    
    tbProducto.innerHTML=""

    carrito.forEach(function (product) {
        
        mostratProducto += `
    <tr>
      <th scope="row">${product.cantidad}</th>
      <td>${product.nombre}</td>
      <td>$${product.valor * product.cantidad}</td>
      <td>
        <a class="btn boton-style" onclick="eliminarProducto(${product.id})">
            <i class="fas fa-trash-alt"></i>
            
        </a>
      </td>
    </tr>`

    })
    tbProducto.innerHTML=mostratProducto


}

// ---------------- FILTRA BUSQUEDA -----------------

const busqueda = function (buscar) {
    let productos = JSON.parse(localStorage.getItem("productos")) || []
    let filtroBusqueda = document.getElementById("filtroBusqueda")
    let buscador = document.getElementById("buscador")
    let encontrados = productos.filter(function (product) {
        if (product.nombre.toLowerCase().trim().includes(buscar.toLowerCase().trim())) {
            //consultar porque cuando pongo que la condicion es verdadero devuelve todos los otros productos
            return product
        }
    })
    

    console.log(encontrados)
    if (buscar) {
        
        if (encontrados.length >0 ) {
            
            filtroBusqueda.innerHTML = `
            <a class="btn boton-style bg-primary text-white rounded-pill my-3"  onclick="eliminarFiltro()" > <i class="far fa-times-circle">${buscar}</i></a>
            `
            buscador.value=""
            mostrarProductos(encontrados)
        } else {
            window.alert("No se encontro producto")
        }
    }
}

//----------------ELIMINA FILTRO---------------------
const eliminarFiltro = function () {
    let productos = JSON.parse(localStorage.getItem("productos")) || []
    let filtroBusqueda = document.getElementById("filtroBusqueda")
    filtroBusqueda.innerHTML = ""
    mostrarProductos(productos)
    
}

const cargarNavbar = function () {
    let navbarSupportedContent = document.getElementById('navbarSupportedContent')
  
    navbarSupportedContent.innerHTML = `
    <div class="d-flex justify-content-between ">
        <div class="col-6">
           <ul class="navbar-nav letraNavBar2">
                <li class="nav-item align-text-center">
                    <a class="btn btn-outline-light boton-style" aria-current="page" href="./ecommers.html"
                    ><i class="fas fa-store-alt"></i></a>
                </li>
                <li class="nav-item m-0">
                    <a class="btn btn-outline-light boton-style" href="./quienesSomos.html"
                    >Quienes Somos</a>
                </li>
                <li class="nav-item">
                      <a class="btn btn-outline-light boton-style" href="./sugerencia.html">Sugerencias</a>
                </li>
            </ul>
        </div>
        <div class="col-3 ">
            <div class="card col-md-12 boxHome" id="usuario">
                
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">Carrito de compra</h5>
                            <div id="precioTodal">
                                <p class="card-text">$0</p>
                            </div>
                            <a class="btn btn-dark my-3" onclick="btnComprar()" role="button">Comprar</a>
                            <a class="btn btn-dark my-3" onclick="productoCarrito()" role="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                            >Productos</a>
                        </div>
                    </div>
                
            </div>
        </div>
    </div>
    <div class="d-flex my-3">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                id=buscador
                onkeyup = "if(event.keyCode == 13) busqueda(buscador.value)"
              />
            </div>
            <div id="filtroBusqueda" >
            </div>`
    
  }
  