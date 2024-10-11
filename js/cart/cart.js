// cart.js

// Array to hold cart items
let cartItems = [];

// Function to add item to the cart
function addToCart(item) {
    cartItems.push(item);
    updateCartDisplay();
}

// Function to update the cart display
function updateCartDisplay() {
    const cartTableBody = document.querySelector('.cart-table tbody'); // Select the tbody element
    cartTableBody.innerHTML = ''; // Clear existing items

    let total = 0; // To calculate total price

    // Loop through each item in the cart
    cartItems.forEach((item, index) => {
        const row = document.createElement('tr');
        row.className = 'cart-row';

        // Create cells for product details
        row.innerHTML = `
            <td data-label="Sản phẩm">
                <a href="${item.link}" class="cart__image">
                    <img src="${item.image}" alt="${item.name}">
                </a>
            </td>
            <td>
                <a href="${item.link}" class="product-name">${item.name}</a>
                <br>
                <small>${item.variant}</small>
                <p>${item.label}</p>
                <a href="#" class="cart-remove-btn" onclick="removeFromCart(${index})"><small>Xóa</small></a>
            </td>
            <td data-label="Giá">
                <span class="product-price">${item.price}₫</span>
            </td>
            <td data-label="Số lượng">
                <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${index}, this.value)">
            </td>
            <td data-label="Tổng" class="text-right">
                <span class="product-total">${item.price * item.quantity}₫</span>
            </td>
        `;
        
        cartTableBody.appendChild(row);
        total += item.price * item.quantity; // Calculate total
    });

    // Update total amount display
    document.querySelector('.subtotal-amount').textContent = total + '₫';
}

// Function to remove item from the cart
function removeFromCart(index) {
    cartItems.splice(index, 1); // Remove item from the cart array
    updateCartDisplay(); // Update display
}

// Function to update item quantity
function updateQuantity(index, quantity) {
    cartItems[index].quantity = quantity; // Update quantity in the cart array
    updateCartDisplay(); // Update display
}
