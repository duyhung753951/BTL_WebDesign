// updateCartFooter.js
function updateCartFooter() {
    const cartTableBody = document.querySelector('.cart-table tbody');
    const totalSum = document.querySelector('.subtotal-amount'); // Select subtotal element in footer
    const productRows = document.querySelectorAll('.cart-row'); // Get all product rows
    
    // Check if there are product rows (skip the first one)
    if (productRows.length <= 1) {
        totalSum.textContent = '0 ₫'; // Set subtotal to 0 if no products are available
        cartTableBody.innerHTML = 'Your cart is empty. <br>Please navigate to our <a href="index.html" style="color:red; font-weight:bold;">Store Page</a> and choose some products.';
    } else {
        // Calculate the total price from the product totals
        let totalPrice = 0;

        // Loop through the product rows (skipping the first one)
        productRows.forEach((row, index) => {
            if (index === 0) return; // Skip the first row
            
            const subSum = row.querySelector('.product-total'); // Get the product total element
            if (subSum) {
                // Clean up the total value, removing '₫' and any commas
                const totalValue = parseFloat(subSum.textContent.replace('₫', '').replace(/,/g, '').trim()); 
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
    updateSessionStorage();
};

function updateSessionStorage() {
    const productRows = Array.from(document.querySelectorAll('.cart-row')).slice(1); // Skip the first row
    let updatedCartItems = [];
    console.log(productRows.length);
    productRows.forEach(row => {
        // Retrieve the product name and quantity for each row
        const productName = row.querySelector('.product-name')?.textContent;
        const qtyInput = row.querySelector('.num-qty');
        const quantity = parseInt(qtyInput?.value);

        if (quantity > 0) {
            // Retrieve product price and image as necessary
            const price = row.querySelector('.product-price')?.textContent.replace('₫', '').replace(/,/g, '').trim();
            const image = row.querySelector('.preview-img')?.src;
            if (!image) console.log("No Image Found.");
            if (price && productName && image) {
                // Push updated product information to array
                console.log("we reached here.");
                updatedCartItems.push({
                    name: productName,
                    price: price,
                    image: image,
                    quantity: quantity
                });
            }
        }
    });
    // Update sessionStorage with new cart items array
    sessionStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    storageChecker = JSON.parse(sessionStorage.getItem('cartItems'));
    console.log('sessionStorage contents : ', storageChecker);
    console.log('SessionStorage has been updated with current cart quantities and details.');
};

// Optional: Add event listeners if there are actions related to the footer
document.addEventListener('DOMContentLoaded', () => {
    // Initial footer update on page load
    updateCartFooter();
});
