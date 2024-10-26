document.addEventListener("DOMContentLoaded", () => {
    const cartTableBody = document.querySelector('tbody'); // Assuming your buttons are inside a <tbody>
    
    cartTableBody.addEventListener('click', (event) => {
        console.log("Just clicked on sth.");
        
        // Check if the clicked element is a quantity adjust button by using closest
        const button = event.target.closest('.quantity-adjust-btn');
        if (button) {
            console.log("that thing is one of the icons.");
            
            // Determine the type of button clicked (plus or minus)
            const buttonType = button.classList.contains('js-qty__adjust--minus') ? 'minus' : 'plus';
            const productRow = button.closest('.cart-row');
            const productName = productRow.querySelector('.product-name').textContent; // Get the product name
            const qtyInput = productRow.querySelector(`.num-qty`);
            let quantity = parseInt(qtyInput.value);

            // Adjust quantity based on button type
            if (buttonType === 'plus') {
                quantity += 1;
            } else if (buttonType === 'minus') {
                quantity -= 1;
            }

            // Update quantity in input field
            qtyInput.value = quantity;

            // Remove product if quantity is zero or below, using the product name
            if (quantity <= 0) {
                removeFromCart(event, productName); // Call removeFromCart with productName
            }
        }
    });
});
