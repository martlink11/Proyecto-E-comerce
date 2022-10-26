// constantes para fetch y template
const urlCarrito = CART_INFO_URL + USER_ID + EXT_TYPE;
const templateCarrito = document.getElementById("template-carrito").content;
const fragment = document.createDocumentFragment();
const contenido = document.getElementById("cart-container");
const templateCostos = document.getElementById("template-costos").content;
const fragmentoCostos = document.createDocumentFragment();
const contenidoCostos = document.getElementById("Costos-totales");

// constantes para acceder a los objetos del formulario
const NumTarjeta = document.getElementById("Num-tarjeta");
const CodiogoSeg = document.getElementById("Cod-Seg");
const Fecha = document.getElementById("FechaVencimiento");
const NumCuenta = document.getElementById("NumCuenta")
const Calle = document.getElementById("Calle");
const NumCalle = document.getElementById("Num-calle");
const Esquina = document.getElementById("Esquina");
const btnCompra = document.getElementById("finalizar-compra");
const TarjetaCredito = document.getElementById("TarjetaCredito");
const TransfCuenta = document.getElementById("CuentaBancaria");
const envioPremium = document.getElementById("envio-premium");
const envioExpress = document.getElementById("envio-express");
const envioStandar = document.getElementById("envio-standar");

// fetch
document.addEventListener("DOMContentLoaded", async () => {
    const fetchCarrito = await getJSONData(urlCarrito)
    if (fetchCarrito.status === "ok") {
        InfoCarrito = fetchCarrito.data.articles;
        objetos(InfoCarrito);
        costos(InfoCarrito);
    }

});

// mostrando los articulos con template, fragment y appendChild
let contador = 1
const objetos = InfoCarrito => {
    InfoCarrito.forEach(element => {
        templateCarrito.querySelector(".name").textContent = element.name
        templateCarrito.querySelector('#precio').textContent = element.currency
        templateCarrito.querySelector('#precio').textContent += " " + element.unitCost
        templateCarrito.querySelector('img').setAttribute("src", element.image)
        templateCarrito.querySelector('#cantidad').value = element.count
        templateCarrito.querySelector('#subtotal').textContent = element.currency
        templateCarrito.querySelector('#subtotal').textContent += " " + element.unitCost



        const clone = templateCarrito.cloneNode(true);
        fragment.appendChild(clone)


        // evento click para modificar precios al sumar o restar
        contenido.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-success')) {
                contador++
                document.getElementById("cantidad").value = contador;
                document.getElementById("subtotal").innerText = element.currency + " " + parseInt(contador) * element.unitCost;
                document.getElementById('costo-subtotal').innerText = element.currency + " " + parseInt(contador) * element.unitCost
                document.getElementById('suma-total').innerText = element.currency + " " + calculoTotal(element.unitCost, contador)
                document.getElementById('costo-envio').innerText = element.currency + " " + calculoEnvio(element.unitCost, contador)




            }
            if (e.target.classList.contains('btn-danger')) {
                contador--
                document.getElementById("cantidad").value = contador;
                document.getElementById("subtotal").innerText = element.currency + " " + parseInt(contador) * element.unitCost;
                document.getElementById('costo-subtotal').innerText = element.currency + " " + parseInt(contador) * element.unitCost
                document.getElementById('suma-total').innerText = element.currency + " " + calculoTotal(element.unitCost, contador)
                document.getElementById('costo-envio').innerText = element.currency + " " + calculoEnvio(element.unitCost, contador)
            }
        })


        envioPremium.addEventListener('click', () => {
            valorEnvio = 0.15;
            document.getElementById('costo-envio').innerText = element.currency + " " + calculoEnvio(element.unitCost, contador)
            document.getElementById('suma-total').innerText = element.currency + " " + calculoTotal(element.unitCost, contador)

        })

        envioExpress.addEventListener('click', () => {
            valorEnvio = 0.07;
            document.getElementById('costo-envio').innerText = element.currency + " " + calculoEnvio(element.unitCost, contador)
            document.getElementById('suma-total').innerText = element.currency + " " + calculoTotal(element.unitCost, contador)
        })

        envioStandar.addEventListener('click', () => {
            valorEnvio = 0.05;
            document.getElementById('costo-envio').innerText = element.currency + " " + calculoEnvio(element.unitCost, contador)
            document.getElementById('suma-total').innerText = element.currency + " " + calculoTotal(element.unitCost, contador)
        })

    });
    contenido.appendChild(fragment)
}

// imprimiendo el template del formulario de costos
const costos = InfoCarrito => {
    InfoCarrito.forEach(element => {
        templateCostos.querySelector('#costo-subtotal').innerText = element.currency + " " + element.unitCost
        templateCostos.querySelector('#costo-envio').innerText = "Seleccione metodo de envio"
        templateCostos.querySelector('#suma-total').innerText = element.currency + " " + element.unitCost



        const clonar = templateCostos.cloneNode(true);
        fragmentoCostos.appendChild(clonar)
    })
    contenidoCostos.appendChild(fragmentoCostos)
}


// funcion para validar el formulario
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


// Evento de validacion
btnCompra.addEventListener('click', (e) => {
    e.preventDefault();
    if (Calle.value.trim() != "") {
        validar(Calle, "c")

    } else {
        validar(Calle)
    }

    if (NumCalle.value.trim() != "") {
        validar(NumCalle, "c")

    } else {
        validar(NumCalle)
    }

    if (Esquina.value.trim() != "") {
        validar(Esquina, "c")

    } else {
        validar(Esquina)
    }

    if (NumTarjeta.value.trim() != "") {
        validar(NumTarjeta, "c")

    } else {
        validar(NumTarjeta)
    }

    if (NumCuenta.value.trim() != "") {
        validar(NumCuenta, "c")

    } else {
        validar(NumCuenta)
    }

    if (Fecha.value.trim() != "") {
        validar(Fecha, "c")

    } else {
        validar(Fecha)
    }

})

// funcion para calcular el valor total del envio
let valorEnvio = 0;
function calculoEnvio(Objeto, cantidad) {
    return (Objeto * cantidad) * valorEnvio
}

// function para hacer el calculo total 
function calculoTotal(objeto, cantidad) {
    return ((objeto * cantidad) * valorEnvio) + (objeto * cantidad)
}

// Eventos click para el tipo de de pago
const txtPago = document.getElementById("pago")
TarjetaCredito.addEventListener('click', () => {
    NumCuenta.disabled = true
    NumTarjeta.disabled = false
    CodiogoSeg.disabled = false
    Fecha.disabled = false
    txtPago.textContent = "Pago con Tarjeta"
})


TransfCuenta.addEventListener('click', () => {
    NumCuenta.disabled = false
    NumTarjeta.disabled = true
    CodiogoSeg.disabled = true
    Fecha.disabled = true
    txtPago.textContent = "Pago con transferencia bancaria"
})



