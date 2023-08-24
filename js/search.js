// search.js

export function setupSearch() {
  const getSearchBar = document.querySelector("#searchBar");
  const getAllCards = document.querySelectorAll(".post-card");

  if (!getSearchBar || !getAllCards.length) {
    console.error("DOM elements not found for search functionality.");
    return;
  }

  getSearchBar.addEventListener("keyup", (e) => {
    getAllCards.forEach((product) => {
      if (
        product.innerText.toLowerCase().includes(e.target.value.toLowerCase())
      ) {
        product.style.display = "block";
      } else {
        product.style.display = "none";
      }
    });
  });
}
