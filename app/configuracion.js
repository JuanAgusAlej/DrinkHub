class Usuario{
    constructor(nombre, apellido, nacimientoFecha, nick, telefono, correo, pass,admin=false, avatar='default') {
        this.id= new Date().getTime();
        this.nombre = nombre
        this.apellido=apellido
        this.nacimientoFecha=nacimientoFecha
        this.nick=nick
        this.telefono=telefono
        this.correo=correo
        this.pass=pass
        this.avatar=avatar
        this.admin=admin
    }
    
}

const agregarUsuario = function () {
    
    let datos ={
          nombre:"Santiago",
          apellido:"Tibulo",
          fecha:"1994-05-23",
          nick:"Borracho100",
          telefono:"945284",
          correo:"sdfh@gmail.com",
        pass: "14789",
          imagen:"0"
          }
        
  
    localStorage.setItem('user', JSON.stringify(datos) )
};

let usuarios = JSON.parse(localStorage.getItem("users")) || [];
let usuario = JSON.parse(localStorage.getItem("user")) || [];



let inputNombre = document.getElementById("inputNombre");
let inputApellido = document.getElementById("inputApellido");
let inputNacimiento = document.getElementById("inputNacimiento");
let inputNick = document.getElementById("inputNick");
let inputTelefono = document.getElementById("inputTelefono");
let inputCorreo = document.getElementById("inputCorreo");
let avatar = document.getElementById("avatar");


//avatar.value = usuario.imagen
inputNombre.value = usuario.nombre
inputApellido.value = usuario.apellido
inputNacimiento.value = usuario.fecha
inputNick.value = usuario.nick
inputTelefono.value = usuario.telefono
inputCorreo.value = usuario.correo

console.log(usuario)
console.log(usuario.imagen)
let modificarPass = false

const mostrarAvatar = function () {
    let inputAvatar = document.getElementById("inputAvatar") 
    let option = ""
    
    // let chooseAvatar = document.getElementById("chooseAvatar")
    // chooseAvatar.value = usuario.imagen
    // console.log(chooseAvatar.value)
    for (let i = 0; i < 13; i++) {
        let imagen = "botella"+i
        if (imagen===usuario.imagen) {
            
            option += `<option onmouseup="cambiarAvatar()" selected>${usuario.imagen}</option>`
            
        } else {
            
            option += `<option onmouseup="cambiarAvatar()">botella${i}</option>`
        }
        
    }
    // console.log(option)
    avatar.innerHTML=`<img src="../img/avatar/${usuario.imagen}.png" class="img-thumbnail" alt="Avatar">`
    inputAvatar.innerHTML=option
    
}

mostrarAvatar()

const cambiarAvatar = function () {
    usuario.imagen = document.getElementById("inputAvatar").value

    avatar.innerHTML=`<img src="../img/avatar/${usuario.imagen}.png" class="img-thumbnail" alt="Avatar">`
}

const cambiarPassword = function () {
    let cambiarPass = document.getElementById("cambiarPass")
    let cambiarPassVieja = document.getElementById("mostrarCambiarPass")
    cambiarPass.className = 'd-none'
    cambiarPassVieja.className = 'col-6 col-md-10'
    modificarPass = true
}

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
const validarCorreo = function (correo) {
    let iCorreo = usuarios.findIndex(function (item) {
        return item.correo === correo
    })
    // console.log("sdgasgd")
    // console.log(iCorreo)
    if (iCorreo === -1) {
       validarTelefono(document.getElementById("inputTelefono").value)
       // console.log("1")
    } else if (document.getElementById("inputCorreo").value === usuario.correo ) {
        validarTelefono(document.getElementById("inputTelefono").value)
       // console.log("2")
    }else{
        alert("Correo registrado")
    }
}
const validarTelefono = function (telefono) {
    
    let iTelefono = usuarios.findIndex(function (item) {
        
        return item.telefono === telefono
    })
    console.log(iTelefono)
    if (iTelefono === -1) {
        cambiarDatos()
        //console.log("1")
    } else if (document.getElementById("inputTelefono").value === usuario.telefono) {
        cambiarDatos()
        //console.log("2")
    }else {
        alert("Telefono registrado")
    }

}


const actualizarBbdd = function () {
    
    let iUsuario = usuarios.findIndex(function (item) {
        return item.correo === usuario.correo
    })
    
    usuarios[iUsuario].nick = document.getElementById("inputNick").value
    usuarios[iUsuario].telefono = document.getElementById("inputTelefono").value
    usuarios[iUsuario].correo = document.getElementById("inputCorreo").value
    usuarios[iUsuario].imagen = document.getElementById("inputAvatar").value
}


const cambiarDatos = function () {
        
   // console.log(iUsuario)


    usuario.nick = document.getElementById("inputNick").value
    usuario.telefono = document.getElementById("inputTelefono").value
    usuario.correo = document.getElementById("inputCorreo").value
    usuario.imagen = document.getElementById("inputAvatar").value
    localStorage.setItem('user', JSON.stringify(usuario))
    localStorage.setItem('users', JSON.stringify(usuarios))
    location.href = './configuracion.html'
}

const eliminarCuenta = function () {
    let iUsuario = usuarios.findIndex(function (item) {
        return item.correo === usuario.correo
    })
    usuarios.splice(iUsuario, 1);
    localStorage.setItem('users', JSON.stringify(usuarios))
    
    localStorage.removeItem("user");
    location.reload()
}

const verificacionLoguin = function () {

    if (!localStorage.getItem("user")) {
        location.href='../index.html'
    }

}
//verificacionLoguin()