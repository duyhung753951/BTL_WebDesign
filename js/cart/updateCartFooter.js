// updateCartFooter.js

function updateCartFooter() {
    const cartTableBody = document.querySelector('.cart-table tbody');
    const totalSum = document.querySelector('.subtotal-amount'); // Select subtotal element in footer
    const productRows = document.querySelectorAll('.cart-row'); // Get all product rows
    
    // Check if there are product rows (skip the first one)
    if (productRows.length <= 1) {
        subtotalElement.textContent = '0 ₫'; // Set subtotal to 0 if no products are available
        cartTableBody.innerHTML = 'Please navigate to our <a href="index.html" style="color:red; font-weight:bold;">Store Page</a> and choose some products.';
    } else {
        // Calculate the total price from the product totals
        let totalPrice = 0;

        // Loop through the product rows (skipping the first one)
        productRows.forEach((row, index) => {
            if (index === 0) return; // Skip the first row
            
            const subSum = row.querySelector('.product-total'); // Get the product total element
            console.log("Sub-total: " + subSum.textContent + "\n"); // Print the original content
        
            if (subSum) {
                // Clean up the total value, removing '₫' and any commas
                const totalValue = parseFloat(subSum.textContent.replace('₫', '').replace(/,/g, '').trim()); 
                console.log("Sub-total (cleaned): " + totalValue + "\n"); // Print the cleaned value
                
                // Check if totalValue is a number and add to totalPrice
                if (!isNaN(totalValue)) {
                    totalPrice += totalValue; 
                }
            }
        });        

        // Update the subtotal amount
        if (totalSum) {
            totalSum.textContent = `${totalPrice.toLocaleString()} ₫`;
        }
    }
    console.log('Cart footer updated.');
}

// Optional: Add event listeners if there are actions related to the footer
document.addEventListener('DOMContentLoaded', () => {
    // Initial footer update on page load
    updateCartFooter();
});
