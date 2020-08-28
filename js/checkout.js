// Dénomination UI des elements à cibler
let cartContent = document.querySelector('.cart-content');
let cartEmpty = document.querySelector('.cart-empty');

// Fetch
fetch('http://localhost:3000/api/cameras/')
.then(function(response) {
  return response.json();
})
.then(function(json) {
  let cameras = json;
  console.log(cameras);
  showItemsInCart();
  checkCart();
})


// Vérifier si le panier est vide
function checkCart() {
  shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
  if (shoppingCart === null) {
      cartContent.style.display = "none";
  } else {
      cartEmpty.style.display = "none";
  }
}


/// Fonction qui va afficher toutes les cameras du panier
function showItemsInCart() {
  let shoppingCartGrouped = groupCameraById();
  console.log(shoppingCartGrouped);
  const cartItems = document.getElementById('cart-items');
    
  // On crée une boucle qui va parcourir l'objet cameras
  for (let i in shoppingCartGrouped) {
    let displayLensesGrouped = groupLensesByName(i);
    console.log(displayLensesGrouped);
    // Changer le i par camera
    let item = document.createElement('div');
    item.classList.add('item');
    let itemImage = document.createElement('img');
    itemImage.classList.add('item__image');
    let itemNameAndLenses = document.createElement('div');
    itemNameAndLenses.classList.add('item__name-lenses');
    let itemName = document.createElement('h2');
    itemName.classList.add('item__name');
    let itemQty = document.createElement('span');
    itemQty.classList.add('item__qty');
    let itemPrice = document.createElement('p');
    itemPrice.classList.add('item__price');
    let itemLenses = document.createElement('p');
    itemLenses.classList.add('item__lenses');
    let totalCart = document.getElementById('cart-total');

    // Implémentation des elements dans le HTML
    cartItems.appendChild(item);
    item.appendChild(itemImage);
    item.appendChild(itemNameAndLenses)
    itemNameAndLenses.appendChild(itemName);
    itemNameAndLenses.appendChild(itemLenses)
    item.appendChild(itemQty);
    item.appendChild(itemPrice);

    // Calcule du prix total pour chaque camera
    let totalPrice = tranformPrice(shoppingCartGrouped[i][0].camera.price)*shoppingCartGrouped[i].length;

    // Liens avec les propriétés
    itemImage.src = shoppingCartGrouped[i][0].camera.imageUrl;
    itemName.innerText = shoppingCartGrouped[i][0].camera.name;
    itemQty.innerText = "Qty : " + shoppingCartGrouped[i].length;
    
    itemPrice.innerText = totalPrice + ' €';
    itemLenses.innerText = "Lenses : " + displayLensesPerName(i);
    totalCart.innerText = tranformPrice(countTotalCart(shoppingCart));

    displayCart();

  }
};


// Grouper les cameras par iD
function groupCameraById() {
  shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
  return shoppingCart.reduce(function(h, obj) {
    h[obj.camera.name] = (h[obj.camera.name] || []).concat(obj);
    return h; 
  },{})
}

// FUNCTIONS CONCERNANT L'AFFICHAGE DES LENTILLES
// Grouper les lenses par nom
function groupLensesByName(camera) {
  let shoppingCartGrouped = groupCameraById();
  return shoppingCartGrouped[camera].reduce(function(h, obj) {
    h[obj.lense] = (h[obj.lense] || []).concat(obj);
    return h; 
  },{})
}

// Afficher les lenses par nom
function displayLensesPerName(camera) {
  let displayLensesGrouped = groupLensesByName(camera);
  result = '';
  for (let lense in displayLensesGrouped) {
    result += (lense + " (" + displayLensesGrouped[lense].length + ")") + '';
    return result;
  }
}


// Calculer le total du panier
function countTotalCart() {
  let som = 0;
  this.shoppingCart.map(item => {
      som += item.camera.price
  });
  return som;
}
