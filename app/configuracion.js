
const agregarUsuario = function () {
    
    let datos ={
          nombre:"Santiago",
          apellido:"Tibulo",
          nacimientoFecha:"1994-05-23",
          nick:"Borracho100",
          telefono:"945284",
          correo:"sdfh@gmail.com",
          pass: "14789",
          avatar: "botella0",
          admin:true
          }
        
  
    localStorage.setItem('user', JSON.stringify(datos) )
};

let usuarios = JSON.parse(localStorage.getItem("users")) || [];
let user = JSON.parse(localStorage.getItem("user")) || [];



let inputNombre = document.getElementById("inputNombre");
let inputApellido = document.getElementById("inputApellido");
let inputNick = document.getElementById("inputNick");
let inputTelefono = document.getElementById("inputTelefono");
let inputCorreo = document.getElementById("inputCorreo");
let avatar = document.getElementById("avatar");


//avatar.value = usuario.imagen
inputNombre.value = user.nombre
inputApellido.value = user.apellido
inputNick.value = user.nick
inputTelefono.value = user.telefono
inputCorreo.value = user.correo

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
        if (imagen===user.avatar) {
            
            option += `<option onmouseup="cambiarAvatar()" selected>${user.avatar}</option>`
            
        } else {
            
            option += `<option onmouseup="cambiarAvatar()">botella${i}</option>`
        }
        
    }
    // console.log(option)
    avatar.innerHTML=`<img src="../img/avatar/${user.avatar}.png" class="img-thumbnail" alt="Avatar">`
    inputAvatar.innerHTML=option
    
}

mostrarAvatar()

// -------------CAMBIA AVATAR------------------

const cambiarAvatar = function () {
    user.avatar = document.getElementById("inputAvatar").value

    avatar.innerHTML=`<img src="../img/avatar/${user.avatar}.png" class="img-thumbnail" alt="Avatar">`
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
        if (passVieja === user.pass && passNueva != "") {
            user.pass = passNueva
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
    } else if (document.getElementById("inputNick").value === user.nick) {
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
       // console.log("1")
    } else if (document.getElementById("inputCorreo").value === user.correo ) {
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
        //console.log("1")
    } else if (document.getElementById("inputTelefono").value === user.telefono) {
        cambiarDatos()
        
    }else {
        alert("Telefono registrado")
    }

}

// -------------ACTUALIZA LA BBSS-----------

const actualizarBbdd = function () {
    
    let iUsuario = usuarios.findIndex(function (item) {
        return item.correo === user.correo
    })
    
    usuarios[iUsuario].nick = document.getElementById("inputNick").value
    usuarios[iUsuario].telefono = document.getElementById("inputTelefono").value
    usuarios[iUsuario].correo = document.getElementById("inputCorreo").value
    usuarios[iUsuario].avatar = document.getElementById("inputAvatar").value
}

// -----------GUARDA LOS CAMBIOS-----------

const cambiarDatos = function () {
        
  


   user.nick = document.getElementById("inputNick").value
   user.telefono = document.getElementById("inputTelefono").value
   user.correo = document.getElementById("inputCorreo").value
   user.avatar = document.getElementById("inputAvatar").value
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('users', JSON.stringify(usuarios))
    location.href = './home.html'
}

// ----------SE ELIMINA LA CUENTA--------------
const eliminarCuenta = function () {
    
    if (window.confirm("Estas seguro que queres eliminar la cuenta?")) {
        
         let iUsuario = usuarios.findIndex(function (item) {
             return item.correo === user.correo
         })
         usuarios.splice(iUsuario, 1);
         localStorage.setItem('users', JSON.stringify(usuarios))
         localStorage.removeItem("user");
         location.reload()
        
    }
}


