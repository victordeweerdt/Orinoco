// SHOPPING CART

// Function constructor qui va me permettre de construire un objet 
// avec l'objet camera, la bonne lense et le nombre
class Item {
  constructor(camera, lenseSelected) {
    this.camera = camera;
    this.lense = lenseSelected;
  }
}


// Affichage du nombre d'article dans le panier displayCart()
function displayCart() {
  let countItem = document.querySelector('#count-items');
  let shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
  countItem.innerText = shoppingCart ? shoppingCart.length : 0;
}