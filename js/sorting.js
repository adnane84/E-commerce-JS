export function sortByName(data) {
  const sortedData = [...data].sort((a,b) => 
    a.productName.localeCompare(b.productName)
  )
  return sortedData;
}

export function sortByPrice(data) {
  const sortedData = [...data].sort((a,b) => 
  a.price - b.price
  )
  return sortedData;
}