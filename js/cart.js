// Actualisation du panier dans le header
displayCart();

// Fonction qui permet de faire un retour sur la page précédente
let element = document.getElementById('back-link');
element.setAttribute('href', document.referrer);
element.onclick = function() {
  history.back();
  return false;
}

// Afficher le bon bloc en fonction de si le panier est vide ou non
function checkCart() {
  let cartContent = document.querySelector('.cart-content');
  let cartEmpty = document.querySelector('.cart-empty');
  // Si le shoppingCart est vide, on affiche un bloc 
  // qui nous avertira que le panier est vide
  // et si c'est le cas on stop le js de la page
  if (localStorage.getItem('shoppingCart') === null || localStorage.getItem('shoppingCart') === "" || localStorage.getItem('shoppingCart') === undefined) {
    cartContent.style.display = "none";
    return false;
  } else {
    // Si le shoppingCart contient des produits,
    // alors on affiche les cameras.
    return cartEmpty.style.display = "none";
  }
}
checkCart();

// Je fais un fetch pour récuperer les informations sur mes camera, de mon API
const getCameras = async function() {
  try {
    let response = await fetch('http://localhost:3000/api/cameras/')
    if (response.ok) {
      // Si on a une réponse, on stocke l'objet dans une variable "cameras"
      let cameras = await response.json();
      console.log(cameras);
      // Puis on affiche les produits qui se trouve dans le panier
      showItemsInCart();
    } else {
      console.error('Retour du serveur: ', await response.status);
    }
    return response;
  } catch (e) {
    console.log(e)
  }
}
getCameras();

/// Fonction qui va afficher toutes les cameras du panier
function showItemsInCart() {
  if (localStorage.getItem('shoppingCart') === null || localStorage.getItem('shoppingCart') === "" || localStorage.getItem('shoppingCart') === undefined) {
    return false;
  } else {
    shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
    // On fait appel à une fonction 
    // qui grouper les cameras par id, puis on stocke le résultat
    // dans une nouvelle variable.
    let shoppingCartGrouped = groupCameraById();

    // Je cible mon elem UI
    const cartItems = document.getElementById('cart-items');
    
    // On crée une boucle qui va parcourir shoppingCartGrouped
    for (let camera in shoppingCartGrouped) {
      let displayLensesGrouped = groupLensesByName(camera);
      console.log(displayLensesGrouped);
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
      let totalPrice = tranformPrice(shoppingCartGrouped[camera][0].camera.price)*shoppingCartGrouped[camera].length;

      // Liens avec l'objet shoppingCartGrouped
      itemImage.src = shoppingCartGrouped[camera][0].camera.imageUrl;
      itemName.innerText = shoppingCartGrouped[camera][0].camera.name;
      itemQty.innerText = "Qty : " + shoppingCartGrouped[camera].length;
      itemPrice.innerText = totalPrice + ' €';
      itemLenses.innerHTML = displayLensesPerName(camera);
      totalCart.innerText = tranformPrice(countTotalCart(shoppingCart));

      // Actualisation du panier dans le header
      displayCart();
    } 
  }
};


// Grouper les cameras par iD
function groupCameraById(shoppingCart) {
  if (localStorage.getItem('shoppingCart') === null || localStorage.getItem('shoppingCart') === "" || localStorage.getItem('shoppingCart') === undefined) {
    return false;
  } else {
    // On fait un reduce, ce qui va grouper les elements
    shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
    return shoppingCart.reduce(function(h, obj) {
      h[obj.camera.name] = (h[obj.camera.name] || []).concat(obj);
      return h; 
    },{})
  }
}

// Affichage des lenses
// On va faire la même chose que pour les cameras, 
// on groupe les lenses par leurs noms.
function groupLensesByName(camera) {
  let shoppingCartGrouped = groupCameraById();
  return shoppingCartGrouped[camera].reduce(function(h, obj) {
    h[obj.lense] = (h[obj.lense] || []).concat(obj);
    return h; 
  },{})
}

// Puis on les affiche sous forme de liste.
function displayLensesPerName(camera) {
  let displayLensesGrouped = groupLensesByName(camera);
  result = '';
  for (let lense in displayLensesGrouped) {
    result += ("<li>" + lense + " (" + displayLensesGrouped[lense].length + ")</li>") + '';
  }
  return result;
}

//
// Calculer le total du panier
function countTotalCart(shoppingCart) {
  let som = 0;
  shoppingCart.map(item => {
      som += item.camera.price
  });
  return som;
}
