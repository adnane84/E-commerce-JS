// Function to format credit card number
export function formatCreditCard() {
  let input = document.getElementById("credit-card");
  let value = input.value.replace(/\D/g, ''); // Remove non-digit characters
  let formattedValue = '';

  // Insert hyphens every 4 digits
  for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 4 === 0) {
          formattedValue += '-';
      }
      formattedValue += value.charAt(i);
  }

  // Truncate to a maximum of 20 characters
  if (formattedValue.length > 19) {
      formattedValue = formattedValue.substring(0, 19);
  }

  input.value = formattedValue;
}

// Function to validate CVV
export function validateCVV() {
  const cvvInput = document.getElementById("card-cvv");
  const cvvError = document.querySelector(".cvv-error");
  const cvvValue = cvvInput.value.trim();

  if (/^\d{3}$/.test(cvvValue)) {
      cvvError.textContent = ""; // Clear the error message
  } else {
      cvvError.textContent = "CVV must be 3 digits.";
  }
}

// Function to validate expiration date
export function validateExpiration() {
  const expirationInput = document.getElementById("card-expiration");
  const expirationError = document.querySelector(".expiration-error");
  const expirationValue = expirationInput.value.trim();

  // Check if the input matches the MM/YY format
  const datePattern = /^(0[1-9]|1[0-2])\/(\d{2})$/;
  if (!datePattern.test(expirationValue)) {
    expirationError.textContent = "Invalid format (MM/YY).";
    return;
  }

  // Split the expiration date into month and year
  const [inputMonth, inputYear] = expirationValue.split('/').map(Number);
  const currentYear = new Date().getFullYear() % 100;
  const currentMonth = new Date().getMonth() + 1; // Month is zero-based
  console.log(currentMonth)

  if (inputYear < currentYear || (inputYear === currentYear && inputMonth < currentMonth)) {
    expirationError.textContent = "Card has expired.";
  } else {
    expirationError.textContent = ""; // Clear the error message
  }
}

// Function to validate cardholder name
export function validateCardHolder() {
  const cardHolderInput = document.getElementById("card-holder");
  const cardHolderError = document.querySelector(".card-holder-error");
  const cardHolderValue = cardHolderInput.value.trim();

  if (/^[A-Za-z\s]+$/.test(cardHolderValue)) {
      cardHolderError.textContent = ""; // Clear the error message
  } else {
      cardHolderError.textContent = "Cardholder name can only contain letters and spaces.";
  }
}

// Define the togglePaymentForm function
export function togglePaymentForm() {
  const paymentForm = document.getElementById("payment-form"); // Change "payment-form" to the actual ID of your payment form

  // Toggle the "hidden" class on the payment form
  paymentForm.classList.toggle("hidden");
}

// Add an event listener for the checkout button
document.addEventListener("DOMContentLoaded", () => {
  const checkoutButton = document.getElementById("checkoutButton"); // Change "checkout-button" to the actual ID of your checkout button

  checkoutButton.addEventListener("click", () => {
    togglePaymentForm(); // Call the togglePaymentForm function when the button is clicked
  });
});

export function toggleShippingForm() {
  const shippingForm = document.getElementById("shippingForm");
  shippingForm.classList.toggle("hidden");
}

document.addEventListener("click", () => {
  const submitBtn = document.getElementById("submit-button");
  submitBtn.addEventListener("click", () => {
    toggleShippingForm();
  })
});

