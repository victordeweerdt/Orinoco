// Affichage du numéro de commande
function displayOrderId() {
  let orderId = document.getElementById('number-order');
  orderId.innerText = localStorage.getItem('orderId');
}
displayOrderId();