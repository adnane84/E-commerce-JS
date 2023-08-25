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
      "label": "Portfolio",
      "link": "/portfolio"
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
    const link = document.createElement("a");
    link.textContent = item.label;
    link.href = item.link;
    listItem.appendChild(link);
    navbarContainer.appendChild(listItem);
  });
}

createNavbar(navbar)
