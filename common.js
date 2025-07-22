window.addEventListener("load", function () {
  const cartTable = document.getElementById("cart-table");
  if (cartTable) {
    const scrollPosition = (cartTable.scrollWidth - cartTable.clientWidth) / 2;
    cartTable.scrollLeft = scrollPosition;
  }
});

// *********************************** making the navabar responsive ******************************************************
const bar = document.getElementById("bar");
const navbar = document.getElementById("navbar");
const close = document.getElementById("close");
if (bar) {
  // click is the event listener name
  bar.addEventListener("click", () => {
    navbar.classList.add("active");
  });
}

if (close) {
  close.addEventListener("click", () => {
    navbar.classList.remove("active");
  });
}
