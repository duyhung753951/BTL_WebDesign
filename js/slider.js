let scrollContainer = document.querySelector(".gallery");
let preBtn = document.getElementById("preBtn");
let nextBtn = document.getElementById("nextBtn");
const scrollAmount = scrollContainer.clientWidth;

var counter = 0;

// Số lượng ảnh trong gallery
const totalItems = scrollContainer.scrollWidth / scrollContainer.clientWidth;

nextBtn.addEventListener('click', nextSlide);
function nextSlide(){
  scrollContainer.style.scrollBehavior = "smooth";
  
  // Kiểm tra nếu là ảnh cuối thì trở về ảnh đầu
  if(counter >= totalItems - 1){
    scrollContainer.scrollLeft = 0; // Quay về đầu
    counter = 0; // Reset counter
  }
  else {
    scrollContainer.scrollLeft += scrollAmount;
    counter++;
  }
}

preBtn.addEventListener('click', previousSlide);
function previousSlide(){
  scrollContainer.style.scrollBehavior = "smooth";
  
  // Kiểm tra nếu là ảnh đầu thì nhảy tới ảnh cuối
  if(counter <= 0){
    scrollContainer.scrollLeft = scrollContainer.scrollWidth; // Nhảy đến cuối
    counter = totalItems - 1; // Set counter về cuối
  }
  else {
    scrollContainer.scrollLeft -= scrollAmount;
    counter--;
  }
}

function autoSliding(){
  deleteInterval = setInterval(timer, 4000);
  function timer(){
    nextSlide(); 
  }
}
autoSliding();

// Dừng cuộn tự động khi di chuột vào
const container = document.querySelector(".gallery-wrap");
container.addEventListener('mouseover', function(){
  clearInterval(deleteInterval);
});
