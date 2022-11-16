const primerNombre = document.getElementById('1°nombre');
const segundoNombre = document.getElementById('2°nombre');
const primerApellido = document.getElementById('1°apellido');
const segundoApellido = document.getElementById('2°apellido');
const gmail = document.getElementById('mail');
const imgPerfil = document.getElementById('imgPerfil');
const boton = document.getElementById('btnPerfil');
const celular = document.getElementById('celular')
const inpImg = document.getElementById('imgAdd') 

// funcion para validar campos
function validar(input, tipo = "error") {
    let inp = input;

    if (tipo === "error") {
        inp.classList.remove("is-valid");
        inp.classList.add("is-invalid");
    } else {
        inp.classList.remove("is-invalid");
        inp.classList.add("is-valid");
    }
}

const caracterMail = (e) => {
	return /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(
		e
	);
};
// evento click en el cual se validan los campos y se guarda la informacion modificada en el local storage
boton.addEventListener('click', (e)=> {
    e.preventDefault();
    if (primerNombre.value.trim() != "") {
        validar(primerNombre, "c")
        localStorage.setItem("nombrePrfl", primerNombre.value)

    } else {
        validar(primerNombre)
    }
    if (primerApellido.value.trim() != "") {
        validar(primerApellido, "c")
        localStorage.setItem("apellidoPrfl", primerApellido.value)

    } else {
        validar(primerApellido)
    }
    if (gmail.value.trim() != "" && caracterMail(gmail.value)) {
        validar(gmail, "c")
        localStorage.setItem("login", gmail.value)

    } else {
        validar(gmail)
    }
    localStorage.setItem("2nombrePrfl", segundoNombre.value)
    localStorage.setItem("2apellidoPrfl", segundoApellido.value)
    localStorage.setItem("telefono", celular.value )

})

// agregar imagen desde la PC y guardarla en local storage
inpImg.addEventListener('change', ()=>{
    const fr = new FileReader();
    fr.readAsDataURL(inpImg.files[0])

    fr.addEventListener('load', ()=>{
        const url = fr.result;
        localStorage.setItem('my-image',url);
        imgPerfil.src = localStorage.getItem('my-image')
    })
})


// cuando se carga el DOM se le asigna a los inputs la informacion guardada en localstorage
document.addEventListener("DOMContentLoaded",()=>{
    primerNombre.value = localStorage.getItem("nombrePrfl")
    primerApellido.value = localStorage.getItem("apellidoPrfl")
    gmail.value = localStorage.getItem("login")
    segundoNombre.value = localStorage.getItem("2nombrePrfl")
    segundoApellido.value = localStorage.getItem("2apellidoPrfl")
    celular.value = localStorage.getItem("telefono")
    if (imgPerfil.src === null){
        imgPerfil.src = "img/img_perfil.png"
    } else {
        imgPerfil.src = localStorage.getItem('my-image')
    }
})