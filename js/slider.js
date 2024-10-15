let scrollContainer = document.querySelector(".gallery");
let preBtn = document.getElementById("preBtn");
let nextBtn = document.getElementById("nextBtn");
const scrollAmount = scrollContainer.clientWidth;
const totalItems = scrollContainer.scrollWidth / scrollContainer.clientWidth;
let counter = 0;
let isDragging = false, startX, startScrollLeft, totalDragDistance = 0;

nextBtn.addEventListener('click', nextSlide);
function nextSlide(){
  scrollContainer.style.scrollBehavior = "smooth";
  
  // Kiểm tra nếu cuộn đến cuối bộ sưu tập
  if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth) {
    scrollContainer.scrollLeft = 0; // Quay về đầu
  } else {
    scrollContainer.scrollLeft += scrollAmount;
  }
}

preBtn.addEventListener('click', previousSlide);
function previousSlide(){
  scrollContainer.style.scrollBehavior = "smooth";
  
  // Kiểm tra nếu cuộn đến đầu bộ sưu tập
  if (scrollContainer.scrollLeft === 0) {
    scrollContainer.scrollLeft = scrollContainer.scrollWidth; // Quay về cuối
  } else {
    scrollContainer.scrollLeft -= scrollAmount;
  }
}

function autoSliding(){
  deleteInterval = setInterval(timer, 4000);
  function timer(){
    nextSlide();
     // Kiểm tra nếu là ảnh cuối thì trở về ảnh đầu
    if(counter >= totalItems){
      scrollContainer.scrollLeft = 0; // Quay về đầu
      counter = 0; // Reset counter
    }
  }
}
autoSliding();

// Dừng cuộn tự động khi di chuột vào
const container = document.querySelector(".gallery-wrap");
container.addEventListener('mouseover', function(){
  clearInterval(deleteInterval);
});

// Draggable image
const dragStart = (e) => {
  isDragging = true;
  scrollContainer.classList.add("dragging");
  startX = e.pageX;
  startScrollLeft = scrollContainer.scrollLeft;
  totalDragDistance = 0; // Đặt lại khoảng cách kéo
}

const dragging = (e) => {
  if(!isDragging) return;
  const dragDistance = e.pageX - startX;
  totalDragDistance = dragDistance;
  scrollContainer.scrollLeft = startScrollLeft - dragDistance;
}

const dragStop = () => {
  isDragging = false;
  scrollContainer.classList.remove("dragging");
  
  // Xác định xem người dùng đã kéo đủ xa để cuộn sang phần tử kế tiếp hoặc không
  if (Math.abs(totalDragDistance) > scrollAmount / 20) {
    if (totalDragDistance < 0) {
      // Kéo sang phải, cuộn đến phần tử tiếp theo
      nextSlide();
    } else if (totalDragDistance > 0 ) {
      // Kéo sang trái, cuộn về phần tử trước
      previousSlide();
    }
  }
}

scrollContainer.addEventListener("mousedown", dragStart);
scrollContainer.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);