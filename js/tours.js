let span = document.getElementById("welcome");

alert("Hola! Te damos la bienvenida")
let nombre = prompt("¿Cuál es tu nombre?").toUpperCase();
let edad = prompt("¿Cuál es tu edad?");

//window.alert("Hola " + nombre + " de " + edad + " años, te interesaría adquirir tickects ? 🎟️");
/* while (nombre=="") {
    alert("Debes ingresar tu nombre");
    nombre = prompt("¿Cuál es tu nombre?");
} */

while (nombre.length < 3) {
        nombre = prompt("Demasiado corto, dinos, cuál es realmente tu nombre?").toUpperCase();
      }

span.innerHTML = 'Hola ' + nombre + ' <i class="fa-solid fa-ticket"></i>';

/* document.addEventListener( 'DOMContentLoaded', (event) => {
    const ticketsButton = document.getElementById( 'ticketsButton' );
    ticketsButton.addEventListener("click", (event) => {
    event. preventDefault();
    alert("No quedan tiquets")
    ticketsButton.textContent = "No quedan tickets"
    })
    })
    window.onload = nombreEdad; */

