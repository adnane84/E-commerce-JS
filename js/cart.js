import { data } from "./data.js";
export const cartItems = [];

// Function to add a product to the cart
export function addToCart(product) {
  const existingItem = cartItems.find((item) => item.product === product);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cartItems.push({ product, quantity: 1 });
  }

  updateCart(); // Update the cart display
  updateCartIconDigit(); // Update the cart icon digit
   // Save the updated cartItems array to local storage
   localStorage.setItem("cartItems", JSON.stringify(cartItems));
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
   // Save the updated cartItems array to local storage
   localStorage.setItem("cartItems", JSON.stringify(cartItems));
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
     // Save the updated cartItems array to local storage
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }
}

export function updateCart() {
  const cartContainer = document.getElementById("cart-summary");

  cartContainer.innerHTML = "";

  cartItems.forEach((item) => {
    const product = item.product; // Get the product from the item

    // Create a list item for the product with image, name, price, quantity, and delete button
    const listItem = document.createElement("div");
    const { image, productName, craftsperson, category } = product;
    listItem.className = "ibox-content";
    listItem.innerHTML = `
    <div class="table-responsive">
    <table class="table shoping-cart-table">
        <tbody>
        <tr>
            <td width="90">
                <div>
                <img src="${image}" alt="${productName}"  class="cart-product-imitation">
                </div>
            </td>
            <td class="desc">
                <h3>
                ${productName}
                </h3>
                <p>
                Craftsperson: <em class="craft">${craftsperson}</em>
                </p>
                <p>
                Category: <em class="category">${category}</em>
                </p>
            </td>
            <td class="item-quantity">
            <button class="increment-button" data-product='${JSON.stringify(
              product
            )}'>+</button>
<span class="quantity">${item.quantity}</span>
<button class="decrement-button" data-product='${JSON.stringify(
      product
    )}'>-</button>
            </td>
            <td>
                <h4  class="cart-item-price">
                $${product.price}
                </h4>
            </td>
            <td>
            <div class="m-t-sm">
            <button class="delete-button text-muted" data-product='${JSON.stringify(
              product
            )}'>
<img src="./assets/trash-fill.svg" alt="Delete">
</button>
        </div>
            </td>
        </tr>
        </tbody>
    </table>
</div>
    `;

    // Append the list item to the cart container
    cartContainer.appendChild(listItem);

    // Add a click event listener to the delete button
    const deleteButton = listItem.querySelector(".delete-button");
    deleteButton.addEventListener("click", () => {
      const product = JSON.parse(deleteButton.dataset.product);
      removeItemFromCart(product);
    });
  });

  updateCartTotal();

  const incrementButtons = document.querySelectorAll(".increment-button");
  const decrementButtons = document.querySelectorAll(".decrement-button");

  incrementButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const product = JSON.parse(button.dataset.product);
      console.log(product);
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

// Function to remove an item from the cart
export function removeItemFromCart(product) {
  const itemIndex = cartItems.findIndex(
    (item) => item.product.productName === product.productName
  );

  if (itemIndex !== -1) {
    cartItems.splice(itemIndex, 1);
    updateCart();
    updateCartIconDigit();
     // Save the updated cartItems array to local storage
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }
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
  const cartItemsCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  if (cartItemsCount > 0) {
    digitIcon.style.display = "inline-block";
    digitIcon.textContent = cartItemsCount;
  } else {
    digitIcon.style.display = "none";
  }
}

const cartButton = document.getElementById("cart-container");
const shoppingCart = document.getElementById("shopping-cart");
const goBackButton = document.getElementById("go-back-button");

cartButton.addEventListener("click", () => {
  toggleShoppingCart();
});

goBackButton.addEventListener("click", () => {
  if (shoppingCart.classList.contains("showCart")) {
    toggleShoppingCart();
  }
});

function toggleShoppingCart() {
  shoppingCart.classList.toggle("showCart");
  document.body.classList.toggle("no-scroll");
}

// Function to select two random products from the data
export function getRandomProducts() {
  const randomProducts = [];
  const dataCopy = [...data]; // Create a copy to avoid modifying the original data

  for (let i = 0; i < 2; i++) {
    const randomIndex = Math.floor(Math.random() * dataCopy.length);
    const randomProduct = dataCopy.splice(randomIndex, 1)[0];
    randomProducts.push(randomProduct);
  }

  return randomProducts;
}

// Initialize the cart with items from local storage when the page loads
document.addEventListener("DOMContentLoaded", () => {
  const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
  if (storedCartItems) {
    cartItems.length = 0;
    cartItems.push(...storedCartItems);
    updateCart();
    updateCartIconDigit();
  }
});

// Function to display two random products
export function displayRandomProducts() {
  // Get a reference to the container where you want to display the products
  const productContainer = document.getElementById("random-product");

  // Get two random products
  const randomProducts = getRandomProducts();

  // Iterate over the random products and create product items
  randomProducts.forEach((productData) => {
    // Extract product information
    const { image, productName, price } = productData;

    // Create a container for each product item
    const productItem = document.createElement("div");

    // Set the HTML content for the product item
    productItem.innerHTML = `
      <div class="d-flex align-items-center flex-column">
        <a href="#" class="product-name">${productName}</a>
        <img src="${image}" style="height: 100px; width: 100px" class="rounded m-4">
        <p>$${price}</p>
        <div class="m-t text-right">
        <button type="button" class="add-to-cart btn btn-outline-secondary btn-lg">Add Product</button>
        </div>
      </div>
      <hr>
    `;
    const addToCartButton = productItem.querySelector(".add-to-cart");

    addToCartButton.addEventListener("click", () => {
      console.log("Add to cart button clicked");
      addToCart(productData);
    });

    // Append the product item to the product container
    productContainer.appendChild(productItem);
  });
}

// Call the function to display two random products
displayRandomProducts();
