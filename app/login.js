console.log('===== LOGIN =====')

class Usuario{
  constructor(nombre, apellido,  nick, correo, pass,telefono=0000, admin=false, avatar='default') {
      this.id= new Date().getTime();
      this.nombre = nombre
      this.apellido=apellido
      this.nick=nick
      this.telefono=telefono
      this.correo=correo
      this.pass=pass
      this.avatar=avatar
      this.admin=admin
  }
  
}

/** VALIDAR DATOS DEL FORMULARIO DEL LOGIN */
const validarDatos = function () {
  const email = document.querySelector('#login-email').value
  const password = document.querySelector('#login-pass').value

  // obtener base de datos de usuario de local
  const usuarios = JSON.parse(localStorage.getItem('users')) || []

  const usuario = usuarios.find(function (localUsuario) {
    return localUsuario.email === email;
  })

  if ( usuario ) {
    if  ( usuario.password === password) {
      localStorage.setItem('user', JSON.stringify(usuario));
      location.replace('/page/home.html');
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
    return localUsuario.email === email || localUsuario.nick === nick;
  })

  if ( usuarioExiste ) {
   alert(`Correo o nick ya estan siendo utilizados`)
  } else { 
    // actualizamos base de datos de usuarios en local
    usuarios.push(nuevoUsuario)
   // localStorage.setItem('users', JSON.stringify(usuarios));
    alert(`${nombre}, sus datos han sido guardado con exito`)
    //limpiarFormularioRegistro()
    // cerrar el modal (opcional)
  }
});

// LIMPIAR LOS CAMPOS DEL FORMULARIO DEL MODAL DE REGISTRO
function limpiarFormularioRegistro() {
  document.getElementById("myForm").reset();
}
