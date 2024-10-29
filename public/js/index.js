
var sideBar = document.getElementById("mobile-nav");
var openSidebar = document.getElementById("openSideBar");
var closeSidebar = document.getElementById("closeSideBar");
sideBar.style.transform = "translateX(-260px)";




//const favoritos = ["deNoche"]

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

//12 - OBJETOS
/*  function agregarFav(favoritos) {
   const imgs = document.querySelectorAll("img");
 imgs.forEach((img) => {
   if (favoritos.includes(img.name)) {
       console.log(img.name)
     const icon = document.createElement("i");
     icon.classList.add("fa-regular");
     icon.classList.add("fa-star", "fixed-star");
     img.parentNode.appendChild(icon);
     img.parentElement.classList.add("favorite");
   }
 });
 } */

//13 - EVENTOS (Pledu me pide hacerlo con position:fixed pero lo hice con absolute y relative)

function agregarFav() {
  const divs = document.querySelectorAll(".posicionamiento");
  divs.forEach((div) => {
    const icon = document.createElement("i");
    icon.classList.add("fa-regular", "fa-star", "fixed-star");
    div.appendChild(icon);
    div.classList.add("favorite");
    // }
  });
  const stars = document.querySelectorAll(".fa-star");
  stars.forEach(star => {
    star.addEventListener("click", function () {
      //star.classList.toggle("fa-regular");
      star.classList.toggle("fa-solid");
    });
  });
}

/* window.onload = () => {
  const stars = document.querySelectorAll(".fa-star");
  stars.forEach(star => {
    star.addEventListener("click", function () {
      //star.classList.toggle("fa-regular");
      star.classList.toggle("fa-solid");
    });
  });
} */

const getAlbums =  async () => {
  try{
  const response = await axios.get('/albums')
  response.data.map((album)=> {
    renderAlbums(album)})
    agregarFav()
  }
  catch(error){
    console.log(error)
  }

}


// AXIOS - 1. GET - Mostrar Albums
const redirect = (id) => { window.location.href = `./album.html?album=${id}`}

const renderAlbums = (album) => {
  const contenedor = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3.gap-4');

  const card = `
    <div class="bg-transparent rounded-lg p-4 text-center posicionamiento">
        <img src="${album.portada}"  onclick="redirect('${album._id}')" alt="Portada del Álbum" class="w-2/3 mx-auto object-cover rounded-md cursor-pointer">
        <p class="mt-2">${album.titulo}</p>
        <p>${album.anio}</p>
      </a>
      <button class="mt-2 text-red-700 hover:text-rose-950">
        <i class="bi bi-trash"></i> Eliminar
      </button>
    </div>
  `;

  //contenedor.insertAdjacentHTML('beforeend', card);
  contenedor.innerHTML += card
  //agregarFav()

};

//agregarFav()
getAlbums()

