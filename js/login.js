const email = document.getElementById("email")
const contraseña = document.getElementById("contraseña")
const formulario = document.getElementById("formulario")
const boton = document.getElementById("ingreso")


formulario.addEventListener("submit", (e) => {
    e.preventDefault()
    validarCampos()
    localStorage.setItem("UserID", "25801")
}
)

// funcion para validar los campos del login, estos campos deben coincidir con la informacion guardada anteriormente en la seccion de registro
function validarCampos() {
    const mail = email.value;
    const contra = contraseña.value;

    if (mail === localStorage.getItem("login") && contra === localStorage.getItem("contraseña")) {

        Swal.fire({
            icon: 'success',
            title: 'Logueado Correctamente',
            timer: 1500
        })
        Redireccion()



    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error al iniciar',
            text: 'Por favor intenta denuevo'
        })
    }


    function Redireccion() {
        setTimeout(" window.location.href = 'index.html'", 1500)
    }
}

ingreso.addEventListener("click", () => {
    if (email.value) localStorage.setItem("login", email.value);
});
