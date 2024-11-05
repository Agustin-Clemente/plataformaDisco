import { onLoad } from '../utils/utils.js'


let span = document.getElementById("welcome");
let botones = document.querySelectorAll(".boton")


alert("Hola! Te damos la bienvenida")
let nombre = prompt("¿Cuál es tu nombre?").toUpperCase();
let edad = prompt("¿Cuál es tu edad?");


while (nombre.length < 3) {
  nombre = prompt("Demasiado corto, dinos, cuál es realmente tu nombre?").toUpperCase();
}

span.innerHTML = 'Hola ' + nombre + ' <i class="fa-solid fa-ticket"></i>';

//10. VARIABLES Y FUNCIONES
/* function getTickets (disponible, lugar) {
  if (disponible) {
    swal("Compraste", "Ticket para "+ lugar + " adquirido", "success");
  }else{
    swal("Agotado", "No quedan tickets disponibles", "error");
  }
} */

//Lo paso a funcion flecha como pide PLEDU
/* const getTickets = (disponible, lugar) => {
  if (disponible) {
    swal("Compraste", "Ticket para " + lugar + " adquirido", "success");
  } else {
    swal("Agotado", "No quedan tickets disponibles para " + lugar, "error");
  }
}; */

//11. ARREGLOS
window.onload = () => {
  onLoad()
  if (edad < 18) {
    swal("No puedes comprar", "Debes ser mayor de edad para comprar", "error");
    botones.forEach(boton => {
      boton.classList.add("text-gray-500")
      boton.classList.remove("hover:text-rose-950")
      boton.disabled = true
    });
  }

}

//12. OBJETOS
let tickets = {
  "Viernes": 10,
  "Sabado": 1,
  "Domingo": 0,
}

//Modificada como pide PLEDU
const getTickets = (fecha) => {
  if (tickets[fecha] <= 0) {
    disableSoldOutButtons(fecha)
    swal("Agotado", "No quedan tickets disponibles para el " + fecha, "error");
  } else {
    tickets[fecha] -= 1;
    swal("Compraste", "Ticket para el " + fecha + " adquirido", "success");

    if (tickets[fecha] <= 0) {
      disableSoldOutButtons(fecha);
    }
  }
};

function disableSoldOutButtons(fecha) {
  botones.forEach(boton => {
    if (boton.value == fecha) {
      boton.classList.add("text-gray-500")
      boton.classList.remove("hover:text-rose-950")
      boton.disabled = true
    }
  });
}


window.getTickets = getTickets;