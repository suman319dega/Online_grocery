/* script.js */
document.addEventListener("DOMContentLoaded", () => {
    const cart = [];
    const cartItems = document.getElementById("cart-items");
    
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", () => {
            const product = button.parentElement;
            const name = product.dataset.name;
            const price = parseFloat(product.dataset.price);
            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name, price, quantity: 1 });
            }
            updateCart();
        });
    });
    
    function updateCart() {
        cartItems.innerHTML = "";
        cart.forEach((item, index) => {
            const li = document.createElement("li");
            li.innerHTML = `${item.name} - $${item.price} x ${item.quantity} 
                <button onclick="removeItem(${index})">Remove</button>`;
            cartItems.appendChild(li);
        });
    }
    
    window.removeItem = (index) => {
        cart.splice(index, 1);
        updateCart();
    };

    document.getElementById("buy-button").addEventListener("click", () => {
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        alert(`Total Price: $${total.toFixed(2)}`);
    });
});
