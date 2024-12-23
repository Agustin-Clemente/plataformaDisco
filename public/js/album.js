import { onLoad } from '../utils/utils.js'

const titulo = document.getElementById("titulo");
const descripcion = document.getElementById("descripcion");
const encabezado = document.getElementById("encabezado");
const params = new URLSearchParams(window.location.search);
const albumId = params.get('album');
const buttonEditAlbum = document.querySelectorAll('.buttonEditAlbum');
const buttonAddSong = document.querySelectorAll('.buttonAddSong');



const getAlbum = async () => {
  try {
    const response = await axios.get(`/albums/${albumId}`)
    console.log(response.data)
    const albumToUse = response.data[0];
    renderAlbum(albumToUse);
  }
  catch (error) {
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
    //window.location.href = './index.html'
  }
}



//AXIOS - 1. GET - Vista De Un Album
function renderAlbum(album) {

  titulo.innerText = album.titulo;
  descripcion.innerText = album.descripcion;
  encabezado.innerText = `Lista de temas - ${album.titulo}`;

  if (album.canciones.length) {
    album.canciones.map((cancion, index) => {
      renderSong(cancion, index)
    })
    const botonesEliminar = document.querySelectorAll('.ml-2.text-red-700.hover\\:text-rose-950.cursor-pointer');
    botonesEliminar.forEach(boton => {
      boton.addEventListener('click', function () {
        deleteSong(this.id);
      })
    });

  }
}




// axios 2. renderSongs
function renderSong(cancion, index) {
  const tableBody = document.querySelector('tbody');

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
          <a class="ml-2 text-red-700 hover:text-rose-950 cursor-pointer" id=${cancion._id}>
            <i class="bi bi-trash"></i> Eliminar
          </a>
        </td>
      </tr>
    `;

  tableBody.insertAdjacentHTML('beforeend', contenidoTabla);
}



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


// 20- Más requerimientos 2. Eliminar canciones
const deleteSong = async (id) => {
  swal({
    title: "¿Estás seguro?",
    text: "Esta acción no se puede deshacer.",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then(async (confirmed) => {
    if (confirmed) {
      try {
        await axios.delete(`/albums/${albumId}/songs/${id}`)
        swal({
          title: 'Canción eliminada!',
          text: 'Eliminaste la canción!',
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then(() => {
          window.location.href = `./album.html?album=${albumId}`;
        });
      } catch (error) {
        console.log(error)
        swal({
          icon: "error",
          title: "Oops...",
          text: `No se pudo eliminar la canción: ${error.response.data}`
        });
      }
    }
  })
}

window.onload = onLoad;
getAlbum()