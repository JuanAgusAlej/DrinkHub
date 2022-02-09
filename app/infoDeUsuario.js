
const agregarUsuario = function () {
    
    let datos = {
        nombre:"Lara",
        apellido:"Sp",
        nacimientoFecha:"1945-2-29",
        nick:"LaMasBorracha",
        telefono:"154621",
        correo:"LS45@gmail.com",
        pass: "14789",
        avatar: 'botella0',
        admin: true
        }
      
  
    localStorage.setItem('user', JSON.stringify(datos) )
};

let user = JSON.parse(localStorage.getItem('user')) || []



let navbarSupportedContent = document.getElementById('navbarSupportedContent')

let idUsuario = document.getElementById('usuario')

let infoUsuario 
let navbar
if (user.admin) {
  infoUsuario = `<div class="row g-0 ">
  <div class="container col-md-4">
    <img src="../img/avatar/${user.avatar}.png" class="img-fluid rounded-start usuarioNavbar" alt="...">
  </div>
  <div class="col-md-8">
    <div class="card-body">
      <h5 class="card-title">${user.nick}</h5>
      <p class="card-text">${user.correo}</p>
      <p class="card-text">${user.telefono}</p>
      <a class="btn btn-dark mb-3" href="./configuracion.html" role="button">Configuracion</a>
      <a class="btn btn-dark mb-3" href="./admin.html" role="button">Administrar</a>
      <a class="btn btn-dark mb-3" onclick="logout()" href="#" role="button">Logout</a>
      
     
      </div>
    </div>
  </div>`
  navbar = `
  <div class="d-flex justify-content-between ">
              <div class="col-6">

                <ul class="navbar-nav letraNavBar2">
                  <li class="nav-item align-text-center">
                    <a class="btn btn-outline-light boton-style" aria-current="page" href="./ecommers.html"
                      ><i class="fas fa-store-alt"></i></a
                    >
                  </li>
                  <li class="nav-item m-0">
                    <a class="btn btn-outline-light boton-style" href="./quienesSomos.html"
                      >Quienes Somos</a
                    >
                  </li>
                  <li class="nav-item">
                    <a class="btn btn-outline-light boton-style" href="./sugerencia.html">Sugerencias</a>
                  </li>
                </ul>
                </div>
                
              
              <div class="col-3 offset-3">
                
              <img src="../img/avatar/${user.avatar}.png" class="card img-fluid rounded-start usuarioNavbar"  alt="...">
              <spam class="blockquote-footer usuarioNavbar">${user.nick}</spam>
              <a class="btn btn-outline-light boton-style usuarioNavbar" href="./configuracion.html">Configuracion</a>
              <a class="btn btn-outline-light boton-style usuarioNavbar" href="./admin.html">Administrar</a>
              <a class="btn btn-outline-light boton-style usuarioNavbar" onclick="logout()">Logout</a>
                
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
          </div>
  
  `
  
} else {
  infoUsuario = `<div class="row g-0 ">
  <div class="container col-md-4">
    <img src="../img/avatar/${user.avatar}.png" class="img-fluid rounded-start" alt="...">
  </div>
  <div class="col-md-8">
    <div class="card-body">
      <h5 class="card-title">${user.nick}</h5>
      <p class="card-text">${user.correo}</p>
      <p class="card-text">${user.telefono}</p>
      <a class="btn btn-dark mb-3" href="./configuracion.html" role="button">Configuracion</a>
      <a class="btn btn-dark mb-3" onclick="logout()" href="#" role="button">Logout</a>
     
      </div>
    </div>
  </div>`
  navbar = `
  
  <div class="d-flex justify-content-between ">
              <div class="col-6">

                <ul class="navbar-nav letraNavBar2">
                  <li class="nav-item align-text-center">
                    <a class="btn btn-outline-light boton-style" aria-current="page" href="./ecommers.html"
                      ><i class="fas fa-store-alt"></i></a
                    >
                  </li>
                  <li class="nav-item m-0">
                    <a class="btn btn-outline-light boton-style" href="./quienesSomos.html"
                      >Quienes Somos</a
                    >
                  </li>
                  <li class="nav-item">
                    <a class="btn btn-outline-light boton-style" href="./sugerencia.html">Sugerencias</a>
                  </li>
                </ul>
                </div>
                
              
              <div class="col-3 offset-3">
                
              <img src="../img/avatar/${user.avatar}.png" class="card img-fluid rounded-start usuarioNavbar"  alt="...">
              <spam class="blockquote-footer usuarioNavbar">${user.nick}</spam>
              <a class="btn btn-outline-light boton-style usuarioNavbar" href="./configuracion.html">Configuracion</a>
              <a class="btn btn-outline-light boton-style usuarioNavbar" onclick="logout()">Logout</a>
                
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
          </div>
  `
  
}

idUsuario.innerHTML = infoUsuario

const cargarNavbar = function () {
  
  navbarSupportedContent.innerHTML=navbar
}
const logout = function () {

    //console.log("asdad")
     localStorage.removeItem("user");
     location.href='../index.html'

}