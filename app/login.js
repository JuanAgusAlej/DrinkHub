console.log('===== LOGIN =====')

class Usuario{
  constructor(nombre, apellido,  nick, correo, pass,telefono=1234, admin=false, avatar='default', validado=false) {
      this.id= new Date().getTime();
      this.nombre = nombre
      this.apellido=apellido
      this.nick=nick
      this.telefono=telefono
      this.correo=correo
      this.pass=pass
      this.avatar=avatar
    this.admin = admin
    this.validado=validado
  }
  
}

const confirmar = function (validador, id) {

  let verificacion = document.getElementById("verificacion").value
  console.log("entro")
  console.log(verificacion === validador)

  if (verificacion == validador) {
    let usuarios = JSON.parse(localStorage.getItem("users"))
    usuarios[id].validado = true
    localStorage.setItem('users', JSON.stringify(usuarios))
    localStorage.removeItem('validador')
    location.href='./page/home.html'
  }
  
}

const enviarCorreo = function (validador,id) {
  let usuarios = JSON.parse(localStorage.getItem("users"))
  var templateParams = {
    usuario: usuarios[id].nick,
    validador: validador,
    correo:usuarios[id].correo

};
 
emailjs.send('service_v0xibil', 'template_xm7qgq6', templateParams)
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
       console.log('FAILED...', error);
    });

}

const generarValidador = function (indexUsuario) {
  
  let validador = Math.floor(Math.random() * (99999 - 10000) + 10000)
  localStorage.setItem('validador', JSON.stringify(validador))
  enviarCorreo(validador,indexUsuario)

}

const validarCorreo = function (id) {

  let loginformulario = document.getElementById("mainLogin")
  let usuarios = JSON.parse(localStorage.getItem("users"))

  let indexUsuario = usuarios.findIndex(function (user) {
    return user.id === id
  })
  generarValidador(indexUsuario)
  let validador = JSON.parse(localStorage.getItem("validador"))



  loginformulario.innerHTML = `
  <div class="login-form" id="login-formulario">
  <h4>Verificacion</h4>
  <a class="btn btn-dark" onclick="generarValidador(${indexUsuario})" >Enviar validador</a>
  <p> Ingresar el codigo que se envio por correo </p>
  <input required type="text" name="verificacion" id="verificacion">
  <a class="btn btn-dark" onclick="confirmar(${validador}, ${indexUsuario})">Introducir</a>
  </div>
  `

 // localStorage.setItem('validador', JSON.stringify(validador))

}


/** VALIDAR DATOS DEL FORMULARIO DEL LOGIN */
const validarDatos = function () {
  const email = document.querySelector('#login-email').value
  const password = document.querySelector('#login-pass').value

  // obtener base de datos de usuario de local
  const usuarios = JSON.parse(localStorage.getItem('users')) || []

  const usuario = usuarios.find(function (localUsuario) {

    return localUsuario.correo === email;
  })

  if ( usuario ) {
    if  ( usuario.pass === password) {
      if (usuario.validado) {
        
        localStorage.setItem('user', JSON.stringify(usuario));
        location.href='./page/home.html';

      } else {
        validarCorreo(usuario.id)
      }
    } else {
      alert('contraseña o usuario incorrecta');
    }
  } else {
    alert('Usuario no existe');
  }
};

document.querySelector('#login-formulario').addEventListener('submit', function (e) {
  e.preventDefault();
  validarDatos();
});


/**  REGISTRA USUARIO EN LOCAL STORAGE CON DATOS DE MODAL REGISTRO */
const verificacionLoguin = function () {

  if (localStorage.getItem("user")) {
      location.href='./home.html';
  }

}
verificacionLoguin ()

document.querySelector('#registro-formulario').addEventListener('submit', function(ev) {
  ev.preventDefault();

  const nombre = document.querySelector('#registro-nombre').value
  const apellido = document.querySelector('#registro-apellido').value
  const email = document.querySelector('#registro-email').value
  const nick = document.querySelector('#registro-nick').value
  const pass = document.querySelector('#registro-pass').value

  const nuevoUsuario = new Usuario(nombre, apellido,nick, email, pass)

  // obtener base de datos de usuario de local
  const usuarios = JSON.parse(localStorage.getItem('users')) || []

  const usuarioExiste = usuarios.find(function (localUsuario) {
    console.log(localUsuario.correo, email)
    
    return localUsuario.correo === email || localUsuario.nick === nick;
  })

  console.log(usuarioExiste)

  if ( usuarioExiste ) {
   alert(`Correo o nick ya estan siendo utilizados`)
  } else { 
    let btnRegistar = document.getElementById("btnRegistar")
    // actualizamos base de datos de usuarios en local
    usuarios.push(nuevoUsuario)
    localStorage.setItem('users', JSON.stringify(usuarios));
    alert(`${nombre}, sus datos han sido guardado con exito`)
    
    //limpiarFormularioRegistro()
    // cerrar el modal (opcional)
  }
});

// LIMPIAR LOS CAMPOS DEL FORMULARIO DEL MODAL DE REGISTRO
function limpiarFormularioRegistro() {
  document.getElementById("myForm").reset();
}


