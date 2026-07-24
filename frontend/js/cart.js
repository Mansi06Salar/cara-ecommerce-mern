const CART_API_URL = "http://localhost:5000/api/cart";


// ========================================
// GET AUTH TOKEN
// ========================================

function getAuthToken() {
    return localStorage.getItem("token");
}


// ========================================
// ADD PRODUCT TO CART
// ========================================

async function addToCart(productId, quantity, size) {

    const token = getAuthToken();

    // User must be logged in
    if (!token) {

        alert("Please login before adding products to your cart.");

        window.location.href = "login.html";

        return false;
    }


    try {

        const response = await fetch(
            `${CART_API_URL}/add`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },

                body: JSON.stringify({
                    productId,
                    quantity,
                    size
                })
            }
        );


        const data = await response.json();


        // Invalid/expired login
        if (response.status === 401) {

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            alert("Your login session has expired. Please login again.");

            window.location.href = "login.html";

            return false;
        }


        if (!response.ok) {

            alert(
                data.message ||
                "Unable to add product to cart."
            );

            return false;
        }


        alert("Product added to cart!");

        return true;


    } catch (error) {

        console.error(
            "Add to cart error:",
            error
        );

        alert(
            "Unable to connect to the server."
        );

        return false;
    }
}