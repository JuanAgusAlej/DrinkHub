class Receta {
  constructor(titulo, ingrediente, preparacion, imagen, autor) {
    this.id = new Date().getTime();
    this.titulo = titulo;
    this.ingrediente = ingrediente;
    this.preparacion = preparacion;
    this.imagen = imagen;
    this.autor = autor;
    this.like = {
      usuarioLike: [],
      cantidad: 0,
    }
  }
}

const crear_card = function (cardTrago) {
    let contenedor_cards = document.querySelector("#contenedor_cards");
    let card = "";
    let numeracion ='posteo'
    let i = 0
    cardTrago.map(function (item) {
      card += ` <div class="accordion " id="accordionExample">
                  
      <div class="accordion-item mb-3 card-publicacion">
        <div class="card mb-3 boxHome ">
          <div class="row g-0 ">
            <div class="col-md-4" >
              <img src=${item.imagen} class="img-fluid rounded-start"  alt="...">
            </div>
            <div class="col-md-8 align-self-center ">
              <div class="card-body d-flex flex-column align-items-center ">
                <h2 class="card-title "><strong>${item.titulo}</strong></h2>
                <samp class="blockquote-footer text-center my-2">${item.autor}</samp>
                <p class="card-text">${item.ingrediente}</p>
              </div>
            </div>
  
          </div>
          <div class="accordion-header" id="headingOne">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${numeracion+i}" aria-expanded="false" aria-controls="${numeracion+i}">
            </button>
        </div>
        </div>
        <div id="${numeracion+i}" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
          <div class="accordion-body">
            <h4 class="card-text mb-3 text-center"><strong>Preparacion</strong></h4>
            <p class="card-text"> ${item.preparacion}</p>
          </div>
        </div>
      </div>
  
      
    </div>`;
      i++
    });
    contenedor_cards.innerHTML = card;
  };
  
const verificacionLoguin = function () {
    
  if (!localStorage.getItem("user")) {

    location.href='../index.html'
    } else {
        
        let cardTrago = JSON.parse(localStorage.getItem("recetas")) || [];
        crear_card(cardTrago)
    }
    
}
verificacionLoguin()


let myModal = new bootstrap.Modal(document.getElementById("nuevaPublic"), {
  keyboard: false,
});
document.querySelector("#addPublic").addEventListener("click", function () {
  myModal.show();
});
const agregarImagen = function (e) {
  let campo = document.querySelector("#img_modal");
  if (e.keyCode === 13) {
    document.querySelector("#img_modal").src = campo.value;
  }
};
document.querySelector("#imgPrueba").addEventListener("keydown", agregarImagen);
const guardarPublicacion = function () {
  let user = JSON.parse(localStorage.getItem("user")) || [];
  let recetas = JSON.parse(localStorage.getItem("recetas")) || [];

  let titulo = document.getElementById("modal_titulo").value;
  let ingredientes = document
    .getElementById("modal_ingrediente")
    .value.split("-");

  let preparacion = document.getElementById("modal_preparacion").value;
  let imagen = document.getElementById("imgPrueba").value;

  recetas.unshift(
    new Receta(titulo, ingredientes, preparacion, imagen, user.nick)
  );
  localStorage.setItem("recetas", JSON.stringify(recetas));
  crear_card(recetas);
};

// ---------------- FILTRA BUSQUEDA -----------------
const busqueda = function (buscar) {
  let recetas = JSON.parse(localStorage.getItem("recetas")) || [];
  let filtroBusqueda = document.getElementById("filtroBusqueda");
  let buscador = document.getElementById("buscador");
  let encontrados = recetas.filter(function (product) {
    if (
      product.titulo.toLowerCase().trim().includes(buscar.toLowerCase().trim())
    ) {
      //consultar porque cuando pongo que la condicion es verdadero devuelve todos los otros productos
      return product;
    }
  });

  console.log(encontrados);
  if (buscar) {
    if (encontrados.length > 0) {
      filtroBusqueda.innerHTML = `
            <a class="btn boton-style bg-primary text-white rounded-pill my-3"  onclick="eliminarFiltro()" > <i class="far fa-times-circle">${buscar}</i></a>
            `;
      buscador.value = "";
      crear_card(encontrados);
    } else {
      window.alert("No se encontro producto");
    }
  }
};

//----------------ELIMINA FILTRO---------------------
const eliminarFiltro = function () {
  let recetas = JSON.parse(localStorage.getItem("recetas")) || [];
  let filtroBusqueda = document.getElementById("filtroBusqueda");
  filtroBusqueda.innerHTML = "";
  crear_card(recetas);
};

