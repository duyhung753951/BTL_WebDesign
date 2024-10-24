// Function to update cart HTML
function updateCart() {
    const cartTableBody = document.querySelector('.cart-table tbody');
    
    // Check if cartTableBody exists (i.e., if we're on cart.html)
    if (!cartTableBody) {
        console.log("ElementNotFound.");
        return; // Exit the function if cart table doesn't exist
    }

    const cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || []; // Load cart items from localStorage
    cartTableBody.innerHTML = ''; // Clear existing content

    if (cartItems.length === 0) {
        cartTableBody.innerHTML = '<tr><td colspan="5">Cart is empty.</td></tr>';
        return;
    }

    cartItems.forEach(item => {
        const smalL_pattern = /\(([^)]+)\)/;
        const smal_detail = item.name.match(smalL_pattern);
        
        // Handle case where there is no match
        const smallText = smal_detail ? smal_detail[1] : ''; // smal_detail[0] gets the first match
        
        const productHTML = `
            <tr class="cart-row">
                <td data-label="Sản phẩm">
                    <a href="" class="cart__image">
                        <img src="${item.image}" alt="${item.name}">
                    </a>
                </td>
                <td>
                    <a href="" class="product-name">${item.name}</a>
                    <br><br><br>
                    <small>${smallText}</small>
                    <p>Hãng Đĩa Thời Đại</p>
                    <a href="/cart/change?line=${item.id}&amp;quantity=0" class="cart-remove-btn">
                        <small>Xóa</small>
                    </a>
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
        
        cartTableBody.innerHTML += productHTML; // Append new product HTML to the table body
    });    
}

// Call updateCart when the page loads
document.addEventListener('DOMContentLoaded', updateCart);
