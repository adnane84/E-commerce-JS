export const navbar = [
  {
      "id": 1,
      "label": "Home",
      "link": "/"
  },
  {
      "id": 2,
      "label": "About Us",
      "link": "/about"
  },
  {
      "id": 3,
      "label": "Services",
      "link": "/services"
  },
  {
      "id": 4,
      "label": "Products",
      "link": "/products"
  },
  {
      "id": 5,
      "label": "Contact",
      "link": "/contact"
  }
]


// navbar.js

export function createNavbar(navbarData) {
  const navbarContainer = document.getElementById("navbar-list");

  navbarData.forEach(item => {
    const listItem = document.createElement("li");
    listItem.className = "nav-item";
    const link = document.createElement("a");
    link.className = "nav-link active";
    link.textContent = item.label;
    link.href = item.link;

    listItem.appendChild(link);
    navbarContainer.appendChild(listItem);
  });

  // Create the cart icon and digit icon
  const cartIcon = document.createElement("ion-icon");
  cartIcon.className = "cart-logo nav-item"; // Replace with the class for your cart icon
  cartIcon.name = "cart";
  cartIcon.size = "large";

  // Create a digit icon with an initial value of 0 (hidden initially)
  const digitIcon = document.createElement("span");
  digitIcon.className = "digit-icon";
  digitIcon.textContent = "0";
  digitIcon.style.display = "none"; // Initially hidden

  // Create a container for the cart and digit icons
  const cartContainer = document.createElement("div");
  cartContainer.className = "cart-container";
  cartContainer.appendChild(cartIcon);
  cartContainer.appendChild(digitIcon);

  // Add the cart container to the navbar
  const cartListItem = document.createElement("li");
  cartListItem.className = "nav-item";
  cartListItem.appendChild(cartContainer);
  navbarContainer.appendChild(cartListItem);
}

createNavbar(navbar)
