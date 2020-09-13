// Affichage du numéro de commande
function displayOrderId() {
  let orderId = document.getElementById('number-order');
  return orderId.innerText = localStorage.getItem('orderId');
}
displayOrderId();

// Affichage du prix de la commande
function displayTotalPrice() {
  let totalPrice = document.getElementById('total-price');
  return totalPrice.innerText = tranformPrice(localStorage.getItem('totalPrice'));
}
displayTotalPrice();

// Function setTimeout qui va cleaner le localStorage
// function delayCleanLocalStorage() {
//   window.setTimeout(cleanOrderId, 3000);
//   window.setTimeout(cleanTotalPrice, 3000);
// }
// delayCleanLocalStorage();

// function cleanOrderId() {
//   return localStorage.setItem('orderId', "");
// }

// function cleanTotalPrice() {
//   return localStorage.setItem('totalPrice', "");
// }