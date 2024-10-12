
//12 - OBJETOS - 3. Validate Inputs
const loginForm = document.forms.form;
function validar() {
    if (loginForm.elements.title.value === "" || loginForm.elements.lanzamiento.value === "" || loginForm.elements.description.value === "" || loginForm.elements.image.value === "") {
        loginForm.elements.submit.disabled = true
        loginForm.elements.submit.classList.add("bg-gray-500")
        loginForm.elements.submit.classList.remove("hover:bg-cyan-800")
    } else {
        loginForm.elements.submit.disabled = false
        loginForm.elements.submit.classList.remove("bg-gray-500")
        loginForm.elements.submit.classList.add("bg-cyan-600 text-white rounded-md hover:bg-cyan-800")
    }
}


loginForm.elements.title.oninput = validar
loginForm.elements.lanzamiento.oninput = validar
loginForm.elements.description.oninput = validar
loginForm.elements.image.oninput = validar