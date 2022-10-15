const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";
const USER_ID = localStorage.getItem("UserID");

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}


document.addEventListener("DOMContentLoaded", function(){
  if (localStorage.getItem("login") === null) {
      Swal.fire({
          icon:'warning',
          title:'Debe Loguearse',
          timer:1500})
          setTimeout(" window.location.href = 'login.html'",2000);
  } else {
      document.getElementById("perfil").innerHTML = localStorage.getItem("login");
}
  document.getElementById("cerrarSesion").addEventListener("click", () => {
      localStorage.removeItem("login");
  })

});
const agregarAlCarrito = document.getElementById("botonCarrito")
const containerBtnCart = document.getElementById("containerDelBotonCarrito")
const agregarCart = e => {
  if (e.target.classList.contains('btn-success')){
    setCarrito(e.target.parentElement)
  }
}


  





