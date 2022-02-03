
let sugerencia = JSON.parse(localStorage.getItem("sugerencia")) || [];

class Sugerencia{
    constructor(nombre, apellido, email, sugerencia){
        this.nombre = nombre
        this.apellido = apellido
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
   
function getdata(){
    let informacion = new Sugerencia(
        document.getElementById("nombre").value, 
    document.getElementById("apellido").value,
    document.getElementById("email").value,
    document.getElementById("sugerencia").value)
   /* sugerencia.nombre = document.getElementById("nombre").value;
    sugerencia.apellido = document.getElementById("apellido").value;
    sugerencia.email = c;
    sugerencia.sugerencia = document.getElementById("sugerencia").value;
    console.log(nombre+" "+apellido+" "+email+" "+sugerencia) */
    alert(`Gracias por tu aporte ${document.getElementById("nombre").value}`)
    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("email").value = "";
    document.getElementById("sugerencia").value = "";
    document.getElementById("nombre").focus()
    sugerencia.push(informacion)
    localStorage.setItem('sugerencia', JSON.stringify(sugerencia) )
    
   
}
