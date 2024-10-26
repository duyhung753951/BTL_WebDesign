// Function to update product prices and the total in the cart
function updatePrice() {
    const productRows = document.querySelectorAll('.cart-row'); // Get all product rows

    // Skip the first element (index 0) and iterate through the rest
    productRows.forEach((row, index) => {
        if (index === 0) return; // Skip the first row

        const priceElement = row.querySelector('.product-price');
        const qtyInput = row.querySelector('.num-qty');

        // Check if priceElement and qtyInput exist
        if (priceElement && qtyInput) {
            // Collect price and quantity
            const price = parseFloat(priceElement.textContent.replace('₫', '').replace(/\./g, '').trim()); // Clean up the price
            const quantity = parseInt(qtyInput.value) || 0; // Default to 0 if qtyInput is empty

            // Calculate the total for this product
            const total = price * quantity;

            // Update the total in the product row
            const totalElement = row.querySelector('.product-total');
            if (totalElement) {
                totalElement.textContent = `${total.toLocaleString()}₫`; // Update total display
            }
        } else {
            // Log a message if priceElement or qtyInput is missing
            console.warn('Missing price or quantity input in row:', row);
        }
    });

    // After updating all totals, call the existing function to update the footer
    updateCartFooter();
}

// Add event listener to update cart button when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    const updateCartButton = document.querySelector('.update-cart-btn'); // Get the update button
    // Listen for click on the update button
    if (updateCartButton) {
        updateCartButton.addEventListener('click', (event) => {
            updatePrice(); // Call updatePrice when the button is clicked
        });
    }
});
