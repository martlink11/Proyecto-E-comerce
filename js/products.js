const URL = PRODUCTS_URL +localStorage.getItem("catID")+EXT_TYPE
const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_SOLD_COUNT = "Cant.";
let currentSortCriteria = undefined;
let cantidadMinima = undefined;
let cantidadMaxima = undefined;



function setProductID(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html"
}

let arregloProductos = [];
    
    
    function mostrarProductos(array){
        let htmlContentToAppend = "" ;

        for( let i =0 ; i < array.length; i++){
            let productos = array[i];
            
            if (((cantidadMinima == undefined) || (cantidadMinima != undefined && parseInt(productos.cost) >= cantidadMinima)) &&
            ((cantidadMaxima == undefined) || (cantidadMaxima != undefined && parseInt(productos.cost) <= cantidadMaxima))){

            htmlContentToAppend += `
            <div onclick="setProductID(` + productos.id + ` )" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + productos.image + `" alt="product image" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <div class="mb-1">
                            <h4>`+ productos.name +`  - USD `+ productos.cost+ `</h4> 
                            <p> `+ productos.description +`</p> 
                            </div>
                            <small class="text-muted">` + productos.soldCount + ` Vendidos</small> 
                        </div>
    
                    </div>
                </div>
            </div>
            `
            }
            document.getElementById("productos").innerHTML = htmlContentToAppend; 
        }
        }



        
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            arregloProductos = resultObj.data.products;
            mostrarProductos(arregloProductos);
        }
    });
    document.getElementById("local-host-cat").innerHTML = localStorage.getItem("catName");

});
    




function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_SOLD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        arregloProductos = productsArray;
    }

    arregloProductos = sortProducts(currentSortCriteria, arregloProductos);
    mostrarProductos(arregloProductos);
}

document.getElementById("sortAsc").addEventListener("click", function(){
    sortAndShowProducts(ORDER_ASC_BY_NAME);
    
});

document.getElementById("sortDesc").addEventListener("click", function(){
    sortAndShowProducts(ORDER_DESC_BY_NAME);
    
});

document.getElementById("sortByCount").addEventListener("click", function(){
    sortAndShowProducts(ORDER_BY_SOLD_COUNT);
});

document.getElementById("rangeFilterCount").addEventListener("click", function(){
    cantidadMinima = document.getElementById("rangeFilterCountMin").value;
    cantidadMaxima = document.getElementById("rangeFilterCountMax").value;

    if ((cantidadMinima != undefined) && (cantidadMinima != "") && (parseInt(cantidadMinima)) >= 0){
        cantidadMinima = parseInt(cantidadMinima);
    }
    else{
        cantidadMinima = undefined;
    }

    if ((cantidadMaxima != undefined) && (cantidadMaxima != "") && (parseInt(cantidadMaxima)) >= 0){
        cantidadMaxima = parseInt(cantidadMaxima);
    }
    else{
        cantidadMaxima = undefined;
    }
    mostrarProductos(arregloProductos);
});

document.getElementById("clearRangeFilter").addEventListener("click", function(){
    document.getElementById("rangeFilterCountMin").value = "";
    document.getElementById("rangeFilterCountMax").value = "";

    cantidadMinima = undefined;
    cantidadMaxima = undefined;

    mostrarProductos(arregloProductos) ;
});
