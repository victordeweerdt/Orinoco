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
  let shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
  // On fait appel à une fonction 
  // qui grouper les cameras par id, puis on stocke le résultat
  // dans une nouvelle variable.
  let shoppingCartGrouped = groupCameraById();
  console.log(shoppingCartGrouped);
  const cartItems = document.getElementById('cart-items');
    
  // On crée une boucle qui va parcourir l'objet shoppingCartGrouped
  for (let camera in shoppingCartGrouped) {
    let displayLensesGrouped = groupLensesByName(camera);
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

    // Liens avec les propriétés
    itemImage.src = shoppingCartGrouped[camera][0].camera.imageUrl;
    itemName.innerText = shoppingCartGrouped[camera][0].camera.name;
    itemQty.innerText = "Qty : " + shoppingCartGrouped[camera].length;
    itemPrice.innerText = totalPrice + ' €';
    itemLenses.innerHTML = displayLensesPerName(camera);
    totalCart.innerText = tranformPrice(countTotalCart(shoppingCart));

    displayCart();

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


// EventListener - pour le submit du formulaire
document.forms["myForm"].addEventListener('submit', function(event) {

  event.preventDefault();
  let shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
  let error = document.getElementById("error");

  let inputs = this;
  for (let i = 0; i < inputs.length; i++) {
    // Je vais faire une boucle pour vérifier que chaque champ est bien rempli
    // et lui donner une bordure rouge s'il est manquant.
    inputs[i].style.border = "1px solid #EAEAEA";
    if (!inputs[i].value && i != 3) {
      inputs[i].style.border = "1px solid red";
      error.innerHTML = "Please fill the field.";
      event.preventDefault();
      return false;
    }
  }

  // MES REGEX
  // Email
  // Je lui demande de controler qu'il y a bien un @ et un .
  // afin que ce soit une adresse valide.
  let myEmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (!myEmailRegex.test(inputs["email"].value)) {
    error.innerHTML = "Your email is incorrect.";
    inputs["email"].style.border = "1px solid red";
    event.preventDefault();
    return false;
  }

  // Names
  // Je lui demande de controler qu'il y a bien que des lettres et quelques caractères spéciaux
  // afin que ce soit un nom valide.
  let myNameRegex = /^[a-zA-Z-\s]+$/;
  if (!myNameRegex.test(inputs["name"].value)) {
    error.innerHTML = "Your name is incorrect.";
    inputs["name"].style.border = "1px solid red";
    event.preventDefault();
    return false;
  }

  // Zip
  // Je lui demande de controler qu'il y a bien que des chiffres
  // afin que ce soit un zip valide.
  let myZipRegex = /^[0-9\s]+$/;
  if (!myZipRegex.test(inputs["zip"].value)) {
    error.innerHTML = "Your zip code is incorrect.";
    inputs["zip"].style.border = "1px solid red";
    event.preventDefault();
    return false;
  }

  // Phone number
  // Je lui demande de controler qu'il y a bien que des chiffres
  // afin que ce soit un numéro valide.
  let myPhoneRegex = /^\+?[0-9()\s]+$/;
  if (!myPhoneRegex.test(inputs["phone"].value)) {
    error.innerHTML = "Your phone number is incorrect.";
    inputs["phone"].style.border = "1px solid red";
    event.preventDefault();
    return false;
  }  
    
  // FETCH qui va envoyer les données à l'API, puis va initialiser le panier à 0
  const postOrder = async function(data) {
    // Je fais un POST, en précisant le type de contenu que j'envoie et ce que j'envoie.
    let response = await fetch('http://localhost:3000/api/cameras/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    // On récupère la réponse
    let responseData = await response.json();
    // On stocke l'id correspondant à la réponse dans le localStorage
    localStorage.setItem('orderId', responseData.orderId);
  };
  postOrder(buildOrderData(shoppingCart, this));
  // On remet à 0 le shoppingCart
  localStorage.setItem('shoppingCart', []);
  // On stocke le prix total dans le localStorage
  localStorage.setItem('totalPrice', countTotalCart(shoppingCart));
  // On part sur la page de confirmation
  return window.location = "confirmation.html";
});


// Cette fonction va construire l'element 
// que l'on va envoyer lors du submit du formulaire
function buildOrderData(cart, inputs) {
  // Création du tableau de produits
  let products = cart.map(objectCamera => objectCamera.camera._id)
  // Création de l'objet contact
  let contact = {
       firstName: inputs[1].value,
       lastName: inputs[2].value,
       address: inputs[3].value,
       city: inputs[5].value,
       email: inputs[0].value
  }
  console.log(contact);
  console.log(products);
  // On retourne le tout dans un objet
  return {
    contact, products}
}