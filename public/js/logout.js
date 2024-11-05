// BONUS - Logout 2. Front-end
const logoutUser = async () => {
  try {
    await axios.post(`https://plataformadisco-clemente.onrender.com/users/logout`);
    window.location.href = "./login.html";
  } catch (error) {
    console.error("Error al cerrar sesión", error);
  }
};


const logoutButton = document.querySelectorAll("#logout")

logoutButton.forEach(boton => {
  boton.addEventListener('click', () => logoutUser())
})




