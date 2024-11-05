// BONUS - Acceso Restringido - 2. Función onLoad
const onLoad = async () => {
  try {
    const response = await axios.get('/users/me');
    console.log(response)
    const user = `${response.data.nombre} ${response.data.apellido}`;
    const userName = document.getElementById("username");
    userName.textContent = user;
  } catch (error) {
    console.error("Error ruta me:", error.message);
    window.location.href = "./login.html";
  }

};




export { onLoad }
