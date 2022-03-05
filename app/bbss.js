let generadorID = 0;
class Usuario {
  constructor(
    nombre,
    apellido,
    nick,
    correo,
    pass,
    admin = false,
    telefono = 'no hay numero',
    avatar = "botella0"
  ) {
    this.id = generadorID++;
    this.nombre = nombre;
    this.apellido = apellido;
    this.nick = nick;
    this.correo = correo;
    this.pass = pass;
    this.admin = admin;
    this.telefono = telefono;
    this.avatar = avatar;
  }
}

class Nosotros {
  constructor(nombre, apellido, skill, descripcion, foto) {
    this.id = generadorID++;
    this.nombre = nombre;
    this.apellido = apellido;
    this.skill = skill;
    this.descripcion = descripcion;
    this.foto = foto;
  }
}

class Receta {
  constructor(titulo, ingrediente, preparacion, imagen, autor) {
    this.id = generadorID++;
    this.titulo = titulo;
    this.ingrediente = ingrediente;
    this.preparacion = preparacion;
    this.imagen = imagen;
    this.autor = autor;
    this.like = {
      usuarioLike: [],
      cantidad: 0,
    };
  }
}

class EmpresaDatos {
  constructor(correo, direccion, telefono) {
    this.correo = correo;
    this.direccion = direccion;
    this.telefono = telefono;
  }
}

class Productos {
  constructor(nombre, cantidad, valor, imagen, stock = true) {
    this.id = generadorID++;
    this.valor = valor;
    this.nombre = nombre;
    this.cantidad = cantidad;
    this.stock = stock;
    this.imagen = imagen;
  }
}

let usuarios = JSON.parse(localStorage.getItem("users")) || [];
let nosotros = JSON.parse(localStorage.getItem("nosotros")) || [];
let recetas = JSON.parse(localStorage.getItem("recetas")) || [];
let empresaDatos = JSON.parse(localStorage.getItem("empresaDatos")) || [];
let productos = JSON.parse(localStorage.getItem("productos")) || [];

const agregarUsuario = function () {
    
    usuarios.push(
      new Usuario(
          "Lara",
          "Sp",
          "LaMasBorracha",
          "LS45@gmail.com",
          "14789"
      )
    );
    usuarios.push(
        new Usuario(
            "Pedro",
            "Lopez",
            "PL28",
            "pl28@gmail.com",
            "14789"
        )
    );
    usuarios.push(
        new Usuario(
            "Alberto",
            "Perez",
            "Alberto_54",
            "Alberto_54@gmail.com",
            "14789"
        )
    );
    usuarios.push(
        new Usuario(
            "Santiago",
            "Tibulo",
            "Borracho100",
            "st94@gmail.com",
            "14789",
            true
        )
      );
    
      usuarios.push(
        new Usuario(
            "Emiliano",
            "D'uva",
            "BeerMaster",
            "BeerMaster@gmail.com",
            "14789",
            true
        )
      );
      usuarios.push(
        new Usuario(
            "Agutin",
            "Pahile",
            "ElBorracho",
            "ElBorracho@gmail.com",
            "14789",
            true
        )
      );
    
    localStorage.setItem('users', JSON.stringify(usuarios) )
  };



const agregarNosotros = function () {
  nosotros.push(
    new Nosotros(
        "Roberto",
        "Ousset",
        ["Html", "Css", "JavaScript"],
        "Soy un apasionado de la tecnología y todo lo que se pueda crear  con las computadoras. Me gusta el buen diseño y ver todos los detalles que tiene cada programa.",
        "RoberOusset"
    )
  );
  nosotros.push(
    new Nosotros(
        "Juan Agustin",
        "Alejandro",
        ["Html", "Css", "JavaScript"],
        "Programar es mi vida, creo que nací para esto. Disfruto creando las funcionalidades de cada parte del software.",
        "JuanAlejandro"
    )
  );
  nosotros.push(
    new Nosotros(
        "Miqueas",
        "Acevedo",
        ["Html", "Css", "JavaScript"],
        "Me gusta aprender cosas nuevas, progamando conocí un nuevo mundo. Con Drink Hub estoy haciendo realidad una idea que tenía hace años.",
        "MiqueasAcevedo"
    )
  );
  nosotros.push(
    new Nosotros(
        "Eliezer",
        "Perez",
        ["Html", "Css", "JavaScript"],
        "Encontré en la programación web una forma de darle vida a mis proyectos y todos los días me perfecciono para darle nuestras páginas nuevos condimentos.",
        "Eliezer"
    )
  );
  nosotros.push(
    new Nosotros(
        "Agustin",
        "Soldati",
        ["Html", "Css", "JavaScript"],
        "Escribe el código correcto y la magia aparece. Es increible todo lo que se puede hacer con la programación Web. Drink Hub es nuestra segunda creación propia y vamos por más.",
        "JuanAgustinSoldati"
    )
  );

  localStorage.setItem("nosotros", JSON.stringify(nosotros));
};
const agregarRecetas = function () {
  recetas.push(
    new Receta(
      "Bloody Mary",
      [
        "Vodka",
        "Zumo de tomate",
        "Zumo de limón",
        "Salsa Tabasco",
        "Salsa Worcestershire",
        "Pimienta negra molida",
        "Apio",
      ],
      "A la hora de condimentar este cóctel, es fundamental un buen toque de salsa Perrins, muy poco Tabasco (dos gotas) para no pasarnos de picante agresivo y dos o tres vueltas de pimienta negra que completarán el efecto picante, para que quede en su punto. Opcionalmente se puede añadir un chorrito de caldo concentrado de carne para potenciar el sabor. Agregamos también el zumo de limón, aproximadamente 15 ml y agitamos con un cubo de hielo para mezclar bien y enfriar. Continuamos con el vodka, utilizando la medida del jigger pequeño o grande, en función de la proporción de alcohol que se desee incorporar. Lo habitual es utilizar una tercera parte de la cantidad de zumo de tomate que se vaya a usar. Para 210 ml de tomate, utilizaremos 70 ml de vodka y la proporción quedará en su punto. No obstante, con la experiencia de Kike el lo hace a ojo (y lo clava). Para incorporar el apio y la sal, el barman nos recomienda utilizar sal de apio, que aporta el inconfundible sabor de la hortaliza, sin saturar (evitando de paso que su sabor nos pueda repetir). Además así incorporamos el toque salado. No obstante, para terminar la preparación, vamos a meter una ramita de apio dentro del vaso dejando que asome por fuera que servirá para remover nuestro Bloody Mary, como si fuera una cucharilla. Ya sólo falta el zumo de tomate y agitar para que esté en su punto. El barman de Soda 917 nos recomienda airear bien el Bloody Mary, lanzándolo desde la coctelera al vaso dos o tres veces para terminar sirviéndolo en la copa, finalizando con la ramita de apio fresco. En caso de añadir hielo, hay que hacerlo al terminar de servir, sin echar más de dos cubitos para que nuestro Bloody Mary no quede aguado.",
      "../img/home/BloodyMary.jpg",
      "LaMasBorracha"
    )
  );
  recetas.push(
    new Receta(
      "Negroni",
      ["campari", "vermú rojo", "ginebra", "naranja"],
      " el Negroni se sirve igual que el Americano, en hielo, preferiblemente en vaso bajo y ancho y con una cáscara de naranja. Aunque veáis en algunos sitios hacerlo con coctelera, es un cóctel que, tradicionalmente, se mezcla directamente en vaso. Para armarlo solo debemos llenar el vaso de hielo y, con ayuda de un jigger, verter una parte de Campari, una de vermú rojo y una de ginebra, de 30 cl cada una. Se remueve bien con una cuchara y se termina con un twist de naranja.",
      "../img/home/Negroni.webp",
      "PL28"
    )
  );
  recetas.push(
    new Receta(
      "Tom Collins",
      ["ginebra", "zumo de limón", "soda", "azúcar", "hielo"],
      "Vierte en el vaso el zumo de un limón (aproximadamente 100 ml), una cucharada de azúcar o sirope, dos medidas de ginebra y, finalmente, la soda (te cabra medio botellín). Remueve bien para que se diluya el azúcar. Añade tres o cuatro o cubitos de huelo y una rodaja de limón y a disfrutar.",
      "../img/home/TomCollins.jpg",
      "Alberto_54"
    )
  );
  recetas.push(
    new Receta(
      "Piña colada",
      [
        "ron blanco",
        "leche de coco",
        "zumo de piña",
        "zumo de lima",
        "sirope de azúcar(opcional)",
      ],
      "En una batidora de vaso (si no tienes se puede usar de mano) mezcla una parte de ron blanco, una parte de crema o leche de coco y una de zumo de piña, preferiblemente natural. Si usas uno comercial evita el nectar, que tiene más azúcares. Añade zumo de lima (15 ml) y, si no has usado una leche de coco o un zumo que lleve azúcar añadido, 22 ml de sirope de azúcar. Se mezcla todo en la batidora con unos 180 ml de hielo picado hasta lograr la consistencia de un batido y se sirve en una de piña colada (aunque se puede poner en cualquier vaso alto y ancho). La decoración clásica del cóctel manda presentarlo con un trozo de piña natural, una sombrilla y una pajita.",
      "../img/home/PiñaColada.jpg",
      "Borracho100"
    )
  );
  recetas.push(
    new Receta(
      "Clericot o clericó",
      ["ginebra", "zumo de limón", "soda", "azúcar", "hielo"],
      'Vamos a cortar en dos el melocotón y las ciruelas. En seguida los cortamos en trocitos y colocamos en una jarra. Agregamos unas gotas de jugo de limón y la crema de Cassis. Revolvemos y agregamos hielo. Vertemos poco a poco el vino espumoso revolviendo todo el contenido con cuidado. No queremos eliminar muchas burbujas por lo que hay que evitar revolverlo como si fuera una "cuba". Agregamos más hielo y servimos en copas de tipo flautas o en vasos cortos tipo old fashion según lo que tengamos disponible.',
      "../img/home/Clericot.jpg",
      "ElBorracho"
    )
  );
  recetas.push(
    new Receta(
      "Rebujito",
      [
        "Vino Manzanilla",
        "Fino",
        "Montilla Moriles o similar",
        "refresco de lima o gaseosa",
        "Hierbabuena",
        "Hielo",
      ],
      'Preparar un buen rebujito no tiene mucha complicación, pero hacer que quede delicioso, suave, refrescante y no tenga demasiado alcohol para que no sea "cabezón" ni nos emborrache es una cuestión que no conviene olvidar. El rebujito se bebe muy fácil y sin darnos cuenta podemos beber de más. Por ese motivo, me encanta hacer esta receta en la que la proporción de alcohol y refresco es más ligera, por lo que se puede tomar más cantidad sin temor a los efectos de un consumo excesivo. Mezclamos el vino fino con el refresco carbónico con sabor a lima o limón. Los utilizados más habitualmente son el 7Up y el Sprite, pero podéis utilizar los que más os gusten. Lo importante es que estén muy fríos y que no tengan un sabor muy potente que pueda cambiar el sabor de la mezcla. Conviene escaldar unos segundos la hierbabuena para eliminar toda impureza que pueda tener y para que su sabor no tape en exceso el de los dos ingredientes fundamentales. Una vez escaldada y refrescada, separamos los palos de las hojas y añadimos estas últimas a la jarra, añadiendo hielos para que la bebida resultante se mantenga bien fría',
      "../img/home/Rebujito.jpg",
      "BeerMaster"
    )
  );
  localStorage.setItem("recetas", JSON.stringify(recetas));
};
const agregarEmpresaDatos = function () {
  empresaDatos.push(
    new EmpresaDatos("drinkHub@gmail.com", "Calle Falsa 123", "7543941")
  );
  localStorage.setItem("empresaDatos", JSON.stringify(empresaDatos));
};
const agregarProducto = function () {
  productos.push(
    new Productos("Fernet", 5, 700.0, "../img/producto/fernet.png")
  );
  productos.push(
    new Productos("Andes", 25, 200.0, "../img/producto/andes.png")
  );
  productos.push(new Productos("Gin", 30, 2478.0, "../img/producto/gin.png"));
  productos.push(
    new Productos("Vodka", 10, 836.0, "../img/producto/vodka.png")
  );
  productos.push(
    new Productos("Ron blanco", 20, 1485.0, "../img/producto/ronBlanco.png")
  );
  productos.push(
    new Productos("Zumo de tomate", 20, 40.0, "../img/producto/zumoTomate.png")
  );
  productos.push(
    new Productos("Zumo de limón", 20, 40.0, "../img/producto/zumoLimon.png")
  );
  productos.push(
    new Productos(
      "Salsa Tabasco",
      40,
      100.0,
      "../img/producto/salsaTabasco.png"
    )
  );
  productos.push(
    new Productos(
      "Salsa Worcestershire",
      150,
      120.0,
      "../img/producto/salsaWorcestershire.png"
    )
  );
  productos.push(
    new Productos("Campari", 200, 724.0, "../img/producto/campari.png")
  );
  productos.push(
    new Productos("Vermú rojo", 100, 1400.0, "../img/producto/vermuRojo.png")
  );
  productos.push(
    new Productos("Ginebra", 3, 3000.0, "../img/producto/ginebra.png")
  );
  productos.push(new Productos("Soda", 400, 50.0, "../img/producto/soda.png"));
  productos.push(new Productos("Hielo", 5, 100.0, "../img/producto/hielo.png"));
  productos.push(
    new Productos("Leche de coco", 20, 350.0, "../img/producto/lecheCoco.png")
  );
  productos.push(
    new Productos("Zumo de piña", 30, 400.0, "../img/producto/zumonPiña.png")
  );
  productos.push(
    new Productos(
      "Vino Manzanilla",
      30,
      2400.0,
      "../img/producto/vinoManzana.png"
    )
  );
  localStorage.setItem("productos", JSON.stringify(productos));
};

const redirigir = () => {
  console.log("sadfsf")
  location.href = '../index.html'
  
}

agregarUsuario();
agregarNosotros();
agregarRecetas();
agregarEmpresaDatos();
agregarProducto();
redirigir()