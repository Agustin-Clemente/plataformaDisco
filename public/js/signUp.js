const registerButton = document.querySelector('input[type="submit"]')


const registerForm = document.forms.form;

function validar() {
  let isValid = true;

  // Validate nombre
  const nombreInput = registerForm.elements.nombre;
  const nombreError = document.getElementById('nombreError');
  if (nombreInput.value.length < 3) {
    nombreInput.classList.add('invalid');
    nombreError.textContent = 'Debe tener al menos 3 caracteres.';
    isValid = false;
  } else {
    nombreInput.classList.remove('invalid');
    nombreError.textContent = '';
  }

  // Validate apellido
  const apellidoInput = registerForm.elements.apellido;
  const apellidoError = document.getElementById('apellidoError');
  if (apellidoInput.value === '') {
    apellidoInput.classList.add('invalid');
    apellidoError.textContent = 'Campo requerido.';
    isValid = false;
  } else {
    apellidoInput.classList.remove('invalid');
    apellidoError.textContent = '';
  }

  // Validate mail
  const mailInput = registerForm.elements.mail;
  const mailError = document.getElementById('mailError');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(mailInput.value)) {
    mailInput.classList.add('invalid');
    mailError.textContent = 'Correo electrónico inválido.';
    isValid = false;
  } else {
    mailInput.classList.remove('invalid');
    mailError.textContent = '';
  }

  // Validate password
  const passwordInput = registerForm.elements.password;
  const passwordError = document.getElementById('passwordError');
  if (passwordInput.value.length < 6) {
    passwordInput.classList.add('invalid');
    passwordError.textContent = 'Mínimo 5 caracteres';
    isValid = false;
  } else {
    passwordInput.classList.remove('invalid');
    passwordError.textContent = '';
  }

  if (!isValid) {
    registerButton.disabled = true;
    registerButton.classList.add("deshabilitado");
    registerButton.classList.remove("habilitado");
  } else {
    registerButton.disabled = false;
    registerButton.classList.remove("deshabilitado");
    registerButton.classList.add("habilitado");
  }
}

validar()

registerForm.elements.nombre.oninput = validar
registerForm.elements.apellido.oninput = validar
registerForm.elements.mail.oninput = validar
registerForm.elements.password.oninput = validar

//20- Más requerimientos POST - Agregar Un Album

function getInputValues() {
  const newUser = {
    "nombre": registerForm.elements['nombre'].value,
    "apellido": registerForm.elements['apellido'].value,
    "email": registerForm.elements['mail'].value,
    "password": registerForm.elements['password'].value
  }

  return newUser
}

const register = async (e) => {
  if (registerForm.checkValidity()) {
    e.preventDefault()
    objectToSend = getInputValues()
    try {
      await axios.post(`/users`, objectToSend)
      swal({
        title: 'Usuario agregado!',
        text: 'Usuario creado correctamente!',
        icon: 'success',
        confirmButtonText: 'Ok'
      }).then(() => {
        window.location.href = `./login.html`;
      });
    } catch (error) {
      console.log(error)
    }
  }

}



registerButton.addEventListener("click", register)
