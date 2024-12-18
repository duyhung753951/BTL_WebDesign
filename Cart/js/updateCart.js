// Function to update cart HTML
function updateCart() {
    const cartTableBody = document.querySelector('.cart-table tbody');
    // Check if cartTableBody exists (i.e., if we're on cart.html)
    if (!cartTableBody) {
        console.log("ElementNotFound.");
        return; // Exit the function if cart table doesn't exist
    }

    const cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || []; // Load cart items from sessionStorage

    // Clear existing content
    cartTableBody.innerHTML = '';

    // Check if cart is empty
    if (cartItems.length === 0) {
        cartTableBody.innerHTML = 'Your cart is empty. <br>Please navigate to our <a href="../index.html" style="color:red; font-weight:bold;">Store Page</a> and choose some products.';
    } else {
        // Append each item to cart table
        cartItems.forEach(item => {
            const smalL_pattern = /\(([^)]+)\)/;
            const smal_detail = item.name.match(smalL_pattern);
            
            // Handle case where there is no match
            const smallText = smal_detail ? smal_detail[1] : ''; 

            // Escape HTML to prevent XSS
            const escapedName = item.name.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            const escapedImage = item.image.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

            const productHTML = `
                <tr class="cart-row">
                    <td data-label="Sản phẩm">
                        <a href="" class="cart__image">
                            <img class="preview-img" src="${escapedImage}" alt="${escapedName}">
                        </a>
                    </td>
                    <td>
                        <a href="" class="product-name">${escapedName}</a>
                        <small>${smallText}</small>
                        <p>Hãng Đĩa Thời Đại</p>
                        <button type="button" class="cart-remove-btn" data-id="${item.id}" onclick="removeFromCart(event, '${escapedName}')">
                            Xóa
                        </button>
                    </td>
                    <td data-label="Giá">
                        <span class="product-price">${item.price.toLocaleString()}₫</span>
                    </td>
                    <td data-label="Số lượng">
                        <div class="quantity-selector">
                            <button type="button" class="quantity-adjust-btn js-qty__adjust--minus" data-id="${item.id}">
                                <span class="icon icon-minus" aria-hidden="true"></span>
                                <span class="fallback-text">−</span>
                            </button>
                            <input type="text" class="num-qty" value="${item.quantity}" min="1" data-id="${item.id}" aria-label="quantity" pattern="[0-9]*" name="updates[]">
                            <button type="button" class="quantity-adjust-btn js-qty__adjust--plus" data-id="${item.id}">
                                <span class="icon icon-plus" aria-hidden="true"></span>
                                <span class="fallback-text">+</span>
                            </button>
                        </div>
                    </td>
                    <td data-label="Tổng" class="text-right">
                        <span class="product-total">${(item.price * item.quantity).toLocaleString()}₫</span>
                    </td>
                </tr>
            `;
            
            // Append each product's HTML to the cartTableBody
            cartTableBody.insertAdjacentHTML('beforeend', productHTML);
        });
    }

    // Trigger updateCartFooter() after cart-rows are filled.
    updateCartFooter();
}

// Call updateCart when the page loads
document.addEventListener('DOMContentLoaded', () => {
    updateCart();
    
    // Optional: Add event listeners if items or quantities change
    document.body.addEventListener('click', event => {
        if (event.target.matches('.cart-remove-btn')) {
            // handle item removal and update the cart accordingly
            removeFromCart(event, event.target.closest('.cart-row').querySelector('.product-name').textContent);
        }
    });
});
