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
            const productName = card.querySelector(".card-title").textContent;
            const productPrice = parseFloat(
                card.querySelector(".card-price").textContent.replace("$", "")
            );

            // Actualizar carrito
            const existingProduct = cart.find((item) => item.name === productName);
            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                cart.push({ name: productName, price: productPrice, quantity: 1 });
            }
            cartCount++;
            cartCounter.textContent = cartCount;
        }
    });

  // Mostrar vista previa del carrito
    cartIcon.addEventListener("click", (e) => {
        e.preventDefault();

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
                    <ul id="cart-items">
                        ${
                            cart.length > 0
                                ? cart
                                        .map(
                                            (item) =>
                                                `<li>
                                                    <span>${item.name} - $${item.price.toFixed(2)} x ${item.quantity}</span>
                                                    <div class="quantity-controls">
                                                        <button class="btn btn-sm btn-success increase" data-name="${item.name}">+</button>
                                                        <button class="btn btn-sm btn-danger decrease" data-name="${item.name}">-</button>
                                                    </div>
                                                </li>`
                                        )
                                        .join("")
                                : "<li>El carrito está vacío</li>"
                        }
                    </ul>
                    <div class="actions">
                        <button id="close-preview" class="btn btn-secondary">Cerrar</button>
                        <a href="#" class="btn btn-primary">Ir al carrito</a>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(cartPreview);

        // Evento para cerrar el modal
        document.getElementById("close-preview").addEventListener("click", () => {
            const modal = document.getElementById("cart-preview");
            if (modal) modal.remove();
        });

        // Manejar aumento y disminución de cantidad
        const cartItems = document.getElementById("cart-items");
        cartItems.addEventListener("click", (event) => {
            const button = event.target.closest("button");
            if (button) {
                const productName = button.dataset.name;
                const product = cart.find((item) => item.name === productName);

                if (button.classList.contains("increase")) {
                    product.quantity++;
                    cartCount++;
                } else if (button.classList.contains("decrease")) {
                    if (product.quantity > 1) {
                        product.quantity--;
                        cartCount--;
                    } else {
                        // Eliminar el producto si la cantidad llega a 0
                        const index = cart.indexOf(product);
                        if (index > -1) cart.splice(index, 1);
                        cartCount--;
                    }
                }

                // Actualizar vista previa y contador
                cartCounter.textContent = cartCount;
                updateCartPreview();
            }
        });
    });

  // Función para actualizar la vista previa del carrito
    function updateCartPreview() {
        const cartItems = document.getElementById("cart-items");
        cartItems.innerHTML = cart.length
            ? cart
                    .map(
                        (item) =>
                            `<li>
                                <span>${item.name} - $${item.price.toFixed(2)} x ${item.quantity}</span>
                                <div class="quantity-controls">
                                    <button class="btn btn-sm btn-success increase" data-name="${item.name}">+</button>
                                    <button class="btn btn-sm btn-danger decrease" data-name="${item.name}">-</button>
                                </div>
                            </li>`
                    )
                    .join("")
            : "<li>El carrito está vacío</li>";
    }
});
