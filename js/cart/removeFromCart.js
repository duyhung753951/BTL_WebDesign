function removeFromCart(event, productName) {
    event.preventDefault(); // Prevent the default link behavior
    
    // Remove the product from the HTML
    const productRow = event.target.closest('.cart-row');
    console.log("we reached here!");
    if (productRow) {
        productRow.remove(); // Remove the row from the DOM
        console.log("we deleted the product!")
    }

    // Update the cart items in local storage
    let cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
    cartItems = cartItems.filter(item => item.id !== productName); // Filter out the item with the matching ID
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems)); // Update local storage
    
    // Optionally update the cart footer or show a message
    updateCartFooter(); // Call this function to recalculate and update the total amount
}

