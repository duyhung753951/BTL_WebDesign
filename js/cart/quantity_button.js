document.addEventListener("DOMContentLoaded", () => {
    const quantityAdjustButtons = document.querySelectorAll('.quantity-adjust-btn');

    quantityAdjustButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const buttonType = event.target.closest('button').classList.contains('js-qty__adjust--minus') ? 'minus' : 'plus';
            const dataId = event.target.closest('button').getAttribute('data-id');
            const qtyInput = document.querySelector(`input[data-id="${dataId}"]`);
            let quantity = parseInt(qtyInput.value);

            if (buttonType === 'plus') {
                quantity += 1;
            } else if (buttonType === 'minus') {
                quantity -= 1;
            }

            // Update quantity in input field
            qtyInput.value = quantity;

            // Check if quantity is zero
            if (quantity <= 0) {
                const form = qtyInput.closest('form'); // Find the closest form element
                form.style.display = 'none'; // Hide the form
                const message = document.createElement('p'); // Create a new paragraph
                message.innerHTML = 'Please navigate to our <a href="index.html" style="color:red; font-weight:bold;">Home Page</a> and choose some products.'; // Add message
                form.parentNode.insertBefore(message, form); // Insert message before form
            }
        });
    });
});
