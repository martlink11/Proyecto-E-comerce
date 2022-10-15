const url_info = PRODUCT_INFO_URL + localStorage.getItem("productID") + EXT_TYPE;
const url_comments = PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("productID") + EXT_TYPE;
let boton = document.getElementById("agregarComentario");
let comment = document.getElementById("NewComment");
let puntuacion = document.getElementById("puntaje");

document.addEventListener("DOMContentLoaded", async () => {

    const fetchInfo = await getJSONData(url_info)
    if (fetchInfo.status === "ok") {
        infoProductos = fetchInfo.data;
        mostrarInfo();
        productosRelacionados();
    }

    const linkearComentarios = await getJSONData(url_comments)
    if (linkearComentarios.status === "ok") {
        comentarios = linkearComentarios.data;
        mostarComentarios();
        
    }

});




function mostrarInfo() {
    let contenidoHTML = ``;
    contenidoHTML += ` 
    <div class="text-center p-4"> 
        <h1>` + infoProductos.name + ` </h1>
    </div>
    <hr>
    <div> 
        <h4> Precio </h4>
        <p>`+ infoProductos.cost + ` ` + infoProductos.currency + ` </p>  
    </div> 
    <div> 
        <h4> Descripcion </h4>
        <p> `+ infoProductos.description + ` </p>
    </div>
    <div> 
        <h4> Categoria </h4>
        <p> `+ infoProductos.category + ` </p>
    </div>
    <div> 
        <h4> Cantidad Vendida </h4>
        <p> `+ infoProductos.soldCount + ` </p>
    </div>
    
    `

    document.getElementById("informacion").innerHTML = contenidoHTML;
    let imagenesDelProducto = `   
    <div id="carouselExampleIndicators" class="carousel carousel-dark slide w-75" data-bs-ride="carousel">
  <div class="carousel-indicators">
    ${ botonesCarrusel(infoProductos.images)}
  </div>
  <div class="carousel-inner">
    ${imagenesCarrusel(infoProductos.images)}
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
`
document.getElementById("carrusel").innerHTML = imagenesDelProducto ;
agregarAlCarrito.setAttribute("id",infoProductos.id)
}



function botonesCarrusel(array){
let botoncito = "" ;
    for( let b = 0 ; b < array.length; b++){
    if (b === 0){
botoncito += `<button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>`
    } else { 
        botoncito += `<button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="${b}" aria-label="Slide ${b + 1}"></button>`
    }
}
return botoncito
}
function imagenesCarrusel(array){
    let imgCarrusel = "";
    for (let i = 0 ; i < array.length; i++){
        let imagencita = array[i];
        if (i === 0){
            imgCarrusel += ` <div class="carousel-item active">
            <img src="${imagencita}" class="d-block w-100" alt="Error">
          </div> `
        } else {
            imgCarrusel += `
            <div class="carousel-item">
      <img src="${imagencita}" class="d-block w-100" alt="Error">
    </div>
            `
        }
    }
   return imgCarrusel
}


function mostarComentarios() {
    let contenido = "";
    for (let c = 0; c < comentarios.length; c++) {
        let comments = comentarios[c];
        contenido += `
<div class="list-group-item list-group-item-action">
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <div class="mb-1">
                        <p> <strong>  `+ comments.user + ` </strong> - ` + comments.dateTime + ` - 
            `
        if (comments.score === 1) {
            contenido += `<span class="fa fa-star checked"></span> `
        } else if (comments.score === 2) {
            contenido += `
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span> 
                `
        } else if (comments.score === 3) {
            contenido += `
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span> 
                <span class="fa fa-star checked"></span>
                `
        } else if (comments.score === 4) {
            contenido += `
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span> 
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                `
        } else {
            contenido += `
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span> 
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                `
        }


        contenido += `
                <p> ` + comments.description + ` </p>
            </div>
        </div>
    </div>
</div>
        
        `
        
    }
    document.getElementById("comentarios").innerHTML += contenido;

}


function agregarComentario() {
    let lista = document.getElementById("comentarios")
    guardado = JSON.parse(localStorage.getItem('comments'));

    if (guardado != null) {
        for (i in guardado) {
            agregarComentario(guardado[i]);
        }
    } else {
        guardado = [];
    }


    let nuevoComentario = `
    <div class="list-group-item list-group-item-action">
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <div class="mb-1">
                        <p><strong>`+ localStorage.getItem("login") + `</strong> - `

    if (puntuacion.value === 1) {
        nuevoComentario += `<span class="fa fa-star checked"></span> `
    } else if (puntuacion.value === 2) {
        nuevoComentario += `
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span> 
                            `
    } else if (puntuacion.value === 3) {
        nuevoComentario += `
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span> 
                            <span class="fa fa-star checked"></span>
                            `
    } else if (puntuacion.value === 4) {
        nuevoComentario += `
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span> 
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            `
    } else {
        nuevoComentario += `
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span> 
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            `
    }

    nuevoComentario += ` 
                    
                    
                    <p> `+ comment.value + `</p>
                    
                    </div>
                </div>
            </div>
    </div>
    `
    lista.innerHTML += nuevoComentario;

}



boton.addEventListener("click", () => {
    if (comment.value != "" && puntuacion.value != 0) {
        agregarComentario();
        guardado.push(comment.value);
        guardado.push(puntuacion.value);
        localStorage.setItem('comments', JSON.stringify(guardado));
        comment.value = "";
    } else {
        comment.setAttribute("placeholder", "Agrega un comentario");
        comment.className = "error";
    }
});

function productosRelacionados(){
    let relatedProduct = "";
    for (let r = 0; r < infoProductos.relatedProducts.length; r++) {
        let otherProduct = infoProductos.relatedProducts[r];
    relatedProduct += `
    <div class="col-md-4">
            <div class="card mb-4 shadow-sm custom-card cursor-active">
              <img class="bd-placeholder-img card-img-top" src="`+ otherProduct.image +`"
                alt="Imgagen representativa">
              <h3 class="m-3">`+ otherProduct.name +`</h3>
              <div class="card-body">
                <p class="card-text">Por mas informacion del producto
                    <a  onclick="localStorage.setItem('productID', ` + otherProduct.id +` )" href="product-info.html">Clickea Aqui</a>
                </p>
              </div>
            </div>
          </div>
    `
    }
    document.getElementById("otrosProductos").innerHTML += relatedProduct;
}








