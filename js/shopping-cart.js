// SHOPPING CART

// Function constructor qui va me permettre de construire un objet 
// avec l'objet camera et la bonne lense
class Item {
  constructor(camera, lenseSelected) {
    this.camera = camera;
    this.lense = lenseSelected;
  }
}


// Affichage du nombre d'article dans le panier displayCart()
// --> FAIRE UN TEST CASE avec 3 hypothèses, undefined, 0 et 3.
function displayCart() {
  if (localStorage.getItem('shoppingCart') === "" || localStorage.getItem('shoppingCart') === null || localStorage.getItem('shoppingCart') === undefined) {
    let countItem = document.querySelector('#count-items');
    return countItem.innerText = 0;
  } else {
    let countItem = document.querySelector('#count-items');
    let shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
    return countItem.innerText = shoppingCart ? shoppingCart.length : 0;
  }
}
displayCart();