
  export function populateStateSelect()  {
  // Example of populating the select element with states
  const states = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming"
  ];
  
  // You can use this "states" array to populate your state select element.
  
  const stateSelect = document.getElementById("state");

  states.forEach((state) => {
      const option = document.createElement("option");
      option.value = state;
      option.text = state;
      stateSelect.appendChild(option);
  });

  // Add form submission validation
  const form = document.getElementById("shippingForm");
  form.addEventListener("submit", function (event) {
      const firstName = document.getElementById("firstName").value;
      const lastName = document.getElementById("lastName").value;
      const city = document.getElementById("city").value;
      const zipCode = document.getElementById("zipCode").value;

      if (!/^[A-Za-z]+$/.test(firstName)) {
          alert("First name should contain letters only.");
          event.preventDefault();
      }

      if (!/^[A-Za-z]+$/.test(lastName)) {
          alert("Last name should contain letters only.");
          event.preventDefault();
      }

      if (!/^[A-Za-z]+$/.test(city)) {
          alert("City should contain letters only.");
          event.preventDefault();
      }

      if (!/^\d{5}$/.test(zipCode)) {
          alert("Zip code should contain exactly 5 digits.");
          event.preventDefault();
      }
  });
  }


export function toggleShippingForm() {
  if (togglePaymentForm()) {
    // Add an event listener for a successful payment event
document.addEventListener("DOMContentLoaded", () => {
  // Replace this with the actual event and condition for a successful payment
  // const successfulPayment = true; // Example: Set to true if payment is successful

  const submitButton = document.getElementById("submit-button"); // Change "submit-button" to the actual ID of your submit button

  submitButton.addEventListener("click", (e) => {
    // if (successfulPayment) {
    //   showShipmentForm(); // Call the showShipmentForm function when the payment is successful
    // }
    e.preventDefault();
    console.log("hello")
  });
});
  }
}
