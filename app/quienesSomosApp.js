class Manager {
	constructor(nombre, apellido, skill, descripcion, img) {
		this.id = new Date().getTime();
		this.nombre = nombre;
		this.apellido = apellido;
		this.skill = skill;
		this.descripcion = descripcion;
		this.img = img;
	}
}

let nosotros = [];

let manager1 = new Manager(
	"Roberto",
	"Ousset",
	["Html", "Css", "JavaScript"],
	"Soy un apasionado de la tecnología y todo lo que se pueda crear  con las computadoras. Me gusta el buen diseño y ver todos los detalles que tiene cada programa.",
	"RoberOusset"
);

let manager2 = new Manager(
	"Juan Agustin",
	"Alejandro",
	["Html", "Css", "JavaScript"],
	"Programar es mi vida, creo que nací para esto. Disfruto creando las funcionalidades de cada parte del software.",
	"JuanAlejandro"
);
let manager3 = new Manager(
	"Miqueas",
	"Gonzales",
	["Html", "Css", "JavaScript"],
	"Me gusta aprender cosas nuevas, progamando conocí un nuevo mundo. Con Drink Hub estoy haciendo realidad una idea que tenía hace años.",
	"JuanAlejandro"
);
let manager4 = new Manager(
	"Eliezer",
	"Gonzales",
	["Html", "Css", "JavaScript"],
	"Encontré en la programación web una forma de darle vida a mis proyectos y todos los días me perfecciono para darle nuestras páginas nuevos condimentos.",
	"JuanAlejandro"
);
let manager5 = new Manager(
	"Agustin",
	"Soldati",
	["Html", "Css", "JavaScript"],
	"Escribe el código correcto y la magia aparece. Es increible todo lo que se puede hacer con la programación Web. Drink Hub es nuestra segunda creación propia y vamos por más.",
	"JuanAlejandro"
);

const agregarManager = function (manager) {
	nosotros.push(manager);
};

agregarManager(manager1);
agregarManager(manager2);
agregarManager(manager3);
agregarManager(manager4);
agregarManager(manager5);

localStorage.setItem("nosotros", JSON.stringify(nosotros));

// let nosotros = JSON.parse(localStorage.getItem("nosotros")) || [];

let contenedor_nosotros = document.querySelector("#card_nosotros");

const crearCardsNosotros = function () {
	nosotros.map(function (item) {
		let card_nosotros = document.createElement("div");
		card_nosotros.classList = "col-12 col-md-4 col-lg-2 my-4 mx-2";
		let estructura_nosotros = `
  <div class="card estilo-gris my-4 h-100 bg-light">
    <img src="../img/${item.img}.jpeg" class="card-img-top" alt="..." />
    <div class="card-body text-center">
      <h5 class="card-title">${item.nombre} ${item.apellido}</h5>
        <div class="container">
          <span class="badge rounded-pill bg-secondary">${item.skill[1]}</span>
          <span class="badge rounded-pill bg-primary">${item.skill[2]}</span>
          <span class="badge rounded-pill bg-warning mb-2">${item.skill[3]}</span>
        </div>
        <p class="card-text text-center fw-light">
       ${item.descripcion}
      </p>
    </div>
  </div>
</div>`;

		card_nosotros.innerHTML = estructura_nosotros;
		contenedor_nosotros.appendChild(card_nosotros);
	});
};

crearCardsNosotros();
