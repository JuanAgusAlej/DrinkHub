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

class Receta{
    constructor(titulo, ingrediente, preparacion, imagen, autor) {
        this.id = new Date().getTime()
        this.titulo = titulo
        this.ingrediente = ingrediente
        this.preparacion = preparacion
        this.imagen = imagen
        this.autor = autor
        this.like = {
            usuarioLike : [],
            cantidad : 0
        }
    }

    
}

let usuarios = JSON.parse(localStorage.getItem("users")) || [];

const agregarUsuario = function () {
    
    usuarios.push(
      new Usuario(
          "Lara",
          "Sp",
          "1945-2-29",
          "LaMasBorracha",
          "154621",
          "LS45@gmail.com",
          "14789"
      )
    );
    usuarios.push(
        new Usuario(
            "Pedro",
            "Lopez",
            "1976-11-28",
            "PL28",
            "54631",
            "pl28@gmail.com",
            "14789"
        )
    );
    usuarios.push(
        new Usuario(
            "Alberto",
            "Perez",
            "1954-03-30",
            "Alberto_54",
            "54831",
            "Alberto_54@gmail.com",
            "14789"
        )
    );
    usuarios.push(
        new Usuario(
            "Santiago",
            "Tibulo",
            "1994-05-23",
            "Borracho100",
            "945284",
            "st94@gmail.com",
            "14789",
            true
        )
      );
  
    localStorage.setItem('users', JSON.stringify(usuarios) )
};

//agregarUsuario();
// // const prueba = function() {
// //     let hola
// //     console.log(hola)
// //     if (!hola) {
// //         console.log("entro")
// //     } else {
// //         console.log("no entro")
// //     }
// // }


