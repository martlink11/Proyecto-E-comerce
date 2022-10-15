const email = document.getElementById("email")
const contraseña = document.getElementById("contraseña")
const formulario = document.getElementById("formulario")
const boton = document.getElementById("ingreso")


formulario.addEventListener("submit", (e) => {
    e.preventDefault()
    validarCampos()
    localStorage.setItem("UserID","25801")
} 
)

function validarCampos() {
    const mail = email.value;
    const contra = contraseña.value;

    if (mail === ''  || contra === '' ){
        Swal.fire({
            icon:'error',
            title:'Error al iniciar',
            text: 'Por favor intenta denuevo'
        })
        

    } else {
        Swal.fire({
            icon:'success',
            title:'Logueado Correctamente',
            timer:1500
        })
        ValidacionOK()
    }


    function ValidacionOK(){
        setTimeout(" window.location.href = 'index.html'",1500)
    }
}

ingreso.addEventListener("click", () => {
    if (email.value) localStorage.setItem("login", email.value);
});
