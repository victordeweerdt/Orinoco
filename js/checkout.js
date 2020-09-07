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
})

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
    let itemLenses = document.createElement('ul');
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
    itemLenses.innerHTML = displayLensesPerName(i);
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
    result += ("<li>" + lense + " (" + displayLensesGrouped[lense].length + ")</li>") + '';
  }
  return result;
}


// Calculer le total du panier
function countTotalCart() {
  let som = 0;
  this.shoppingCart.map(item => {
      som += item.camera.price
  });
  return som;
}

// SUBMIT LISTENER pour le submit du formulaire
document.forms["myForm"].addEventListener('submit', function(event) {

  event.preventDefault();

  let error = document.getElementById("error");

  let inputs = this;
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].style.border = "1px solid #EAEAEA";
    if (!inputs[i].value && i != 3) {
      inputs[i].style.border = "1px solid red";
      error.innerHTML = "Please fill the field.";
      event.preventDefault();
      break;
    }
  }

  // MES REGEX
  // Email
  let myEmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (!myEmailRegex.test(inputs["email"].value)) {
    error.innerHTML = "Your email is incorrect.";
    inputs["email"].style.border = "1px solid red";
    event.preventDefault();
    return false;
  }

  // Names
  let myNameRegex = /^[a-zA-Z-\s]+$/;
  if (!myNameRegex.test(inputs["name"].value)) {
    error.innerHTML = "Your name is incorrect.";
    inputs["name"].style.border = "1px solid red";
    event.preventDefault();
    return false;
  }

  // Zip
  let myZipRegex = /^[0-9\s]+$/;
  if (!myZipRegex.test(inputs["zip"].value)) {
    error.innerHTML = "Your zip code is incorrect.";
    inputs["zip"].style.border = "1px solid red";
    event.preventDefault();
    return false;
  }

  // Phone number
  let myPhoneRegex = /^\+?[0-9()\s]+$/;
  if (!myPhoneRegex.test(inputs["phone"].value)) {
    error.innerHTML = "Your phone number is incorrect.";
    inputs["phone"].style.border = "1px solid red";
    event.preventDefault();
    return false;
  }

  // Création d'une requète pour envoie des données client
  // Sortir le tableau des produits avec un map
  fetch('http://localhost:3000/api/cameras/order', {
    method: 'post',
    body: buildOrderData(shoppingCart, this)
  }).then(function (response) {
    return response.json();
  }).then(function (text) {
    console.log(text);
    // window.location = 'confirmation.html';
  })

});

// Cette fonction va générer un nombre qui définira le numéro de commande
function generateTrackingNumber() {
  return Math.floor(Math.random() * 1000000);
}

// Cette fonction va construire l'element que l'on va envoyer lors du submit du formulaire
function buildOrderData(cart, inputs) {
  let products = cart.map(objectCamera => objectCamera.camera._id)
  let contact = {
       firstName: inputs[1].value,
       lastName: inputs[2].value,
       address: inputs[3].value,
       city: inputs[5].value,
       email: inputs[0].value
  }
  return contact + products;
}