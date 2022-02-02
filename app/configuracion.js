
const agregarUsuario = function () {
    
    let datos ={
          nombre:"Santiago",
          apellido:"Tibulo",
          fecha:"1994-05-23",
          nick:"Borracho100",
          telefono:"945284",
          correo:"sdfh@gmail.com",
        pass: "14789",
          imagen:"botella0"
          }
        
  
    localStorage.setItem('user', JSON.stringify(datos) )
};

let usuarios = JSON.parse(localStorage.getItem("users")) || [];
let usuario = JSON.parse(localStorage.getItem("user")) || [];



let inputNombre = document.getElementById("inputNombre");
let inputApellido = document.getElementById("inputApellido");
let inputNick = document.getElementById("inputNick");
let inputTelefono = document.getElementById("inputTelefono");
let inputCorreo = document.getElementById("inputCorreo");
let avatar = document.getElementById("avatar");


//avatar.value = usuario.imagen
inputNombre.value = usuario.nombre
inputApellido.value = usuario.apellido
inputNick.value = usuario.nick
inputTelefono.value = usuario.telefono
inputCorreo.value = usuario.correo

//console.log(usuario)
//console.log(usuario.imagen)
let modificarPass = false

// -------------VALIDA LOGIN------------------

const verificacionLoguin = function () {

    if (!localStorage.getItem("user")) {
        location.href='../index.html'
    }

}

verificacionLoguin()


// -------------MUESTRA AVATAR------------------


const mostrarAvatar = function () {
    let inputAvatar = document.getElementById("inputAvatar") 
    let option = ""
    
   
    for (let i = 0; i < 13; i++) {
        let imagen = "botella"+i
        if (imagen===usuario.imagen) {
            
            option += `<option onmouseup="cambiarAvatar()" selected>${usuario.imagen}</option>`
            
        } else {
            
            option += `<option onmouseup="cambiarAvatar()">botella${i}</option>`
        }
        
    }
    
    avatar.innerHTML=`<img src="../img/avatar/${usuario.imagen}.png" class="img-thumbnail" alt="Avatar">`
    inputAvatar.innerHTML=option
    
}

mostrarAvatar()

// -------------CAMBIA AVATAR------------------

const cambiarAvatar = function () {
    usuario.imagen = document.getElementById("inputAvatar").value

    avatar.innerHTML=`<img src="../img/avatar/${usuario.imagen}.png" class="img-thumbnail" alt="Avatar">`
}

// -------------CAMBIA CONTASEÑA------------------

const cambiarPassword = function () {
    let cambiarPass = document.getElementById("cambiarPass")
    let cambiarPassVieja = document.getElementById("mostrarCambiarPass")
    cambiarPass.className = 'd-none'
    cambiarPassVieja.className = 'col-6 col-md-10'
    modificarPass = true
}

// --------------VALIDA CONTASEÑA-----------------

const validarPass = function () {
    let passNueva = document.getElementById("passNueva").value
    let passVieja = document.getElementById("passVieja").value
    if (modificarPass) {
        if (passVieja === usuario.pass && passNueva != "") {
            usuario.pass = passNueva
            validarNick(document.getElementById("inputNick").value)
        } else {
            alert("contraseña incorrecta")
        }
    } else {
        validarNick(document.getElementById("inputNick").value)
    }
}

// ----------------------VALIDA NICK----------------------

const validarNick = function (nick) {
    let iNick = usuarios.findIndex(function (item) {
        return item.nick === nick
    })
    console.log(iNick)
    if (iNick === -1) {
     //   console.log("1")
       validarCorreo(document.getElementById("inputCorreo").value)
    } else if (document.getElementById("inputNick").value === usuario.nick) {
       // console.log("2")
        validarCorreo(document.getElementById("inputCorreo").value)


    }else{
        alert("Nick Utilizado")
    }
}

// ----------------VALIDA CORREO-----------

const validarCorreo = function (correo) {
    let iCorreo = usuarios.findIndex(function (item) {
        return item.correo === correo
    })
    
    if (iCorreo === -1) {
       validarTelefono(document.getElementById("inputTelefono").value)
       
    } else if (document.getElementById("inputCorreo").value === usuario.correo ) {
        validarTelefono(document.getElementById("inputTelefono").value)
       
    }else{
        alert("Correo registrado")
    }
}

// -------------VALIDA EL TELEFONO------------------

const validarTelefono = function (telefono) {
    
    let iTelefono = usuarios.findIndex(function (item) {
        
        return item.telefono === telefono
    })
    console.log(iTelefono)
    if (iTelefono === -1) {
        cambiarDatos()
        
    } else if (document.getElementById("inputTelefono").value === usuario.telefono) {
        cambiarDatos()
        
    }else {
        alert("Telefono registrado")
    }

}

// -------------ACTUALIZA LA BBSS-----------

const actualizarBbdd = function () {
    
    let iUsuario = usuarios.findIndex(function (item) {
        return item.correo === usuario.correo
    })
    
    usuarios[iUsuario].nick = document.getElementById("inputNick").value
    usuarios[iUsuario].telefono = document.getElementById("inputTelefono").value
    usuarios[iUsuario].correo = document.getElementById("inputCorreo").value
    usuarios[iUsuario].imagen = document.getElementById("inputAvatar").value
}

// -----------GUARDA LOS CAMBIOS-----------

const cambiarDatos = function () {
        
  


    usuario.nick = document.getElementById("inputNick").value
    usuario.telefono = document.getElementById("inputTelefono").value
    usuario.correo = document.getElementById("inputCorreo").value
    usuario.imagen = document.getElementById("inputAvatar").value
    localStorage.setItem('user', JSON.stringify(usuario))
    localStorage.setItem('users', JSON.stringify(usuarios))
    location.href = './configuracion.html'
}

// ----------SE ELIMINA LA CUENTA--------------
const eliminarCuenta = function () {
    let iUsuario = usuarios.findIndex(function (item) {
        return item.correo === usuario.correo
    })
    usuarios.splice(iUsuario, 1);
    localStorage.setItem('users', JSON.stringify(usuarios))
    
    localStorage.removeItem("user");
    location.reload()
}


