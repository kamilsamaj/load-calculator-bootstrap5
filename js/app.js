// listen for submit
document.getElementById('loan-form').addEventListener('submit', calculateResults);

function calculateResults(e) {
  console.log('Calculating ...');

  // UI <input> elements
  const amountEl = document.getElementById('amount');
  const interestEl = document.getElementById('interest');
  const yearsEl = document.getElementById('years');
  const monthlyPaymentEl = document.getElementById('monthly-payment');
  const totalPaymentEl = document.getElementById('total-payment');
  const totalInterestEl = document.getElementById('total-interest');

  // calculate monthly payment
  const principal = parseFloat(amountEl.value);  // loan amount value
  const calculatedInterest = parseFloat(interestEl.value) / 100 / 12;  // interest rate monthly
  const calculatedPayments = parseFloat(yearsEl.value) * 12;

  const aggregateInterest = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * aggregateInterest * calculatedInterest) / (aggregateInterest - 1);

  if (isFinite(monthly)) {
    monthlyPaymentEl.value = monthly.toFixed(2);
    totalPaymentEl.value = (monthly * calculatedPayments).toFixed(2);
    totalInterestEl.value = ((monthly * calculatedPayments) - principal).toFixed(2);
  } else {
    showError("Please check your numbers");
  }

  e.preventDefault();
}

function showError(error) {
  // construct a new error div
  const errorDiv = document.createElement('div');
  errorDiv.className = 'alert alert-danger';
  errorDiv.appendChild(document.createTextNode(error));

  // insert the errorDiv into the card, before the heading
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  card.insertBefore(errorDiv, heading);

  // clear error after 3 seconds
  setTimeout(clearError, 3000);
}

function clearError() {
  document.querySelector('.alert').remove();
}
