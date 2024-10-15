let arrivals = document.querySelector(".slider-product-2");
let left = document.getElementById("left");
let right = document.getElementById("right");
let isDrag = false
const scrollNumber = arrivals.clientWidth / 5;
let count = 0;

right.addEventListener('click', nextSlides);
function nextSlides() {
  // Kiểm tra nếu cuộn đến cuối bộ sưu tập
  if (arrivals.scrollLeft + arrivals.clientWidth >= arrivals.scrollWidth) {
    arrivals.scrollLeft = 0; // Quay về đầu
  } else {
    arrivals.scrollLeft += scrollNumber;
  }
}

left.addEventListener('click', previousSlide);
function previousSlide() {
  // Kiểm tra nếu cuộn về đầu bộ sưu tập
  if (arrivals.scrollLeft === 0) {
    arrivals.scrollLeft = arrivals.scrollWidth; // Quay về cuối
  } else {
    arrivals.scrollLeft -= scrollNumber;
  }
}

const dragStart2 = (e) => {
  isDrag = true;
  arrivals.classList.add("dragging");
  startX = e.pageX;
  startScrollLeft2 = arrivals.scrollLeft;
}
  
const dragging2 = (e) => {
  if(!isDrag) return;
  const dragDistance2 = e.pageX - startX;
  arrivals.scrollLeft = startScrollLeft2 - dragDistance2;
}
  
const dragStop2 = () => {
  isDrag = false;
  arrivals.classList.remove("dragging");
}

  
arrivals.addEventListener("mousedown", dragStart2);
arrivals.addEventListener("mousemove", dragging2);
document.addEventListener("mouseup", dragStop2);