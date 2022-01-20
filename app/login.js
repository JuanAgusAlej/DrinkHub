console.log('===== LOGIN =====')

class Usuario {
  constructor(nombre, apellido, email, password) {
      this.nombre = nombre;
      this.apellido = apellido;
      this.email = email;
      this.password = password;
  };
};

/** VALIDAR DATOS DEL FORMULARIO DEL LOGIN */
const validarDatos = function () {
  const email = document.querySelector('#login-email').value
  const password = document.querySelector('#login-pass').value

  // obtener base de datos de usuario de local
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []

  const usuario = usuarios.find(function (localUsuario) {
    return localUsuario.email === email;
  })

  if ( usuario ) {
    if  ( usuario.password === password) {
      localStorage.setItem('usuario', JSON.stringify(usuario));
      location.replace('/page/home.html');
    } else {
      alert('contraseña incorrecta');
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
document.querySelector('#registro-formulario').addEventListener('submit', function(ev) {
  ev.preventDefault();

  const nombre = document.querySelector('#registro-nombre').value
  const apellido = document.querySelector('#registro-apellido').value
  const email = document.querySelector('#registro-email').value
  const pass = document.querySelector('#registro-pass').value

  const nuevoUsuario = new Usuario(nombre, apellido, email, pass)

  // obtener base de datos de usuario de local
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []

  const usuarioExiste = usuarios.find(function (localUsuario) {
    return localUsuario.email === email;
  })

  if ( usuarioExiste ) {
   alert(`${email}, ya existe`)
  } else { 
    // actualizamos base de datos de usuarios en local
    usuarios.push(nuevoUsuario)
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    alert(`${nombre}, sus datos han sido guardado con exito`)
    limpiarFormularioRegistro()
    // cerrar el modal (opcional)
  }
});

// LIMPIAR LOS CAMPOS DEL FORMULARIO DEL MODAL DE REGISTRO
function limpiarFormularioRegistro() {
  document.getElementById("myForm").reset();
}
