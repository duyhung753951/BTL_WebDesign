let open = document.getElementById('side-bar-open');
let close = document.getElementById('side-bar-close');
var sidebar = document.querySelector('.side-bar');

// Mở side-bar khi nhấn vào biểu tượng mở
open.addEventListener('click', function() {
    sidebar.classList.add('open');
});

// Đóng side-bar khi nhấn vào biểu tượng đóng
close.addEventListener('click', function() {
    sidebar.classList.remove('open');
});

