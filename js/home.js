let arrivals = document.querySelectorAll(".slider-product-2");
let leftButtons = document.querySelectorAll(".left");
let rightButtons = document.querySelectorAll(".right");
let isDrag = false;
const scrollNumber = arrivals[0].clientWidth / 5;
let autoplaySpeed = 3000;
let count = 0;

// Hàm để bắt đầu autoplay
function startAutoplay(slider) {
  return setInterval(function () {
    // Kiểm tra nếu cuộn đến cuối bộ sưu tập
    if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
      slider.scrollLeft = 0; // Quay về đầu
    } else {
      slider.scrollLeft += scrollNumber;
    }
  }, autoplaySpeed);
}

arrivals.forEach((slider, index) => {
  // Lấy nút left và right tương ứng với slider hiện tại
  let left = leftButtons[index];
  let right = rightButtons[index];

  // Biến lưu trữ interval autoplay cho slider hiện tại
  let autoplayInterval = startAutoplay(slider);

  // Dừng autoplay khi di chuột vào slider
  slider.addEventListener("mouseenter", function () {
    clearInterval(autoplayInterval); // Dừng autoplay
  });

  // Bắt đầu lại autoplay khi chuột rời khỏi slider
  slider.addEventListener("mouseleave", function () {
    autoplayInterval = startAutoplay(slider); // Khởi động lại autoplay
  });

  // Sự kiện click cho nút 'right'
  right.addEventListener("click", function () {
    // Kiểm tra nếu cuộn đến cuối bộ sưu tập
    if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
      slider.scrollLeft = 0; // Quay về đầu
    } else {
      slider.scrollLeft += scrollNumber;
    }
  });

  // Sự kiện click cho nút 'left'
  left.addEventListener("click", function () {
    // Kiểm tra nếu cuộn về đầu bộ sưu tập
    if (slider.scrollLeft === 0) {
      slider.scrollLeft = slider.scrollWidth; // Quay về cuối
    } else {
      slider.scrollLeft -= scrollNumber;
    }
  });

  // Sự kiện kéo chuột
  slider.addEventListener("mousedown", function (e) {
    isDrag = true;
    slider.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft2 = slider.scrollLeft;
  });

  slider.addEventListener("mousemove", function (e) {
    if (!isDrag) return;
    const dragDistance2 = e.pageX - startX;
    slider.scrollLeft = startScrollLeft2 - dragDistance2;
  });

  document.addEventListener("mouseup", function () {
    isDrag = false;
    slider.classList.remove("dragging");
  });
});
