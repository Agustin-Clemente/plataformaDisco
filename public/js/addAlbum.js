const addButton = document.querySelector('button[type="submit"]')
const cancelButton = document.getElementById("cancelar")

//12 - OBJETOS - 3. Validate Inputs
const addForm = document.forms.form;
function validar() {
    if (addForm.elements.title.value === "" || addForm.elements.lanzamiento.value === "" || addForm.elements.description.value === "" || addForm.elements.image.value === "") {
        addForm.elements.submit.disabled = true
        addForm.elements.submit.classList.add("bg-gray-500")
        addForm.elements.submit.classList.remove("hover:bg-cyan-800")
    } else {
        addForm.elements.submit.disabled = false
        addForm.elements.submit.classList.remove("bg-gray-500")
        addForm.elements.submit.classList.add("bg-cyan-600", "text-white", "rounded-md", "hover:bg-cyan-800");
    }
}


addForm.elements.title.oninput = validar
addForm.elements.lanzamiento.oninput = validar
addForm.elements.description.oninput = validar
addForm.elements.image.oninput = validar

//20- Más requerimientos POST - Agregar Un Album

function getInputValues() {
    const nuevoAlbum = {
        "titulo": addForm.elements['title'].value,
        "anio": addForm.elements['lanzamiento'].value,
        "descripcion": addForm.elements['description'].value,
        "portada": addForm.elements['image'].value
    }

    return nuevoAlbum
}

const addAlbum = async (e) => {
    e.preventDefault()
    objectToSend = getInputValues()
    try {
        await axios.post(`/albums`, objectToSend)
        swal({
            title: 'Album agregado!',
            text: 'Agregaste el album!',
            icon: 'success',
            confirmButtonText: 'Ok'
        }).then(() => {
            window.location.href = `./`;
          });
    } catch (error) {
        console.log(error)
    }
}



addButton.addEventListener("click", addAlbum)
cancelButton.addEventListener("click", () => {
    window.location.href = `./`;
});