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