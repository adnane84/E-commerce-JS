import { data } from "./data.js";
import { navbar, createNavbar } from "./navbar.js";
import { sortByName, sortByPrice } from "./sorting.js";
import { getUniqueCategories, filterByCategory } from "./filter.js";
import { setupSearch } from "./search.js";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("products-container");
  const sortButton = document.getElementById("sortButton");
  const sortPrice = document.getElementById("sortButtonPrice");
  const categoryFilter = document.getElementById("post-category");

  function createCards(product) {
    const card = document.createElement("div");
    card.className = "post-card";
    const { productName, price, brand, image } = product;
    card.innerHTML = `
     <div class="col product">
       <div class="card shadow p-3">
         <img src="${image}" class="card-img-top rounded" alt="${brand}" style="height:400px">
         <div class="card-body">
           <h5 class="card-title">${productName}</h5>
           <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
           <div class="product-info">
           <button type="button" class="add-to-cart btn btn-outline-secondary btn-lg">Add Product</button>
           <h4>$${price}</h4>
           </div>
         </div>
       </div>
     </div>
    `;

    return card;
  }

  function clearCard() {
    container.innerHTML = "";
  }

  let currentData = [...data];
  let currentFilter = null;

  function displayCards(products) {
    clearCard();
    products.forEach((product) => {
      const card = createCards(product);
      container.appendChild(card);
    });
  }

  sortButton.addEventListener("click", () => {
    currentData = sortByName(currentData);
    displayFilteredOrAllData();
  });

  sortPrice.addEventListener("click", () => {
    currentData = sortByPrice(currentData);
    displayFilteredOrAllData();
  });

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
    if (currentFilter) {
      displayCards(filterByCategory(currentData, currentFilter));
    } else {
      displayCards(currentData);
    }
  }
 
  sortButton.addEventListener("click", () => {
    toggleSort(sortByName, sortButton);
  });
  
  sortPrice.addEventListener("click", () => {
    toggleSort(sortByPrice, sortPrice);
  });
  
  createCategoryFilters();
  displayCards(data);
  setupSearch();
});
