// ---------------MUESTRA PRODUCTOS ------------------
const mostrarProductos = function (productos) {
    
    let cardsProductos = document.getElementById("cards-productos")
    let cardsProductosHtml =''
    cardsProductos.innerHTML =''
    productos.forEach(function (product) {

        

        if (product.stock) {
            
            cardsProductosHtml += `
            <div class="col-3 col-sm-4 col-md-5 col-lg-4 col-xl-3  my-4 ">
                <div class="card">
                  <img src="../img/producto/${product.imagen}.png" class="img-fluid rounded-start" alt="...">
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

// -----------------EVALUA VALOR DE LA COMPRA-----------
const calcularTotal = function (carrito) {
    let precioTodal = document.getElementById("precioTodal")
    let total = 0

    precioTodal.innerHTML = ""
    
    carrito.forEach(function (product) {
        total += product.valor * product.cantidad
    })

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

    localStorage.setItem("productos", JSON.stringify(productos))
    localStorage.removeItem("carrito")
    calcularTotal()
    mostrarProductos()

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
    let encontrados = productos.filter(function (product) {
        return product.nombre.toLowerCase().trim() === buscar.toLowerCase().trim()
    })
    

    console.log(encontrados)
    if (encontrados.length >0 ) {
        
        filtroBusqueda.innerHTML = `
        <a class="btn boton-style bg-primary text-white rounded-pill my-3"  onclick="eliminarFiltro()" > <i class="far fa-times-circle"> fernet</i></a>
        `
        mostrarProductos(encontrados)
    } else {
        window.alert("No se encontro producto")
    }
}


const eliminarFiltro = function () {
    let productos = JSON.parse(localStorage.getItem("productos")) || []
    let filtroBusqueda = document.getElementById("filtroBusqueda")
    filtroBusqueda.innerHTML = ""
    mostrarProductos(productos)
    
}