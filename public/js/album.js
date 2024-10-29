
var sideBar = document.getElementById("mobile-nav");
var openSidebar = document.getElementById("openSideBar");
var closeSidebar = document.getElementById("closeSideBar");
sideBar.style.transform = "translateX(-260px)";
const titulo = document.getElementById("titulo");
const descripcion = document.getElementById("descripcion");
const encabezado = document.getElementById("encabezado");
const params = new URLSearchParams(window.location.search);
const albumId = params.get('album');
const buttonEditAlbum = document.querySelectorAll('.buttonEditAlbum');
const buttonAddSong = document.querySelectorAll('.buttonAddSong');



function sidebarHandler(flag) {
  if (flag) {
    sideBar.style.transform = "translateX(0px)";
    openSidebar.classList.add("hidden");
    closeSidebar.classList.remove("hidden");
  } else {
    sideBar.style.transform = "translateX(-260px)";
    closeSidebar.classList.add("hidden");
    openSidebar.classList.remove("hidden");
  }
}



const getAlbum = async () =>{
  try{
    const response = await axios.get( `/albums/${albumId}`)
    albumToUse = response.data[0];
    renderAlbum(albumToUse);
  }
  catch(error){
    if (error.response) {
      swal({
        title: 'Error!',
        text: `${error.response.data}`,
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    } else if (error.request) {
      swal({
        title: 'Error!',
        text: 'Error del servidor.',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    } else {
      swal({
        title: 'Error!',
        text: `Something went wrong: ${error.message}`,
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
    window.location.href ='./index.html'
  }
}



//AXIOS - 1. GET - Vista De Un Album
function renderAlbum(album){

  titulo.innerText= album.titulo;
  descripcion.innerText= album.descripcion;
  encabezado.innerText= `Lista de temas - ${album.titulo}`;
/* 
  const tableBody = document.querySelector('tbody');
  let numeroCancion = 1
  for (let i = 0; i < album.canciones.length; i++) {
    const track = album.canciones[i];
    
    const contenidoTabla = `
      <tr class="border-b">
        <td class="px-4 py-4">${numeroCancion++}</td>
        <td class="px-4 py-4">${track.titulo}</td>
        <td class="px-4 py-4">${track.duracion}</td>
        <td class="px-4 py-4">
          <a href="${track.link}" target="_blank" class="text-violet-900 hover:text-cyan-400">
            <i class="bi bi-play-circle"></i> Escuchar
          </a>
        </td>
        <td>
          <a href="#" class="ml-2 text-red-700 hover:text-rose-950">
            <i class="bi bi-trash"></i> Eliminar
          </a>
        </td>
      </tr>
    `;
  
    tableBody.insertAdjacentHTML('beforeend', contenidoTabla);
  } */

  if(album.canciones.length){
    album.canciones.map((cancion, index)=> { 
        renderSong(cancion, index)})
}
}
                  



// axios 2. renderSongs
function renderSong (cancion, index) {
  const tableBody = document.querySelector('tbody');
  //let numeroCancion = 1
  /* for (let i = 0; i < album.canciones.length; i++) {
    const track = album.canciones[i]; */
    
    const contenidoTabla = `
      <tr class="border-b">
        <td class="px-4 py-4">${++index}</td>
        <td class="px-4 py-4">${cancion.titulo}</td>
        <td class="px-4 py-4">${cancion.duracion}</td>
        <td class="px-4 py-4">
          <a href="${cancion.link}" target="_blank" class="text-violet-900 hover:text-cyan-400">
            <i class="bi bi-play-circle"></i> Escuchar
          </a>
        </td>
        <td>
          <a href="#" class="ml-2 text-red-700 hover:text-rose-950">
            <i class="bi bi-trash"></i> Eliminar
          </a>
        </td>
      </tr>
    `;
  
    tableBody.insertAdjacentHTML('beforeend', contenidoTabla);
  //}
}

getAlbum()

buttonAddSong.forEach(button => {
  button.addEventListener('click', () => {
  window.location.href = `./addSong.html?album=${albumId}`;
})
});


buttonEditAlbum.forEach(button => {
  button.addEventListener('click', () => {
  window.location.href = `./editAlbum.html?album=${albumId}`;
})
});