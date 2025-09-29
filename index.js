/* ===============================
   script.js - Online Grocery Store
================================= */
document.addEventListener("DOMContentLoaded", () => {
    const cart = [];
    const cartItems = document.getElementById("cart-items");
    const checkoutButton = document.getElementById("checkout-button");

    /* ===============================
       Add to Cart Functionality
    ============================== */
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", () => {
            const product = button.parentElement;
            const name = product.dataset.name;
            const price = parseFloat(product.dataset.price);

            // Check if item already exists
            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name, price, quantity: 1 });
            }
            updateCart();
        });
    });

    /* ===============================
       Update Cart UI
    ============================== */
    function updateCart() {
        cartItems.innerHTML = "";

        if (cart.length === 0) {
            cartItems.innerHTML = "<li>Your cart is empty 🛒</li>";
            return;
        }

        cart.forEach((item, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <strong>${item.name}</strong> - $${item.price.toFixed(2)} × ${item.quantity} 
                <button class="remove-btn" data-index="${index}">❌</button>
            `;
            cartItems.appendChild(li);
        });

        // Attach event listeners to remove buttons
        document.querySelectorAll(".remove-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const index = btn.dataset.index;
                removeItem(index);
            });
        });
    }

    /* ===============================
       Remove Item from Cart
    ============================== */
    function removeItem(index) {
        cart.splice(index, 1);
        updateCart();
    }

    /* ===============================
       Checkout Button
    ============================== */
    checkoutButton.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Your cart is empty! 🛒");
            return;
        }

        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        alert(`✅ Checkout Successful!\n\nTotal Price: $${total.toFixed(2)}\nThank you for shopping with us!`);

        // Clear cart after checkout
        cart.length = 0;
        updateCart();
    });

    // Initialize cart with empty state
    updateCart();
});
