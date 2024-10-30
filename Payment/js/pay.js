// Kiểm tra xem ô nhập liệu có trống hay không
function checknull(txt) {
  if (txt.value.length == 0) return true;
  else return false;
}

// Hàm chính để kiểm tra tính hợp lệ của biểu mẫu
function validform(f) {
  // Kiểm tra nếu ô tên đầu tiên trống
  if (checknull(f.first_name)) {
    alert("First Name  Must not be empty");
    f.first_name.focus(); // Đưa con trỏ vào ô này nếu không hợp lệ
    return;
  }

  // Kiểm tra nếu ô họ trống
  if (checknull(f.last_name)) {
    alert(" Last Name  Must not be empty");
    f.last_name.focus();
    return;
  }

  // Kiểm tra nếu ô email trống
  if (checknull(f.email)) {
    alert(" Email Must not be empty");
    f.email.focus();
    return;
  }

  // Kiểm tra nếu mã vùng điện thoại trống
  if (checknull(f.phone_area)) {
    alert(f.phone_area.name + " Must not be empty");
    f.phone_area.focus();
    return;
  }

  // Kiểm tra nếu mã tiền tố điện thoại trống
  if (checknull(f.phone_prefix)) {
    alert(f.phone_prefix.name + " Must not be empty");
    f.phone_prefix.focus();
    return;
  }

  // Kiểm tra nếu phần đuôi điện thoại trống
  if (checknull(f.phone_suffix)) {
    alert(f.phone_suffix.name + " Must not be empty");
    f.phone_suffix.focus();
    return;
  }

  // Kiểm tra định dạng email hợp lệ
  if (
    !StringMatch(f.email, /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
  ) {
    alert("Invalid email format");
    return;
  }

  // Kiểm tra mã vùng điện thoại có đúng 3 chữ số không
  if (!StringMatch(f.phone_area, /^\d{3}$/)) {
    alert("Phone area code must be 3 digits");
    return;
  }

  // Kiểm tra tiền tố điện thoại có đúng 3 chữ số không
  if (!StringMatch(f.phone_prefix, /^\d{3}$/)) {
    alert("Phone prefix must be 3 digits");
    return;
  }

  // Kiểm tra phần đuôi điện thoại có đúng 4 chữ số không
  if (!StringMatch(f.phone_suffix, /^\d{4}$/)) {
    alert("Phone suffix must be 4 digits");
    return;
  }

  // Kiểm tra nếu tuổi không phải là số
  if (isNaN(f.age.value)) {
    alert(f.age.name + " Must be a number");
    f.age.value = ""; // Đặt lại giá trị nếu không hợp lệ
    f.age.focus();
    return;
  }

  // Kiểm tra nếu tuổi là số nguyên
  if (!isInteger(f.age)) {
    alert(f.age.name + " Must be an integer");
    f.age.value = "";
    f.age.focus();
    return;
  }

  // Kiểm tra tuổi có nằm trong khoảng 18-200 hay không
  if (f.age.value < 18 || f.age.value > 200) {
    alert(f.age.name + " Must be between 18 and 200");
    f.age.value = "";
    f.age.focus();
    return;
  }

  // Kiểm tra nếu ô xác thực không được chọn (người dùng chưa xác nhận mình không phải robot)
  if (notCheck(f.check_robot)) {
    alert("Please verify you're not a robot");
    return;
  }

  // Hiển thị thông báo "Hoàn thành" nếu tất cả điều kiện đều hợp lệ
  alert("Form submission complete!");
}

// Kiểm tra chuỗi ký tự có khớp với biểu thức chính quy (regex) hay không
function StringMatch(txt, reg) {
  return reg.test(txt.value);
}

// Kiểm tra nếu ô xác thực "không phải robot" chưa được chọn
function notCheck(checkbox) {
  return !checkbox.checked;
}

// Kiểm tra nếu giá trị là số nguyên
function isInteger(txt) {
  return Number.isInteger(Number(txt.value));
}
document.addEventListener("DOMContentLoaded", function () {
  // Lấy sản phẩm từ sessionStorage
  const cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];

  // Lấy phần tử chứa danh sách sản phẩm
  const productsContainer = document.querySelector(".products-list");

  let totalPrice = 0; // Biến tổng giá

  // Duyệt qua các sản phẩm trong giỏ hàng
  cartItems.forEach((item) => {
    // Tính giá cho từng sản phẩm
    const itemTotal = item.price * item.quantity;
    totalPrice += itemTotal;

    // Tạo phần tử hiển thị sản phẩm
    const productRow = document.createElement("div");
    productRow.classList.add("product-row");
    productRow.innerHTML = `
           <span>${"Tên :" + item.name}</span></br>
          <span>${"Slg :" + item.quantity}</span>
           <span>${"Giá :" + item.price.toLocaleString()}₫</span>
          
      `;

    // Thêm phần tử sản phẩm vào danh sách
    productsContainer.appendChild(productRow);
  });

  // Cập nhật tổng giá vào phần tử hiển thị tổng cộng
  document.querySelector(
    ".total-price"
  ).textContent = `${totalPrice.toLocaleString()}₫`;
});
document.addEventListener("DOMContentLoaded", () => {
  updateCart(); // Hàm để cập nhật giao diện giỏ hàng ban đầu

  document.body.addEventListener("click", (event) => {
    if (
      event.target.matches(".js-qty__adjust--plus") ||
      event.target.matches(".js-qty__adjust--minus")
    ) {
      const row = event.target.closest(".cart-row");
      const qtyInput = row.querySelector(".num-qty");
      const productName = row.querySelector(".product-name").innerText;
      const price = parseFloat(
        row
          .querySelector(".product-price")
          .textContent.replace("₫", "")
          .replace(/\./g, "")
          .trim()
      );

      let quantity = parseInt(qtyInput.value) || 1;

      // Increase or decrease quantity
      if (event.target.matches(".js-qty__adjust--plus")) {
        quantity += 1;
      } else if (
        event.target.matches(".js-qty__adjust--minus") &&
        quantity > 1
      ) {
        quantity -= 1;
      }
      qtyInput.value = quantity;

      // Cập nhật sessionStorage
      const cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];
      const itemIndex = cartItems.findIndex(
        (item) => item.name === productName
      );
      if (itemIndex !== -1) {
        cartItems[itemIndex].quantity = quantity;
        cartItems[itemIndex].total = price * quantity;
        sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
      }

      updatePrice(); // Cập nhật lại tổng giá tiền
    }
  });
});
function updatePrice() {
  const cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];
  let totalPrice = 0;

  cartItems.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    totalPrice += itemTotal;
  });

  document.querySelector(
    ".total-price"
  ).textContent = `${totalPrice.toLocaleString()}₫`;
  sessionStorage.setItem("totalPrice", totalPrice); // Cập nhật tổng giá trong sessionStorage
}
