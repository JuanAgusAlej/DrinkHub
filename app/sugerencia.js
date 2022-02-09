

class Sugerencia{
  constructor(nombre, apellido, email, sugerencia,fecha) {
    this.id = new Date().getTime();
    
      this.fecha = fecha;
        this.nombre = nombre + ' ' + apellido
        this.email = email
        this.sugerencia = sugerencia
    }
}


        
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()
   
function getdata() {
   let sugerencias = JSON.parse(localStorage.getItem("sugerencias")) || [];
   let f = new Date();
   let fecha = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear()
    let sugerencia = new Sugerencia(
        document.getElementById("nombre").value, 
    document.getElementById("apellido").value,
    document.getElementById("email").value,
      document.getElementById("sugerencia").value,
      fecha)
   
    alert(`Gracias por tu aporte ${document.getElementById("nombre").value}`)
    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("email").value = "";
    document.getElementById("sugerencia").value = "";
  document.getElementById("nombre").focus()
  
    sugerencias.push(sugerencia)
    localStorage.setItem('sugerencias', JSON.stringify(sugerencias) )
    
   
}
document.getElementById('fomulario-sugerencias').addEventListener('submit', function (e) {
  e.preventDefault();
  getdata();
});
