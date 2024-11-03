const params = new URLSearchParams(window.location.search);
const albumId = params.get('album');
const addButton = document.querySelector('button[type="submit"]')
const cancelButton = document.getElementById("cancelar")

//12 - OBJETOS - 3. Validate Inputs
const addForm = document.forms.form;
function validar() {
    console.log(addForm)
    if (addForm.elements.title.value === "" || addForm.elements.duration.value === "" || addForm.elements.link.value === "") {
        addForm.elements.submit.disabled = true
        addForm.elements.submit.classList.add("bg-gray-500")
        addForm.elements.submit.classList.remove("hover:bg-cyan-800")
    } else {
        addForm.elements.submit.disabled = false
        addForm.elements.submit.classList.remove("bg-gray-500")
        addForm.elements.submit.classList.add("bg-cyan-600", "text-white", "rounded-md", "hover:bg-cyan-800")
    }
}


addForm.elements.title.oninput = validar
addForm.elements.duration.oninput = validar
addForm.elements.link.oninput = validar

// 20- Más requerimientos 1. Agregar canciones
let album;
let newSong = {}

const getAlbum = async () =>{
  try{
   const {data} = await axios.get(`/albums/${albumId}`)
   album = data[0];
  }
  catch(error){
  console.log(error)
  }
}
getAlbum()

function getInputValues() {
    newSong = {
        "titulo": addForm.elements['title'].value,
        "duracion": addForm.elements['duration'].value,
        "link": addForm.elements['link'].value,
    }
}

const addSong  = async (e) =>{
    e.preventDefault()
    getInputValues()
    //album.canciones.push(newSong)

    try{
        await axios.post(`/albums/${albumId}`, newSong)
        swal({
            title: 'Canción agregada!',
            text: 'Agregaste la canción!',
            icon: 'success',
            confirmButtonText: 'Ok'
        }).then(() => {
            window.location.href = `./album.html?album=${albumId}`;
          });
    }
    catch(error){
    console.log(error)
    swal({
        icon: "error",
        title: "Oops...",
        text: `No se pudo agregar la canción: ${error.response.data.message}`
      });
    }
  }

  addButton.addEventListener("click", addSong)
cancelButton.addEventListener("click", () => {
    window.location.href = `./album.html?album=${albumId}`;
});