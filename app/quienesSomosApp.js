let nosotros = JSON.parse(localStorage.getItem("nosotros")) || [];


let contenedor_nosotros = document.querySelector("#card_nosotros");

const crearCardsNosotros = function () {
	nosotros.map(function (item) {
		let card_nosotros = document.createElement("div");
		card_nosotros.classList = "col-8 col-md-4 col-lg-3 my-4 mx-2";
		let estructura_nosotros = `
  <div class="card estilo-gris my-4 h-100 bg-light">
    <img src="../img/nosotros/${item.foto}.jpeg" class="card-img-top img-card-nosotros" alt="..." />
    <div class="card-body text-center">
      <h5 class="card-title">${item.nombre} ${item.apellido}</h5>
        <div class="container">
          <span class="badge rounded-pill bg-secondary">${item.skill[0]}</span>
          <span class="badge rounded-pill bg-primary">${item.skill[1]}</span>
          <span class="badge rounded-pill bg-warning mb-2">${item.skill[2]}</span>
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
