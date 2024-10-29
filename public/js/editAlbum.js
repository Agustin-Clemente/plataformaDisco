const params = new URLSearchParams(window.location.search);
const albumId = params.get('album');
const editButton = document.querySelector('button[type="submit"]')
const cancelButton = document.getElementById("cancelar")

//12 - OBJETOS - 3. Validate Inputs
const editForm = document.forms.form;
function validar() {
    if (editForm.elements.title.value === "" || editForm.elements.lanzamiento.value === "" || editForm.elements.description.value === "" || editForm.elements.image.value === "") {
        editForm.elements.submit.disabled = true
        editForm.elements.submit.classList.add("bg-gray-500")
        editForm.elements.submit.classList.remove("hover:bg-cyan-800")
    } else {
        editForm.elements.submit.disabled = false
        editForm.elements.submit.classList.remove("bg-gray-500")
        editForm.elements.submit.classList.add("bg-cyan-600", "text-white", "rounded-md", "hover:bg-cyan-800");
    }
}


editForm.elements.title.oninput = validar
editForm.elements.lanzamiento.oninput = validar
editForm.elements.description.oninput = validar
editForm.elements.image.oninput = validar

//19 - Axios PUT - Editar Un Album
const completarForm = async () => {

    try {
        const response = await axios.get(`/albums/${albumId}`)
        albumToUse = response.data[0];
        editForm.elements.title.value = albumToUse.titulo
        editForm.elements.lanzamiento.value = albumToUse.anio
        editForm.elements.description.value = albumToUse.descripcion
        editForm.elements.image.value = albumToUse.portada

    }
    catch (error) {
        console.log(error)
    }
}




function getInputValues() {
    const editado = {
        "titulo": editForm.elements['title'].value,
        "anio": editForm.elements['lanzamiento'].value,
        "descripcion": editForm.elements['description'].value,
        "portada": editForm.elements['image'].value
    }

    return editado
}

const editAlbum = async (e) => {
    e.preventDefault()
    objectToSend = getInputValues()
    try {
        await axios.put(`/albums/${albumId}`, objectToSend)
        swal({
            title: 'Album editado!',
            text: 'Modificaste el album!',
            icon: 'success',
            confirmButtonText: 'Ok'
        }).then(() => {
            window.location.href = `./album.html?album=${albumId}`;
          });
    } catch (error) {
        console.log(error)
    }
}

completarForm()
//getInputValues()


editButton.addEventListener("click", editAlbum)
cancelButton.addEventListener("click", () => {
    window.location.href = `./album.html?album=${albumId}`;
});