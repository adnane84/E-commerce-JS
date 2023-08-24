import { data } from "./data.js";
import { sortByName, sortByPrice } from "./sorting.js";
import { addToCart } from "./cart.js";
import { setupSearch } from "./search.js"; //

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("cardContainer");
  const sortButton = document.getElementById("sortButton");
  const sortPrice = document.getElementById("sortButtonPrice");

  function createCards(product) {
    const card = document.createElement("div");
    card.className = "post-card";
    const { productName, price, brand } = product;
    card.innerHTML = `
     <h3>${productName}</h3>
     <p>${price}</p>
     <p>${brand}</p>
     <button class="add-to-cart">Add Product</button>
    `;
    const addToCartBtn = card.querySelector(".add-to-cart");
    addToCartBtn.addEventListener("click", () => {
      addToCart(product);
    });

    return card;
  }

  function clearCard() {
    container.innerHTML = "";
  }

  function displayCards(products) {
    clearCard();
    products.forEach((product) => {
      const card = createCards(product);
      container.appendChild(card);
    });
  }

  sortButton.addEventListener("click", () => {
    const sortedData = sortByName(data);
    displayCards(sortedData);
  });

  sortPrice.addEventListener("click", () => {
    const sortedData = sortByPrice(data);
    displayCards(sortedData);
  });

  const searchBar = document.getElementById("searchBar");
  if (searchBar) {
    searchBar.value = ""; // Clear the search input field on page load
  }

  displayCards(data);
  setupSearch();
});
