// updateCartFooter.js

function updateCartFooter() {
    const cartTableBody = document.querySelector('.cart-table tbody');
    const subtotalElement = document.querySelector('.subtotal-amount'); // Select subtotal element in footer
    const cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];

    // Check if the cart is empty
    if (cartItems.length === 0) {
        subtotalElement.textContent = '0 ₫'; // Set subtotal to 0 if the cart is empty
        cartTableBody.innerHTML = 'Please navigate to our <a href="index.html" style="color:red; font-weight:bold;">Store Page</a> and choose some products.';
    } else {
        // Calculate the total price
        const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

        // Update the subtotal amount
        if (subtotalElement) {
            subtotalElement.textContent = `${totalPrice.toLocaleString()} ₫`;
        }
    }
    console.log('Cart footer updated.');
}

// Optional: Add event listeners if there are actions related to the footer
document.addEventListener('DOMContentLoaded', () => {
    // Initial footer update on page load
    updateCartFooter();
});
