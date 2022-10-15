const urlCarrito = CART_INFO_URL + USER_ID + EXT_TYPE ;
const templateCarrito = document.getElementById("template-carrito").content ;
const fragment = document.createDocumentFragment() ;
const contenido = document.getElementById("cart-container"); 





/* Otra posible opcion para hacer la peticion a la URL
    document.addEventListener("DOMContentLoaded", function(e){

    getJSONData(urlCarrito).then(function(resultObj){
        if (resultObj.status === "ok"){
            Carritus = resultObj.data.articles;
            mostrarArticulo(Carritus);
}
})
    
}); */

document.addEventListener("DOMContentLoaded", async () => {   
    const fetchCarrito = await getJSONData(urlCarrito)
    if (fetchCarrito.status === "ok") {
        InfoCarrito = fetchCarrito.data.articles;
      //  mostrarArticulo(InfoCarrito);
        objetos(InfoCarrito);   
    }
    
}); 

/* Imprimir los articulos utilizando innerHTML

 function mostrarArticulo(array){
    let cart = "";
    for( let i = 0 ; i < array.length; i++){
let articulo = array[i];
cart += `
<div class="row align-items-start">
    <div class="col-2">
        <img src="${articulo.image}" style="width: 150px;">
    </div>
    <div class="col-2">
        <p>${articulo.name}</p>
    </div>
    <div class="col-2">
    <label>${articulo.currency} <p id="precio">${articulo.unitCost}</p></label>
    </div>
    <div class="col-2">
        <button class="btn btn-danger" id="restar">-</button><input type="number" value="${articulo.count}" min="1" id="cantidad" style="width:30px" oninput="${precioTotal()}"> <button id="sumar" class="btn btn-info">+</button>
    </div>
    <div class="col-2">
        <b id="subtotal" >${articulo.currency}</b>
    </div>   
</div>

`    
}

    document.getElementById("cart-container").innerHTML += cart;
    
};
*/

// imprimiendo los articulos con template, fragment y appendChild
const objetos = InfoCarrito => {
    InfoCarrito.forEach(element => {
        templateCarrito.querySelector(".name").textContent = element.name
        templateCarrito.querySelector('#precio').textContent = element.currency
        templateCarrito.querySelector('#precio').textContent += " " +element.unitCost
        templateCarrito.querySelector('img').setAttribute("src", element.image)
        templateCarrito.querySelector('#cantidad').value = element.count
        templateCarrito.querySelector('#subtotal').textContent = element.currency
        templateCarrito.querySelector('#subtotal').textContent += " " +element.unitCost 

        const clone = templateCarrito.cloneNode(true);
        fragment.appendChild(clone)
        
        let contador = 1
contenido.addEventListener('click', (e) =>{
    if(e.target.classList.contains('btn-success')){
        contador ++
        document.getElementById("cantidad").value = contador;
        document.getElementById("subtotal").innerText = element.currency + " " + parseInt(contador) * element.unitCost;
        
        
    }
    if(e.target.classList.contains('btn-danger')){
        contador --
        document.getElementById("cantidad").value = contador;
        document.getElementById("subtotal").innerText = element.currency + " " +parseInt(contador) * element.unitCost;
    }
})

});
    contenido.appendChild(fragment)
}




    
