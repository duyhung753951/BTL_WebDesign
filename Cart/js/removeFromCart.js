function removeFromCart(event, productName) {
    event.preventDefault(); // Prevent the default link behavior

    // Remove the product from the HTML
    const productRow = event.target.closest('.cart-row');
    if (productRow) {
        productRow.remove(); // Remove the row from the DOM
        console.log("We deleted the product!");
    }
    console.log("We're currently here!");
    // Update the cart items in session storage
    let cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];

    // Filter out the item with the matching productName
    if (productName) { // Check if productName is defined
        cartItems = cartItems.filter(item => item.name !== productName);
    }

    sessionStorage.setItem('cartItems', JSON.stringify(cartItems)); // Update session storage
    // Optionally update the cart footer or show a message
    updateCartFooter(); // Call this function to recalculate and update the total amount
}
