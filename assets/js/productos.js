import data from "../json/productos.json" with {type: "json"};

document.addEventListener("DOMContentLoaded", function () {
  let cartCount = 0; // Contador del carrito
  const cart = []; // Lista de productos en el carrito

  const productosContainer = document.getElementById("productos-container");
  const cartCounter = document.querySelector("#cart-counter"); // Contador en el ícono del carrito

  // Función para dibujar una tarjeta de producto
  dibujarTarjeta("all");

  // Escuchar eventos en los botones "Agregar a la bolsa"
  productosContainer.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON" || event.target.closest("button")) {
      const button = event.target.closest("button");

      // Obtener datos del producto
      const card = button.closest(".card");
      const productName = card.querySelector(".card-title").textContent;
      const productPrice = parseFloat(
        card.querySelector(".card-price").textContent.replace("$", "")
      );

      // Agregar el producto al carrito
      cart.push({ name: productName, price: productPrice });
      cartCount++;
      cartCounter.textContent = cartCount;

      alert(`${productName} ha sido añadido al carrito.`);
    }
  });

  // Mostrar la vista previa del carrito
  const cartIcon = document.querySelector(".fa-bag-shopping").parentElement;
  cartIcon.addEventListener("click", (e) => {
    e.preventDefault(); // Prevenir navegación

    // Crear la vista previa
    const cartPreview = document.createElement("div");
    cartPreview.id = "cart-preview";
    cartPreview.innerHTML = `
      <div class="preview-content">
        <h4>Tu carrito</h4>
        <ul>${cart
          .map((item) => `<li>${item.name} - $${item.price.toFixed(2)}</li>`)
          .join("")}</ul>
        <button id="close-preview" class="btn btn-secondary">Cerrar</button>
      </div>
    `;
    document.body.appendChild(cartPreview);

    // Cerrar la vista previa
    document.getElementById("close-preview").addEventListener("click", () => {
      cartPreview.remove();
    });
  });
});

// Función para dibujar tarjetas desde el JSON
function dibujarTarjeta(filter) {
  const productosContainer = document.getElementById("productos-container");

  // Recorrer cada categoría
  data.products.forEach((category) => {
    const categoryContainer = document.createElement("div");
    categoryContainer.classList.add("category-container");
    categoryContainer.id = category.category.toLowerCase();

    const categoryTitle = document.createElement("h2");
    categoryTitle.textContent =
      category.category.charAt(0).toUpperCase() + category.category.slice(1);

    categoryContainer.appendChild(categoryTitle);

    const cardContainer = document.createElement("div");
    cardContainer.classList.add("row", "row-cols-1", "row-cols-md-3", "g-4");

    // Agregar tarjetas de productos
    category.items.forEach((product) => {
      const col = document.createElement("div");
      col.classList.add("col");

      const card = document.createElement("div");
      card.classList.add("card", "h-100", "card-product");

      const figure = document.createElement("figure");
      const image = document.createElement("img");
      image.src = product.image;
      image.alt = product.name;

      figure.appendChild(image);

      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      const productName = document.createElement("h5");
      productName.classList.add("card-title");
      productName.textContent = product.name;

      const productPrice = document.createElement("span");
      productPrice.classList.add("card-price");
      productPrice.textContent = `$${product.price.toFixed(2)}`;

      const productDescription = document.createElement("p");
      productDescription.classList.add("card-text");
      productDescription.textContent = product.description;

      cardBody.appendChild(productName);
      cardBody.appendChild(productPrice);
      cardBody.appendChild(productDescription);

      const cardFooter = document.createElement("div");
      cardFooter.classList.add("card-footer");

      const addToBag = document.createElement("button");
      addToBag.id = "bag-shopping";
      addToBag.type = "button";
      addToBag.classList.add("card-button", "btn", "btn-outline-dark");
      addToBag.innerHTML = `Agregar a la bolsa <i class="fa-solid fa-bag-shopping"></i>`;

      cardFooter.appendChild(addToBag);
      card.appendChild(figure);
      card.appendChild(cardBody);
      card.appendChild(cardFooter);
      col.appendChild(card);
      cardContainer.appendChild(col);
    });

    categoryContainer.appendChild(cardContainer);
    productosContainer.appendChild(categoryContainer);
  });
}

