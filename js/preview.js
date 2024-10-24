document.addEventListener('DOMContentLoaded', () => {
    const products = document.querySelectorAll('.product');
    const previewModal = document.querySelector('.preview-product');
    const previewTitle = document.getElementById('preview-title');
    const previewImage = document.getElementById('preview-image');
    const previewPrice = document.getElementById('preview-price');
    const closeBtn = document.getElementById('preview-close');
  
    // Add click event listener for each product's preview button
    products.forEach(product => {
      const productName = product.querySelector('.product_name').textContent;
      const productPrice = product.querySelector('.price').textContent;
      const productImage = product.querySelector('.img_product').src;
      const previewBtn = product.querySelector('.preview'); // Assuming the preview button
  
      previewBtn.addEventListener('click', (e) => {  
        // Populate the preview modal with product info
        previewTitle.textContent = productName;
        previewImage.src = productImage;
        previewPrice.textContent = productPrice;
  
        // Show the preview modal
        previewModal.classList.add('open');
      });
    });
  
    // Close the preview modal when the close button is clicked
    closeBtn.addEventListener('click', () => {
      previewModal.style.display = 'none';
    });
  });
  