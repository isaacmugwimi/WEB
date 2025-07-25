window.addEventListener("load", function () {
  const cartTable = document.getElementById("cart-table");
  if (cartTable) {
    const scrollPosition = (cartTable.scrollWidth - cartTable.clientWidth) / 2;
    cartTable.scrollLeft = scrollPosition;
  }

  const cartData = JSON.parse(localStorage.getItem("cartItemStore")) || [];
  cartData.forEach((item) => {
    addItemToCart(item.productImage, item.productPrice, item.productTitle);
  });
  addQuantityListener();
  updateCartDetails();
});

// *********************************** creating image Gallery ******************************************************
var main_image = document.getElementById("main-image");
const images = document.getElementsByClassName("small-img");
for (let i = 0; i < images.length; i++) {
  images[i].onclick = function () {
    main_image.src = images[i].src;
  };
}

// *********************************** adding item to the cart ******************************************************
const product1 = document.getElementById("product1");
if (product1) {
  const product = product1.querySelectorAll(".product-container .product");

  product.forEach((product) => {
    product.addEventListener("click", () => {
      window.location.href = "singleproduct.html"; // when user clicks an image it opens a new window for shopping purposes.
    });

    const addToCartBtn = product.querySelector(".addToCartBtn");
    if (addToCartBtn) {
      addToCartBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        dataIntake(e);
      });
    }
  });

  function dataIntake(event) {
    const buttonClicked = event.target;
    const product = buttonClicked.closest(".product");
    const productImage = product.querySelector(".productImage").src;
    const productTitle = product.querySelector(".productTitle").innerText;
    const productPrice = product.querySelector(".productPrice").innerText;

    saveTolocalStorage(productImage, productPrice, productTitle);
  }
}

// **************************** adding data into the table  ********************************************************

updateCartDetails();
function addItemToCart(productImage, productPrice, productTitle) {
  const shoppingCart = document.querySelector("#shopping-cart");
  if (!shoppingCart) return;
  const carttable = shoppingCart.querySelector(".cart-table table tbody");

  // adding new row
  const newRow = document.createElement("tr");
  newRow.classList.add("itemRows");

  let data = `
              <td>
                <a href="#"
                  ><img src="img/delete.png" class="delete" alt=""
                /></a>
              </td>
              <td><img src="${productImage}" class="cart-product-img"/></td>
              <td>${productTitle}</td>
              <td class="priceElement">${productPrice}</td>
              <td>
                <input
                  class="quantityElement"
                  type="number"
                  name=""
                  id=""
                  value="1"
                  min="1"
                />
              </td>
              <td class="subTotal"></td>
            `;

  newRow.innerHTML = data;
  carttable.append(newRow);
  updateCartDetails();
  newRow.querySelector(".delete").addEventListener("click", deleteRow);
  addQuantityListener();
  // saveTolocalStorage(productImage, productPrice, productTitle)
}

// *********************************** Data manipulation in the Cart Table ******************************************************

// ***** In this part we are going to include the delete button.**********
const deleteButton = document.querySelectorAll(".delete");
deleteButton.forEach((deleteButton) => {
  deleteButton.addEventListener("click", deleteRow);
});

function deleteRow(event) {
  const buttonSelected = event.target;
  const selectedRow = buttonSelected.closest(".itemRows");

  if (selectedRow) {
    if (confirm("Are you sure you want to delete this item?")) {
      // Get the product title of the item being deleted
      const productTitle =
        selectedRow.querySelector("td:nth-child(3)").innerText;

      // Remove the row from DOM
      selectedRow.remove();

      // ✅ Remove item from localStorage
      let cartItemStore =
        JSON.parse(localStorage.getItem("cartItemStore")) || [];
      cartItemStore = cartItemStore.filter(
        (item) => item.productTitle !== productTitle
      );
      localStorage.setItem("cartItemStore", JSON.stringify(cartItemStore));

      // Update totals
      updateCartDetails();

      console.log(`Deleted ${productTitle} from cart and localStorage`);
    }
  } else {
    window.alert("Please select a row to delete");
  }
}

// adding change listener.
function addQuantityListener() {
  const section = document.querySelector("#shopping-cart");
  if (!section) return;
  let quantityElement1 = document.querySelectorAll(".quantityElement");
  quantityElement1.forEach((quantityElement1) => {
    quantityElement1.addEventListener("change", () => {
      if (quantityElement1.value <= 0) {
        quantityElement1.value = 1;
        alert("Quantity must be atleast 1");
      }
      updateCartDetails();
    });
  });
}

// *************************** updating data in the Cart Table ********************

function updateCartDetails() {
  let subTotal = 0;
  let total = 0;
  const section = document.querySelector("#shopping-cart");
  if (!section) return;
  const itemRows = section.querySelectorAll("table tbody tr");

  itemRows.forEach((itemRow) => {
    let priceElement = itemRow.querySelector(".priceElement");
    let subTotalElement = itemRow.querySelector(".subTotal");
    let quantityElement = itemRow.querySelector(".quantityElement");

    let price = parseFloat(priceElement.innerText.replace("$", ""));
    let quantity = parseInt(quantityElement.value);
    // adding quantity listener

    subTotal = quantity * price;
    total = total + price * quantity;

    subTotalElement.innerText = `$${subTotal}`;
    document.querySelector(".total").innerText = `$${total}`;
    document.querySelector(".finalTotal").innerText = `$${total}`;
  });
}

// *************** local storage *************************
function saveTolocalStorage(productImage, productPrice, productTitle) {
  const cartItem = { productImage, productPrice, productTitle };

  // ✅ Load existing cart
  const cartItemStore = JSON.parse(localStorage.getItem("cartItemStore")) || [];

  // ✅ Check if item already exists
  const alreadyExists = cartItemStore.some(
    (item) => item.productTitle === productTitle
  );
  if (alreadyExists) {
    alert(`${productTitle} is already in the cart!`);
    return;
  }
  // ✅ Add new item
  cartItemStore.push(cartItem);

  // ✅ Save back to localStorage
  localStorage.setItem("cartItemStore", JSON.stringify(cartItemStore));

  alert(`${productTitle} added to cart`);
}

//almost complete