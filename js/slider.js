let scrollContainer = document.querySelector(".gallery");
let preBtn = document.getElementById("preBtn");
let nextBtn = document.getElementById("nextBtn");
const scrollAmount = scrollContainer.clientWidth;
    
nextBtn.addEventListener('click', () => {
    scrollContainer.scrollLeft += scrollAmount;
    scrollContainer.style.scrollBehavior = "smooth";
});

preBtn.addEventListener('click', () => {
  scrollContainer.scrollLeft -= scrollAmount;
  scrollContainer.style.scrollBehavior = "smooth";
});
