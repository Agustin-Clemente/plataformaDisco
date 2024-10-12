
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
}

window.onload = () => {
  const stars = document.querySelectorAll(".fa-star");
  stars.forEach(star => {
    star.addEventListener("click", function () {
      //star.classList.toggle("fa-regular");
      star.classList.toggle("fa-solid");
    });
  });
}


agregarFav()
