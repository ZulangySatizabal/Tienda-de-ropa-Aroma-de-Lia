// datos de los productos
const data = {
  products: [
    {
      category: "men",
      items: [
        {
          image: "https://example.com/images/men_shirt.jpg",
          name: "Camisa Casual",
          price: 25.99,
          description: "Camisa de algodón para ocasiones informales.",
        },
        {
          image: "https://example.com/images/men_jacket.jpg",
          name: "Chaqueta de Cuero",
          price: 89.99,
          description: "Chaqueta resistente y estilosa, ideal para invierno.",
        },
        {
          image: "https://example.com/images/men_jeans.jpg",
          name: "Jeans Ajustados",
          price: 45.99,
          description: "Jeans modernos con un ajuste perfecto.",
        },
        {
          image: "https://example.com/images/men_shoes.jpg",
          name: "Zapatos Deportivos",
          price: 69.99,
          description: "Zapatos cómodos para el día a día.",
        },
        {
          image: "https://example.com/images/men_sweater.jpg",
          name: "Suéter de Lana",
          price: 35.99,
          description: "Suéter cálido para los días fríos.",
        },
      ],
    },
    {
      category: "women",
      items: [
        {
          image: "https://example.com/images/women_dress.jpg",
          name: "Vestido de Verano",
          price: 39.99,
          description: "Vestido ligero y fresco para el verano.",
        },
        {
          image: "https://example.com/images/women_blouse.jpg",
          name: "Blusa de Seda",
          price: 29.99,
          description: "Blusa suave y elegante, perfecta para el trabajo.",
        },
        {
          image: "https://example.com/images/women_pants.jpg",
          name: "Pantalones de Tela",
          price: 49.99,
          description: "Pantalones cómodos y versátiles.",
        },
        {
          image: "https://example.com/images/women_sandals.jpg",
          name: "Sandalias Elegantes",
          price: 25.99,
          description: "Sandalias modernas para cualquier ocasión.",
        },
        {
          image: "https://example.com/images/women_jacket.jpg",
          name: "Chaqueta de Jean",
          price: 55.99,
          description: "Chaqueta casual para un look relajado.",
        },
      ],
    },
    {
      category: "kids",
      items: [
        {
          image: "https://example.com/images/kids_shirt.jpg",
          name: "Camiseta Divertida",
          price: 15.99,
          description: "Camiseta con diseño colorido para niños.",
        },
        {
          image: "https://example.com/images/kids_jeans.jpg",
          name: "Jeans para Niños",
          price: 20.99,
          description: "Jeans resistentes y cómodos para juegos.",
        },
        {
          image: "https://example.com/images/kids_shoes.jpg",
          name: "Zapatillas Deportivas",
          price: 35.99,
          description: "Zapatillas cómodas y ligeras para niños activos.",
        },
        {
          image: "https://example.com/images/kids_jacket.jpg",
          name: "Chaqueta Abrigadora",
          price: 45.99,
          description: "Chaqueta que protege del frío y viento.",
        },
        {
          image: "https://example.com/images/kids_hat.jpg",
          name: "Gorro Divertido",
          price: 10.99,
          description: "Gorro con personajes favoritos para los pequeños.",
        },
      ],
    },
  ],
};

// Cargar datos

// obtenemos el contenedor para cada categoría
const productosContainer = document.getElementById("productos-container");

// recorremos cada categoría
data.products.forEach((category) => {

  // Crear un contenedor para la categoría
  const categoryContainer = document.createElement("div");
  categoryContainer.classList.add("category-container");

  // creamos y asignamos el titulo de la categoría
  const categoryTitle = document.createElement("h2");
  /* al primer carácter del titulo de la categoría se pondrá en mayúscula y después tomara el resto de caracteres del titulo. Así, cada nombre de categoría se formatea con la primera letra en mayúscula. */
  categoryTitle.textContent =
    category.category.charAt(0).toUpperCase() + category.category.slice(1);

  categoryContainer.appendChild(categoryTitle);

  // Crear un contenedor de tarjetas específico para cada categoría
  const cardContainer = document.createElement("div");
  cardContainer.classList.add("row", "row-cols-1", "row-cols-md-3", "g-4");

  // Agregar las tarjetas de producto de la categoría actual
  category.items.forEach((product) => {
    // obtenemos el contenedor de las card
    // const cardContainer = document.getElementById("card-template");

    // Crear el contenido de la tarjeta usando `innerHTML`
    cardContainer.innerHTML += `
                <div class="col">
                    <div class="card h-100 card-product">
                        <figure>
                            <img src=${product.image} class="card-img-top" alt="${product.name}">
                        </figure>
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <span class="card-price"><strong>$${product.price}</strong></span>
                            <p class="card-text">
                                ${product.description}
                            </p>
                        </div>
                        <div class="card-footer">
                            <button id="cart-shopping" type="button" class="card-button btn btn-outline-dark">
                                Comprar
                                <i class="fa fa-cart-shopping"></i>
                            </button>
                        </div>
                    </div>
                </div>
        `
  });
  // Agregar el contenedor de tarjetas al contenedor de la categoría
  categoryContainer.appendChild(cardContainer);

  // Agregar el contenedor de la categoría al contenedor principal
  productosContainer.appendChild(categoryContainer);
});
