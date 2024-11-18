import data from "../json/productos.json" with {type: "json"};

document.addEventListener("DOMContentLoaded", function () {
  let cartCount = 0; // Contador del carrito
  const cart = []; // Lista de productos en el carrito

  const productosContainer = document.getElementById("productos-container");
  const cartCounter = document.querySelector("#cart-counter"); // Contador en el ícono del carrito

  // Función para dibujar una tarjeta de producto
  dibujarTarjeta();

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
function dibujarTarjeta() {
  const productosContainer = document.getElementById("productos-container");

  // Recorrer cada categoría
  data.products.forEach((category) => {
    // Crear un contenedor para la categoría
    const categoryContainer = document.createElement("div");
    categoryContainer.classList.add("category-container");
    categoryContainer.id = category.category.toLowerCase();

    // creamos y asignamos el titulo de la categoría
    const categoryTitle = document.createElement("h2");
    categoryTitle.textContent =
      category.category.charAt(0).toUpperCase() + category.category.slice(1);

    categoryContainer.appendChild(categoryTitle);

    // Crear un contenedor de tarjetas específico para cada categoría
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("row", "row-cols-1", "row-cols-md-3", "g-4");

    // Agregar las tarjetas de producto de la categoría actual
    category.items.forEach((product) => {
      // Contenedor de la tarjeta
      const col = document.createElement("div");
      col.classList.add("col");

      // Tarjeta
      const card = document.createElement("div");
      card.classList.add("card", "h-100", "card-product");

      // Imagen del producto
      const figure = document.createElement("figure");
      const image = document.createElement("img");
      image.src = product.image;
      image.alt = product.name;

      figure.appendChild(image);

      // Cuerpo de la tarjeta
      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      // Nombre del producto
      const productName = document.createElement("h5");
      productName.classList.add("card-title");
      productName.textContent = product.name;

      // Precio del producto
      const productPrice = document.createElement("span");
      productPrice.classList.add("card-price");
      productPrice.textContent = `$${product.price.toFixed(2)}`;

      // Descripción del producto
      const productDescription = document.createElement("p");
      productDescription.classList.add("card-text");
      productDescription.textContent = product.description;

      // Añadir título, precio y descripción al cuerpo de la tarjeta
      cardBody.appendChild(productName);
      cardBody.appendChild(productPrice);
      cardBody.appendChild(productDescription);

      //Footer de la tarjeta
      const cardFooter = document.createElement("div");
      cardFooter.classList.add("card-footer");

      // Botón de agregar a la bolsa
      const addToBag = document.createElement("button");
      addToBag.id = "bag-shopping";
      addToBag.type = "button";
      addToBag.classList.add("card-button", "btn", "btn-outline-dark");
      addToBag.innerHTML = `Agregar a la bolsa <i class="fa-solid fa-bag-shopping"></i>`;

      // Agregar el botón al footer de la tarjeta
      cardFooter.appendChild(addToBag);

      // Agregar la imagen, cuerpo y footer a la tarjeta
      card.appendChild(figure);
      card.appendChild(cardBody);
      card.appendChild(cardFooter);

      // Agregar la tarjeta a la columna
      col.appendChild(card);

      // Agregar la tarjeta al contenedor de tarjetas
      cardContainer.appendChild(col);
    });

    // Agregar el contenedor de tarjetas al contenedor de la categoría
    categoryContainer.appendChild(cardContainer);

    // Agregar el contenedor de la categoría al contenedor principal
    productosContainer.appendChild(categoryContainer);
  });
}
