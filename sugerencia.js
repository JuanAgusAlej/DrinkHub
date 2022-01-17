var getData = function (){
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var email = document.getElementById("email").value;
    var sugerencia = document.getElementById("sugerencia").value;
    console.log(nombre+" "+apellido+" "+email+" "+sugerencia)
    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("email").value = "";
    document.getElementById("sugerencia").value = "";
    document.getElementById("nombre").focus()
}