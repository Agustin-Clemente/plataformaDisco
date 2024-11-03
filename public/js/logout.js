// BONUS - Logout 2. Front-end
const logoutUser = async () => {
    try {
        await axios.post(`http://localhost:5000/users/logout`);
        window.location.href = "./login.html";
      } catch (error) {
        console.error("Error al cerrar sesión", error);
      }
    };


const logoutButton = document.getElementById("logout")
logoutButton.addEventListener('click', ()=> logoutUser())




