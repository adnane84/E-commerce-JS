export function sortByName(products) {
  const sortedData = [...products].sort((a,b) => 
    a.productName.localeCompare(b.productName)
  )
  return sortedData;
}

export function sortByPrice(products) {
  const sortedData = [...products].sort((a,b) => 
  a.price - b.price
  )
  return sortedData;
}

// sorting.js

export function getUniqueCategories(data) {
  const categories = [...new Set(data.map(product => product.category))];
  return categories;
}

export function filterByCategory(data, category) {
  const filteredData = data.filter(product => product.category === category);
  return filteredData;
}
