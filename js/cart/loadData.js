
let cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];

// Function to handle adding items to the cart
function addToCart(product) {
    // Check if the product already exists in the cart
    const existingProduct = cartItems.find(item => item.name === product.name);
    if (existingProduct) {
        // If product already exists, increase the quantity
        existingProduct.quantity += 1;
    } else {
        // Add a new product with quantity 1
        cartItems.push({ ...product, quantity: 1 });
    }

    // Save updated cart to sessionStorage
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
    console.log('data fully loaded.');
    console.log(cartItems);
    // You could also update some mini-cart icon/badge here if needed
}

// Example of adding product data to cart on a button click
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.add_to_cart').forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent form submission
            
            // Find the closest ancestor's element with 'product' class
            const productElement = button.closest(".product");

            // Gather product data
            const product = {
                name: productElement.querySelector('.product_name').innerText,
                price: productElement.querySelector('.price').innerText.replace('₫', '').replace(/,/g, ''), // Clean price for use
                image: productElement.querySelector('.img_product').src
            };
            console.log(product);
            addToCart(product); // Add product to cart
        });
    });
});
