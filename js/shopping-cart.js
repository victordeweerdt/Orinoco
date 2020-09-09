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