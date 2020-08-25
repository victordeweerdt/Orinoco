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
  groupCameraById();
  let obj = shoppingCartGrouped;
  const cartItems = document.getElementById('cart-items');
    
  // On crée une boucle qui va parcourir l'objet cameras
  for (let i in obj) {
    let item = document.createElement('div');
    item.classList.add('item');
    let itemImage = document.createElement('img');
    itemImage.classList.add('item__image');
    let itemNameAndLenses = document.createElement('div');
    itemNameAndLenses.classList.add('item__name-lenses');
    let itemName = document.createElement('h2');
    itemName.classList.add('item__name');
    let itemQtyDiv = document.createElement('div');
    itemQtyDiv.classList.add('itemDiv__qty');
    let itemQty = document.createElement('span');
    itemQty.classList.add('item__qty');
    let itemPrice = document.createElement('p');
    itemPrice.classList.add('item__price');
    let itemLenses = document.createElement('p');
    itemLenses.classList.add('item__lenses');
    let itemMinus = document.createElement('button');
    itemMinus.classList.add('item-minus');
    let itemPlus = document.createElement('button');
    itemPlus.classList.add('item-plus');
    let totalCart = document.getElementById('cart-total');

    // Implémentation des elements dans le HTML
    cartItems.appendChild(item);
    item.appendChild(itemImage);
    item.appendChild(itemNameAndLenses)
    itemNameAndLenses.appendChild(itemName);
    itemNameAndLenses.appendChild(itemLenses)
    item.appendChild(itemQtyDiv);
    itemQtyDiv.appendChild(itemMinus);
    itemQtyDiv.appendChild(itemQty);
    itemQtyDiv.appendChild(itemPlus);
    item.appendChild(itemPrice);

    // Calcule du prix total pour chaque camera
    let totalPrice = tranformPrice(shoppingCartGrouped[i][0].camera.price)*shoppingCartGrouped[i].length;

    // Liens avec les propriétés
    itemImage.src = shoppingCartGrouped[i][0].camera.imageUrl;
    itemName.innerText = shoppingCartGrouped[i][0].camera.name;
    itemQty.innerText = shoppingCartGrouped[i].length;
    
    itemPrice.innerText = totalPrice;
    showLensesForEachCamera(i);
    itemLenses.innerText = arrayLenses.toString();
    itemMinus.innerText = "-";
    itemPlus.innerText = "+";
    totalCart.innerText = tranformPrice(countTotalCart(shoppingCart));

    console.log(itemPrice.innerText);

    // EventListener
    // -1
    itemMinus.addEventListener('click', function() {
      let name = itemName.innerText;
      removeItemFromCart(name);
      displayCart();
    })




    displayCart();

  }
};

// Récupérer la valeur de chaque lense et les mettre dans un tableau
function showLensesForEachCamera(i) {
  let camera = shoppingCartGrouped[i];
  originalArrayLenses = shoppingCartGrouped[i][0].camera.lenses;
  arrayLenses = [];
  for (let j = 0; j < camera.length; j++) {
    arrayLenses.push(camera[j].lense);
  }
  console.log(arrayLenses);
}



// Grouper les cameras par iD
function groupCameraById() {
  shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
  shoppingCartGrouped = shoppingCart.reduce(function(h, obj) {
    h[obj.camera.name] = (h[obj.camera.name] || []).concat(obj);
    return h; 
  },{})
  console.log(shoppingCartGrouped);
}

// Calculer le total du panier
function countTotalCart() {
  let som = 0;
  this.shoppingCart.map(item => {
      som += item.camera.price
  });
  return som;
}

// Supprimer un element du panier
function removeItemFromCart(name) {
  shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
  for(let item in shoppingCart) {
    if(shoppingCart[item].camera.name === name) {
      shoppingCart.splice(item, 1);
    }
  }
  console.log(name);
  displayCart();
  console.log(shoppingCart);
}
