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
        cart.push({ name: productName, price: productPrice });
        cartCount++;
        cartCounter.textContent = cartCount;
        }
    });

  // Mostrar vista previa del carrito
    cartIcon.addEventListener("click", (e) => {
        e.preventDefault();

        // Eliminar vista previa previa si existe
        const existingPreview = document.getElementById("cart-preview");
        if (existingPreview) existingPreview.remove();

        // Crear nueva vista previa
        const cartPreview = document.createElement("div");
        cartPreview.id = "cart-preview";
        cartPreview.innerHTML = `
                <div class="preview-content">
                    <ul>
                        ${cart.length > 0 ? cart .map((item) =>
                            `<li>${item.name} - $${item.price.toFixed(2)}</li>`
                            ).join("") : "<li>La bolsa está vacía</li>"
                        }
                    </ul>
                    <div>
                        <button id="close-preview" class="btn btn-secondary">Cerrar</button>
                        <a href="shooping-bag.html" class="btn btn-primary">Ir a la bolsa de compras</a>
                    </div>
                </div>
            `;
        document.body.appendChild(cartPreview);

        // Evento para cerrar la vista previa
        document.getElementById("close-preview").addEventListener("click", () => {
            cartPreview.remove();
        });
    });
});
