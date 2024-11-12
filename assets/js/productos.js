// datos de los productos
const data = {
  products: [
    {
      category: "hombre",
      items: [
        {
          image:
            "../img/productos/men/casual-shirt-men.avif",
          name: "Camisa Casual",
          price: 25.99,
          description: "Camisa de algodón para ocasiones informales.",
        },
        {
          image:
            "../img/productos/men/leather-jacket-men.png",
          name: "Chaqueta de Cuero",
          price: 89.99,
          description: "Chaqueta resistente y estilosa, ideal para invierno.",
        },
        {
          image:
            "../img/productos/men/skinny-jeans-men.png",
          name: "Jeans Ajustados",
          price: 45.99,
          description: "Jeans modernos con un ajuste perfecto.",
        },
        {
          image:
            "../img/productos/men/sport-shoes-men.png",
          name: "Zapatos Deportivos",
          price: 69.99,
          description: "Zapatos cómodos para el día a día.",
        },
        {
          image:
            "../img/productos/men/wool-sweater-men.png",
          name: "Suéter de Lana",
          price: 35.99,
          description: "Suéter cálido para los días fríos.",
        },
      ],
    },
    {
      category: "mujer",
      items: [
        {
          image:
            "../img/productos/women/summer-dress-women.png",
          name: "Vestido de Verano",
          price: 39.99,
          description: "Vestido ligero y fresco para el verano.",
        },
        {
          image:
            "../img/productos/women/silk-blouse-women.png",
          name: "Blusa de Seda",
          price: 29.99,
          description: "Blusa suave y elegante, perfecta para el trabajo.",
        },
        {
          image:
            "../img/productos/women/silk-pants-women.png",
          name: "Pantalones de Tela",
          price: 49.99,
          description: "Pantalones cómodos y versátiles.",
        },
        {
          image:
            "../img/productos/women/elegant-sandals-women.png",
          name: "Sandalias Elegantes",
          price: 25.99,
          description: "Sandalias modernas para cualquier ocasión.",
        },
        {
          image:
            "../img/productos/women/jean-jacket-women.png",
          name: "Chaqueta de Jean",
          price: 55.99,
          description: "Chaqueta casual para un look relajado.",
        },
      ],
    },
    {
      category: "niños",
      items: [
        {
          image:
            "../img/productos/kids/funny-t-shirt-kids.png",
          name: "Camiseta Divertida",
          price: 15.99,
          description: "Camiseta con diseño colorido para niños.",
        },
        {
          image:
            "../img/productos/kids/jeans-kids.png",
          name: "Jeans para Niños",
          price: 20.99,
          description: "Jeans resistentes y cómodos para juegos.",
        },
        {
          image:
            "../img/productos/kids/sneakers-kids.png",
          name: "Zapatillas Deportivas",
          price: 35.99,
          description: "Zapatillas cómodas y ligeras para niños activos.",
        },
        {
          image:
            "../img/productos/kids/warm-jacket-kids.png",
          name: "Chaqueta Abrigadora",
          price: 45.99,
          description: "Chaqueta que protege del frío y viento.",
        },
        {
          image:
            "../img/productos/kids/funny-hat-kids.png",
          name: "Gorro Divertido",
          price: 10.99,
          description: "Gorro con personajes favoritos para los pequeños.",
        },
      ],
    },
  ],
};

// Cargar datos
document.addEventListener("DOMContentLoaded", function () {
  // obtenemos el contenedor para cada categoría
  const productosContainer = document.getElementById("productos-container");

  // recorremos cada categoría
  data.products.forEach((category) => {
    // Crear un contenedor para la categoría
    const categoryContainer = document.createElement("div");
    categoryContainer.classList.add("category-container");

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
      image.classList.add("card-img-top");
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
      addToBag.innerHTML = `Agregar a la bolsa <i class="fa fa-cart-shopping"></i>`;

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
});
