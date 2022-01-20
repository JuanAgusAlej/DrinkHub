
const agregarUsuario = function () {
    
    let datos = {
        nombre:"Lara",
        apellido:"Sp",
        fecha:"1945-2-29",
        nick:"LaMasBorracha",
        telefono:"154621",
        correo:"LS45@gmail.com",
        pass: "14789",
        imagen:'botella0'
        }
      
  
    localStorage.setItem('user', JSON.stringify(datos) )
};

let user = JSON.parse(localStorage.getItem('user')) || []

const verificacionLoguin = function () {

    if (!localStorage.getItem("user")) {
        location.href='../index.html'
    }

}
verificacionLoguin()


let usuario = document.getElementById('usuario')

let infoUsuario=`<div class="row g-0 ">
<div class="container col-md-4">
  <img src="../img/avatar/${user.imagen}.png" class="img-fluid rounded-start" alt="...">
</div>
<div class="col-md-8">
  <div class="card-body">
    <h5 class="card-title">${user.nick}</h5>
    <p class="card-text">${user.correo}</p>
    <p class="card-text">${user.telefono}</p>
    <a class="btn btn-dark mb-3" href="./configuracion.html" role="button">Ajustes</a>
    <a class="btn btn-dark mb-3" onclick="logout()" href="#" role="button">Logout</a>
   
    </div>
  </div>
</div>`

usuario.innerHTML = infoUsuario

const logout = function () {

    //console.log("asdad")
     localStorage.removeItem("user");
     location.reload()

}