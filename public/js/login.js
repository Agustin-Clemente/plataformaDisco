
const loginForm = document.forms.login;

//12 - OBJETOS - 3. Validate Inputs
/* loginForm.elements.mail.placeholder = "test@example.com";
loginForm.elements.password.placeholder = "password"; */

/* function validar() {
    if (loginForm.elements.mail.value==="" || loginForm.elements.password.value === "") {
        loginForm.elements.submit.disabled=true
}else{
    loginForm.elements.submit.disabled=false
}
} */

/* loginForm.elements.mail.oninput= validar
loginForm.elements.password.oninput= validar */


//13. EVENTOS

const mensaje = document.createElement("p");
mensaje.innerText = "La contraseña es demasiado corta";

function validar(event) {
    if (loginForm.elements.mail.value === "" || loginForm.elements.password.value === "") {
        event.preventDefault()
        swal("Todos los campos deben estar completos")
    }
}

function aviso() {
    const mensajeContainer = document.querySelector(".mensaje");
    mensajeContainer.innerHTML = "";
    if (loginForm.elements.password.value.length < 6) {
        mensajeContainer.appendChild(mensaje);
        loginForm.elements.submit.disabled = true
    } else {
        loginForm.elements.submit.disabled = false
    }
}

loginForm.elements.submit.onclick = validar
loginForm.elements.password.oninput = aviso


// BONUS - Login 1. Front-end
function getInputValues() {
  const user = {
      "email": loginForm.elements['mail'].value,
      "password": loginForm.elements['password'].value
  }

  return user
}

const loginUser = async (e) => {
    e.preventDefault()
    objectToSend = getInputValues()
    try{
     await axios.post(`http://localhost:5000/users/login`,objectToSend)
     swal({
      title: 'Ingreso correcto!',
      text: "",
      icon: 'success',
      confirmButtonText: 'Ok'
    }).then(()=> {
        window.location.href= "./"
    })
    }
    catch(error){
      swal({
        icon: "error",
        title: "Oops...",
        text: `No pudo ingresar: ${error.response.data.message}` 
      })
    }
  }


const loginButton = document.querySelector('input[type="submit"]')
loginButton.addEventListener('click', (e)=> loginUser(e))






