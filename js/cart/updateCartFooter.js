// updateCartFooter.js

function updateCartFooter() {
    const subtotalElement = document.querySelector('.subtotal-amount'); // Select subtotal element in footer
    const cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
    
    // Calculate the total price
    let totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // Update the subtotal amount
    if (subtotalElement) {
        subtotalElement.textContent = `${totalPrice.toLocaleString()} ₫`;
    }
    
    console.log('Cart footer updated.');
}

// Optional: Add event listeners if there are actions related to the footer
document.addEventListener('DOMContentLoaded', () => {
    // Initial footer update on page load
    updateCartFooter();
});
