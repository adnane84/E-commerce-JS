import { data } from "./data.js";
import { navbar, createNavbar } from "./navbar.js";
import { sortByName, sortByPrice } from "./sorting.js";
import { getUniqueCategories, filterByCategory } from "./filter.js";
import { setupSearch } from "./search.js";
import { addToCart, getRandomProducts } from "./cart.js";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("products-container");
  const sortButton = document.getElementById("sortButton");
  const sortPrice = document.getElementById("sortButtonPrice");
  const categoryFilter = document.getElementById("post-category");
  let currentData = [...data];
  let currentFilter = null;
  let searchQuery = "";

  function createCards(product) {
    const card = document.createElement("div");
    card.className = "post-card";
    const { productName, price, craftsperson, image, description } = product;
    card.innerHTML = `
      <div class="col product">
        <div class="card shadow p-3">
        <img type="button" src="./assets/new-window.png" class="view-details"></img>
          <img src="${image}" class="card-img-top rounded" alt="${craftsperson}" style="height:400px">
          <div class="card-body">
            <h5 class="card-title">${productName}</h5>
            <p class="card-text">${description}</p>
            <div class="product-info">
              <button type="button" class="add-to-cart btn btn-outline-secondary btn-lg">Add Product</button>
              <h4>$${price}</h4>
            </div>
          </div>
        </div>
      </div>
    `;

    const viewDetailsButton = card.querySelector(".view-details");
    const addToCartButton = card.querySelector(".add-to-cart");

    viewDetailsButton.addEventListener("click", () => {
      const popup = createPopup(product);
      document.body.appendChild(popup);
      popup.style.display = "block";
    });

    addToCartButton.addEventListener("click", () => {
      addToCart(product); // Call the addToCart function with the current product
    });

    return card;
  }

  function createPopup(product) {
    const popup = document.createElement("div");
    popup.className = "product-popup container";
    const { productName, price, craftsperson, image, description } = product;
    popup.innerHTML = `
      <div class="popup-content card mb-3  row">
     <div class = "col popup-image">
     <img src="${image}" alt="${craftsperson}">
     </div>
      <div class="popup-info col">
      <h2 class="popup-title">${productName}</h2>
      <p class="card-title">Brand: ${craftsperson}</p>
      <p class="popup-text">Description: ${description}</p>
      <h4>Price: $${price}</h4>
      <button type="button" class="add-to-cart btn btn-outline-primary btn-lg">Add to Cart</button>
      <button type="button" class="close-popup btn-close btn-lg"></button>
      </div>
      </div>
    `;

    const closePopupButton = popup.querySelector(".close-popup");
    closePopupButton.addEventListener("click", () => {
      popup.style.display = "none";
      document.body.classList.remove("body-no-scroll"); // Remove the class to re-enable scrolling

      // Show the cards container again
      container.classList.remove("card-hidden");
    });

    const addToCartButton = popup.querySelector(".add-to-cart");
    addToCartButton.addEventListener("click", () => {
      addToCart(product);
    });

    // Hide the cards container
    container.classList.add("card-hidden");
    document.body.classList.add("body-no-scroll");

    return popup;
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

  categoryFilter.addEventListener("click", handleCategoryFilter);

  const searchBar = document.getElementById("searchBar");
  if (searchBar) {
    searchBar.value = ""; // Clear the search input field on page load
  }

  categoryFilter.addEventListener("click", (event) => {
    const selectedCategory = event.target.getAttribute("data-category");

    // Remove the "active-filter" class from any previously active button
    const activeButton = document.querySelector(".filter-button.active-filter");
    if (activeButton) {
      activeButton.classList.remove("active-filter");
    }

    // Add the "active-filter" class to the clicked button
    event.target.classList.add("active-filter");

    currentFilter = selectedCategory === "all" ? null : selectedCategory;
    displayFilteredOrAllData();
  });

  // Create and display the list of filters
  function createCategoryFilters() {
    const categories = getUniqueCategories(data);
    categoryFilter.innerHTML = `
    <li class="tab-button filter-button shadow" role="presentation" data-category="all">All</li>
    ${categories
      .map(
        (category) =>
          `<li class="tab-button filter-button shadow" role="presentation" data-category="${category}">${category}</li>`
      )
      .join("")}
  `;
  }

  // Filter products by selected category
  function handleCategoryFilter(event) {
    const selectedCategory = event.target.getAttribute("data-category");
    if (selectedCategory === "all") {
      displayCards(data);
    } else {
      const filteredData = filterByCategory(data, selectedCategory);
      displayCards(filteredData);
    }
  }

  function displayFilteredOrAllData() {
    let filteredData = currentData;

    if (currentFilter) {
      filteredData = filterByCategory(currentData, currentFilter);
    }

    if (searchQuery) {
      filteredData = filteredData.filter((product) =>
        product.productName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    displayCards(filteredData);
  }

  sortButton.addEventListener("click", () => {
    currentData = sortByName(currentData, true); // Assuming ascending by default
    displayFilteredOrAllData();
  });

  sortPrice.addEventListener("click", () => {
    currentData = sortByPrice(currentData, true); // Assuming ascending by default
    displayFilteredOrAllData();
  });

  categoryFilter.addEventListener("click", handleCategoryFilter);

  createCategoryFilters();
  displayCards(data);
  setupSearch();
  getRandomProducts();
});
