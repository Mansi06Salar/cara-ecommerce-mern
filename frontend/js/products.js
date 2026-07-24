const PRODUCTS_API_URL = "http://localhost:5000/api/products";

async function loadProducts() {
    const container = document.getElementById("products-container");

    if (!container) {
        return;
    }

    try {
        const response = await fetch(PRODUCTS_API_URL);

        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }

        const products = await response.json();

        container.innerHTML = "";

        products.forEach((product) => {
            const productCard = document.createElement("div");

            productCard.className = "pro";

            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">

                <div class="des">
                    <span>${product.category}</span>
                    <h5>${product.name}</h5>
                    <h4>$${product.price}</h4>
                </div>

                <a href="#" class="cart-link">
                    <i class="fal fa-shopping-cart cart"></i>
                </a>
            `;

            productCard.addEventListener("click", () => {
                window.location.href =
                    `Single_product.html?id=${product._id}`;
            });

            const cartButton =
                productCard.querySelector(".cart-link");

            cartButton.addEventListener("click", (event) => {
                event.preventDefault();
                event.stopPropagation();

                alert("Cart functionality will be connected next.");
            });

            container.appendChild(productCard);
        });

    } catch (error) {
        console.error("Error loading products:", error);

        container.innerHTML = `
            <p>Unable to load products. Please try again later.</p>
        `;
    }
}

document.addEventListener("DOMContentLoaded", loadProducts);