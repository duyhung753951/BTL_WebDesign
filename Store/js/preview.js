// Select all preview buttons
const previewButtons = document.querySelectorAll(".preview");

previewButtons.forEach((button) => {
  button.addEventListener("click", function() {
    // Get product details from the button's parent .product element
    const product = button.closest(".product");
    const productImageSrc = product.getAttribute("data-image-src");
    const productName = product.getAttribute("data-name");
    const productPrice = product.getAttribute("data-price");
    const productInfo = product.getAttribute("data-info");

    // Update the preview content
    document.getElementById("preview-image").src = productImageSrc;
    document.getElementById("preview-title").innerText = productName;
    document.getElementById("preview-price").innerText = productPrice;
    document.getElementById("preview-descrip").innerText = productInfo;
    
    // Display the preview (assuming you have CSS to control visibility)
    document.querySelector(".preview-background").classList.add("show");
  });
});

// Close preview event
document.getElementById("preview-close").addEventListener("click", function() {
  document.querySelector(".preview-background").classList.remove("show");
});
