
//12 - OBJETOS - 3. Validate Inputs
const loginForm = document.forms.form;
function validar() {
    console.log(loginForm)
    if (loginForm.elements.title.value==="" || loginForm.elements.duration.value === "" || loginForm.elements.link.value === "" ) {
        loginForm.elements.submit.disabled=true
        loginForm.elements.submit.classList.add("bg-gray-500")
        loginForm.elements.submit.classList.remove("hover:bg-cyan-800")
}else{
    loginForm.elements.submit.disabled=false
    loginForm.elements.submit.classList.remove("bg-gray-500")
    loginForm.elements.submit.classList.add("bg-cyan-600 text-white rounded-md hover:bg-cyan-800")
}
}


loginForm.elements.title.oninput= validar
loginForm.elements.duration.oninput= validar
loginForm.elements.link.oninput= validar
