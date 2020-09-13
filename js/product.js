// Actualisation du panier dans le header
displayCart();

// Fonction qui permet de faire un retour sur la page précédente
let element = document.getElementById('back-link');
element.setAttribute('href', document.referrer);
element.onclick = function() {
  history.back();
  return false;
}

// Je fais un fetch pour récuperer les informations sur ma camera, de mon API
const getCamera = async function() {
  try {
    // On utilise la méthode URLSearchParams pour aller récuperer 
    // l'id de la camera concernée dans l'URL de la page.
    let urlParams = new URLSearchParams(window.location.search);
    let myParam = urlParams.get('myParam');
    let id = urlParams.get('camera_id');
    // On fait un fetch d'une seule caméra
    let response = await fetch('http://localhost:3000/api/cameras/' + id)
    if (response.ok) {
      // On stocke l'objet dans la variable "camera"
      let camera = await response.json();
      // On affiche ensuite les informations 
      // ainsi que le bouton ajouter au panier
      showCameraInformation(camera);
      eventListenerAddItemToCart(camera);
    } else {
      console.error('Retour du serveur: ', await response.status);
    }
    return response;
  } catch (e) {
    console.log(e)
  }
}
getCamera();


// Fonction qui va afficher une camera sur une fiche produit avec l'API
function showCameraInformation(camera) {
  // Ciblage des elements UI
  let productImage = document.getElementById('product-image');
  let productName = document.getElementById('product-name');
  let productPrice = document.getElementById('product-price');
  let productDescription = document.getElementById('product-description');

  // On attribut les valeurs aux elements
  productImage.src = camera.imageUrl;
  productName.innerHTML = camera.name;
  productPrice.innerHTML = tranformPrice(camera.price);
  productDescription.innerHTML = camera.description;

  // Insertion des valeurs de lenses dans le select
  const selectelm = document.getElementById('lenses-select');
  const allLenses = camera.lenses;
  let selected;
  let selectedKey = [0];
	let i = 0;
	selectelm.options.length = 0;
	for (let key in allLenses) {
		// permet de choisir le champ à définir par défaut
		if (selectedKey == key) {
        selected = i;
    }
    // J'utilise ici une méthode Options 
    // qui va créer des balises options pour chaque valeurs de lenses
		selectelm.options[selectelm.length] = new Option(allLenses[key],allLenses[key]);
		i++;
	}
	//permet de positionner la combo sur le bon champ
  selectelm.selectedIndex = selected;
}

// Function EventListener - qui va écouter le clique sur le bouton Ajouter ua panier
function eventListenerAddItemToCart(camera) {
  const selectelm = document.getElementById('lenses-select');
  const addToCart = document.getElementById('add-to-cart');
  // EventListener
  addToCart.addEventListener('click', function() {
    const lense = selectelm.value;
    let item = new Item(camera, lense);
    // On vérifie que le shoppingCart n'est pas vide
    if (localStorage.getItem('shoppingCart') === null || localStorage.getItem('shoppingCart') === "" || localStorage.getItem('shoppingCart') === undefined) {
      localStorage.setItem('shoppingCart', JSON.stringify([item]));
    } else {
      // s'il n'est pas vide, on ajoute le premier produit
      shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
      shoppingCart.push(item);
      localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
    }
    displayCart();
  });
}