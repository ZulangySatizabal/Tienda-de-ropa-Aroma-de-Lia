// import data from "../json/productos.json" with {type: "json"};
import dibujarTarjeta from "/assets/js/productos.js";

document.addEventListener('DOMContentLoaded', function() {
    
    dibujarTarjeta("all");

    filtrarProductos();

});

function filtrarProductos() {
    const searchBar = document.querySelector("#search-bar");
    if (!searchBar) return;

    searchBar.addEventListener("input", function(event) {

        const searchText = event.target.value.toLowerCase();

        document.querySelectorAll(".card-product").forEach((card) => {
            const productName = card.querySelector(".card-title").textContent.toLowerCase();
            const productDesc = card.querySelector(".card-text").textContent.toLowerCase();

            if (productName.includes(searchText) || productDesc.includes(searchText)) {
                card.parentElement.classList.remove("d-none"); // Mostrar
            } else {
                card.parentElement.classList.add("d-none"); // Ocultar
            }
            
        });
    });
}

export default filtrarProductos;

