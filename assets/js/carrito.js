document.addEventListener("DOMContentLoaded", function () {
  let cartCount = 0; // Contador del carrito
  const cart = []; // Lista de productos en el carrito

  const productosContainer = document.getElementById("productos-container");
  const cartCounter = document.querySelector("#cart-counter");
  const cartIcon = document.querySelector(".fa-bag-shopping").parentElement;

  // Agregar productos al carrito
  productosContainer.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (button) {
      const card = button.closest(".card");
      const productImage = card.querySelector(".card-image").src;
      const productName = card.querySelector(".card-title").textContent;
      const productPrice = parseFloat(
        card.querySelector(".card-price").textContent.replace("$", "")
      );

      // Actualizar carrito
      const existingProduct = cart.find((item) => item.name === productName);
      if (existingProduct) {
        existingProduct.quantity++;
        existingProduct.totalPrice =
          existingProduct.price * existingProduct.quantity;
      } else {
        cart.push({
            image : productImage,
            name: productName,
            price: productPrice,
            quantity: 1,
            totalPrice: productPrice,
        });
      }
      cartCount++;
      cartCounter.textContent = cartCount;
    }
  });

  // Mostrar vista previa del carrito
  cartIcon.addEventListener("click", (e) => {
    e.preventDefault();

    const updateCartPreview = () => {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = cart.length
        ? cart
            .map((item) =>
                `<li>
                    <span>${item.name} - $${item.price.toFixed(2)} x ${item.quantity} = $${item.totalPrice.toFixed(2)}</span>
                                <div class="quantity-controls">
                                    <button class="btn btn-sm btn-success increase" data-name="${
                                        item.name
                                    }">+</button>
                                    <button class="btn btn-sm btn-danger decrease" data-name="${
                                        item.name
                                    }">-</button>
                                </div>
                </li>`
            )
            .join("")
        : "<li>El carrito está vacío</li>";

      // Asignar eventos para los botones
    cartItems.querySelectorAll(".increase").forEach((button) =>
        button.addEventListener("click", () => {
        const product = cart.find(
            (item) => item.name === button.dataset.name
          );
          if (product) {
            product.quantity++;
            product.totalPrice = product.price * product.quantity;
            cartCount++;
            cartCounter.textContent = cartCount;
            updateCartPreview();
          }
        })
      );
      cartItems.querySelectorAll(".decrease").forEach((button) =>
        button.addEventListener("click", () => {
          const product = cart.find(
            (item) => item.name === button.dataset.name
          );
          if (product) {
            if (product.quantity > 1) {
              product.quantity--;
              product.totalPrice = product.price * product.quantity;
              cartCount--;
            } else {
              // Eliminar producto del carrito si la cantidad es 0
              const index = cart.indexOf(product);
              if (index > -1) cart.splice(index, 1);
              cartCount--;
            }
            cartCounter.textContent = cartCount;
            updateCartPreview();
          }
        })
      );
    };

    // Si ya existe un modal, lo eliminamos para evitar duplicados
    const existingPreview = document.getElementById("cart-preview");
    if (existingPreview) existingPreview.remove();

    // Crear nueva vista previa
    const cartPreview = document.createElement("div");
    cartPreview.id = "cart-preview";
    cartPreview.innerHTML = `
            <div class="preview-overlay">
                <div class="preview-content">
                    <h4>Tu carrito</h4>
                    <ul id="cart-items"></ul>
                    <div class="actions">
                        <button id="close-preview" class="btn btn-secondary">Cerrar</button>
                        <a href="carrito.html" id="go-to-cart" class="btn btn-primary">Ir al carrito</a>
                    </div>
                </div>
            </div>
        `;
    document.body.appendChild(cartPreview);

    // Actualizar contenido y asignar eventos
    updateCartPreview();

    // Guardar carrito en localStorage al ir al carrito
    document.getElementById("go-to-cart").addEventListener("click", () => {
      localStorage.setItem("cart", JSON.stringify(cart));
    });

    // Evento para cerrar el modal
    document.getElementById("close-preview").addEventListener("click", () => {
      const modal = document.getElementById("cart-preview");
      if (modal) modal.remove();
    });
  });
});

/* Lógica del carrito html*/
document.addEventListener("DOMContentLoaded", function () {
  const cartList = document.getElementById("cart-list");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const subtotalElement = document.getElementById("subtotal");
  const totalItemsElement = document.getElementById("total-items");

  function updateSummary() {
    let subtotal = 0;
    let totalItems = 0;

    cart.forEach((item) => {
      subtotal += item.totalPrice;
      totalItems += item.quantity;
    });

    subtotalElement.textContent = `Subtotal: $${subtotal.toFixed(2)}`;
    totalItemsElement.textContent = `Total de productos: ${totalItems}`;
  }

  if (cart.length > 0) {
    cart.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
                <div>
                    <img src="${item.image}" alt="${item.name}"/>
                    <strong>${item.name}</strong>
                </div>
                <div class="quantity-controls">
                    <button class="decrease" data-name="${item.name}">-</button>
                    <span>${item.quantity}</span>
                    <button class="increase" data-name="${item.name}">+</button>
                </div>
                <strong>$${item.totalPrice.toFixed(2)}</strong>
            `;
      cartList.appendChild(listItem);
    });

    updateSummary();

    cartList.addEventListener("click", (event) => {
      const button = event.target.closest("button");
      if (button) {
        const productName = button.dataset.name;
        const product = cart.find((item) => item.name === productName);

        if (button.classList.contains("increase")) {
          product.quantity++;
          product.totalPrice = product.price * product.quantity;
        } else if (button.classList.contains("decrease")) {
          if (product.quantity > 1) {
            product.quantity--;
            product.totalPrice = product.price * product.quantity;
          } else {
            const index = cart.indexOf(product);
            if (index > -1) cart.splice(index, 1);
          }
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        cartList.innerHTML = "";
        cart.forEach((item) => {
          const listItem = document.createElement("li");
          listItem.innerHTML = `
                        <div>
                            <img src="${item.image}" alt="${item.name}"/>
                            <strong>${item.name}</strong>
                        </div>
                        <div class="quantity-controls">
                            <button class="decrease" data-name="${
                              item.name
                            }">-</button>
                            <span>${item.quantity}</span>
                            <button class="increase" data-name="${
                              item.name
                            }">+</button>
                        </div>
                        <strong>$${item.totalPrice.toFixed(2)}</strong>
                    `;
          cartList.appendChild(listItem);
        });

        updateSummary();
      }
    });
  } else {
    cartList.innerHTML = "<li>El carrito está vacío</li>";
  }
});
