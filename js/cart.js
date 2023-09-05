export const cartItems = [];

export function addToCart(product) {
  const existingItem = cartItems.find((item) => item.product === product);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cartItems.push({ product, quantity: 1 });
  }

  updateCart();
  updateCartIconDigit();

}

// Function to increment item quantity
export function incrementQuantity(product) {
  const item = cartItems.find(
    (item) => item.product.productName === product.productName
  );
  if (item) {
    item.quantity++;
  }
  updateCart();
  updateCartIconDigit();
}

// Function to decrement item quantity
export function decrementQuantity(product) {
  const itemIndex = cartItems.findIndex(
    (item) => item.product.productName === product.productName
  );

  if (itemIndex !== -1) {
    if (cartItems[itemIndex].quantity > 1) {
      cartItems[itemIndex].quantity--;
    } else {
      cartItems.splice(itemIndex, 1);
    }
    updateCart();
    updateCartIconDigit();
  }
}

export function updateCart() {
  const cartContainer = document.getElementById("cartItems");

  cartContainer.innerHTML = "";

  cartItems.forEach((item) => {
    cartContainer.innerHTML += `
      <li>${item.product.productName} - $${item.product.price} x ${
      item.quantity
    }
        <button class="increment-button" data-product='${JSON.stringify(
          item.product
        )}'>+</button>
        <button class="decrement-button" data-product='${JSON.stringify(
          item.product
        )}'>-</button>
      </li>`;
  });

  updateCartTotal();

  const incrementButtons = document.querySelectorAll(".increment-button");
  const decrementButtons = document.querySelectorAll(".decrement-button");

  incrementButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const product = JSON.parse(button.dataset.product);
      console.log(product)
      incrementQuantity(product);
    });
  });

  decrementButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const product = JSON.parse(button.dataset.product);
      decrementQuantity(product);
    });
  });
}

export function updateCartTotal() {
  const cartTotals = document.querySelectorAll(".cartTotal");

  const totalPrice = cartItems.reduce((total, item) => {
    return total + parseFloat(item.product.price) * item.quantity;
  }, 0);

  cartTotals.forEach((cartTotal) => {
    cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
  });
}

export function updateCartIconDigit() {
  const digitIcon = document.querySelector(".digit-icon");
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  if (cartItemsCount > 0) {
    digitIcon.style.display = "inline-block";
    digitIcon.textContent = cartItemsCount;
  } else {
    digitIcon.style.display = "none";
  }
}

