
console.log("===== LOGIN =====");

class Usuario {
  constructor(
    nombre,
    apellido,
    nick,
    correo,
    pass,
    telefono = 1234,
    admin = false,
    avatar = "default"
  ) {
    this.id = new Date().getTime();
    this.nombre = nombre;
    this.apellido = apellido;
    this.nick = nick;
    this.telefono = telefono;
    this.correo = correo;
    this.pass = pass;
    this.avatar = avatar;
    this.admin = admin;
  }
}

const cargarBbDd = () => {
  let nosotros = JSON.parse(localStorage.getItem("nosotros")) || [];
  console.log(!nosotros);
  if (nosotros==false) {
    console.log("!nosotros");
    
    location.href = "./page/bbss.html";
  }
  
};

cargarBbDd();
const verificacionLoguin = function () {

  if (localStorage.getItem("user")) {
    location.href = "./page/home.html";
  }
};
verificacionLoguin();
const confirmar = function (id) {
  let verificacion = document.getElementById("verificacion").value;
  //console.log("entro")
  let validador = JSON.parse(localStorage.getItem("validador"));
  console.log(verificacion === validador);

  if (verificacion == validador) {
    let usuarios = JSON.parse(localStorage.getItem("users"));
    let ecommer = JSON.parse(localStorage.getItem("ecommer"));
    usuarios[id].validado = true;
    localStorage.setItem("users", JSON.stringify(usuarios));
    localStorage.removeItem("validador");
    localStorage.setItem("user", JSON.stringify(usuarios[id]));

    if (!ecommer) {
      location.href = "./page/home.html";
    } else {
      localStorage.removeItem("ecommer");
      location.href = "./page/ecommers.html";
    }
  } else {
    window.alert("El codigo validador es falso");
  }
};

const enviarCorreo = function (validador, id) {
  let usuarios = JSON.parse(localStorage.getItem("users"));
  var templateParams = {
    usuario: usuarios[id].nick,
    validador: validador,
    correo: usuarios[id].correo,
  };

  emailjs.send("service_v0xibil", "template_xm7qgq6", templateParams).then(
    function (response) {
      console.log("SUCCESS!", response.status, response.text);
    },
    function (error) {
      console.log("FAILED...", error);
    }
  );
};

const generarValidador = function (indexUsuario) {
  let validador = Math.floor(Math.random() * (99999 - 10000) + 10000);
  localStorage.setItem("validador", JSON.stringify(validador));
  enviarCorreo(validador, indexUsuario);
};

const validarCorreo = function (id) {
  let loginformulario = document.getElementById("mainLogin");
  let usuarios = JSON.parse(localStorage.getItem("users"));

  let indexUsuario = usuarios.findIndex(function (user) {
    return user.id === id;
  });
  generarValidador(indexUsuario);
  let validador = JSON.parse(localStorage.getItem("validador"));

  loginformulario.innerHTML = `
  <div class="login-form" id="login-formulario">
      <h2>Verificacion</h2>
      <h4> Ingresar el codigo que se envio por correo </h4>
      <input type="text" name="verificacion" id="verificacion">
      <div class="row">
        <a class="btn btn-dark mb-2" onclick="generarValidador(${indexUsuario})" >Enviar validador</a>
        <a class="btn btn-dark" onclick="confirmar(${indexUsuario})" >Introducir</a>
       </div>
    </div>
  `;

  // localStorage.setItem('validador', JSON.stringify(validador))
};

/** VALIDAR DATOS DEL FORMULARIO DEL LOGIN */
const validarDatos = function () {
  const email = document.querySelector("#login-email").value;
  const password = document.querySelector("#login-pass").value;

  // obtener base de datos de usuario de local
  const usuarios = JSON.parse(localStorage.getItem("users")) || [];

  const usuario = usuarios.find(function (localUsuario) {
    return localUsuario.correo === email;
  });
  console.log(email, usuarios);
  if (usuario) {
    if (usuario.pass === password && !usuario.bloqueado) {
      if (usuario.validado) {
        localStorage.setItem("user", JSON.stringify(usuario));
        let ecommer = JSON.parse(localStorage.getItem("ecommer"));
        if (!ecommer) {
          console.log("entre");
          location.href = "./page/home.html";
        } else {
          console.log("eco");
          localStorage.removeItem("ecommer");
          location.href = "./page/ecommers.html";
        }
      } else {
        validarCorreo(usuario.id);
      }
    } else {
      alert("contraseña o usuario incorrecta");
    }
  } else {
    alert("Usuario no existe");
  }
};

document
  .querySelector("#login-formulario")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    validarDatos();
  });

/**  REGISTRA USUARIO EN LOCAL STORAGE CON DATOS DE MODAL REGISTRO */

document
  .querySelector("#registro-formulario")
  .addEventListener("submit", function (ev) {
    ev.preventDefault();

    const nombre = document.querySelector("#registro-nombre").value;
    const apellido = document.querySelector("#registro-apellido").value;
    const email = document.querySelector("#registro-email").value;
    const nick = document.querySelector("#registro-nick").value;
    const pass = document.querySelector("#registro-pass").value;

    const nuevoUsuario = new Usuario(nombre, apellido, nick, email, pass);

    // obtener base de datos de usuario de local
    const usuarios = JSON.parse(localStorage.getItem("users")) || [];

    const usuarioExiste = usuarios.find(function (localUsuario) {
      console.log(localUsuario.correo, email);

      return localUsuario.correo === email || localUsuario.nick === nick;
    });

    console.log(usuarioExiste);

    if (usuarioExiste) {
      alert(`Correo o nick ya estan siendo utilizados`);
    } else {
      let btnRegistar = document.getElementById("btnRegistar");
      // actualizamos base de datos de usuarios en local
      usuarios.push(nuevoUsuario);
      localStorage.setItem("users", JSON.stringify(usuarios));
      alert(`${nombre}, sus datos han sido guardado con exito`);

      //limpiarFormularioRegistro()
      // cerrar el modal (opcional)
    }
  });

// LIMPIAR LOS CAMPOS DEL FORMULARIO DEL MODAL DE REGISTRO
function limpiarFormularioRegistro() {
  document.getElementById("myForm").reset();
}
