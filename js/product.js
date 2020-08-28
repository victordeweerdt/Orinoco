const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('myParam');
const id = urlParams.get('camera_id');


fetch('http://localhost:3000/api/cameras/' + id)
.then(function(response) {
  return response.json();
})
.then(function(json) {
  let camera = json;
  showCameraInformation(camera);
  eventListenerAddItemToCart(camera);
  console.log(camera);
})




function showCameraInformation(camera) {

  // Ciblage des elements UI
  const productImage = document.getElementById('product-image');
  const productName = document.getElementById('product-name');
  const productPrice = document.getElementById('product-price');
  const productDescription = document.getElementById('product-description');

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
	for (var key in allLenses) {
		// permet de choisir le champ à définir par défaut
		if (selectedKey == key) {
        selected = i;
    }
		selectelm.options[selectelm.length] = new Option(allLenses[key],allLenses[key]);
		i++;
	}
	//permet de positionner la combo sur le bon champ
  selectelm.selectedIndex = selected;

  displayCart();
}


function eventListenerAddItemToCart(camera) {

  // CART EVENT LISTENER
  const selectelm = document.getElementById('lenses-select');
  const addToCart = document.getElementById('add-to-cart');
  addToCart.addEventListener('click', function() {
    const lense = selectelm.value;
    let item = new Item(camera, lense);
    // test
    console.log(item);
    if (localStorage.getItem('shoppingCart') === null) {
      localStorage.setItem('shoppingCart', JSON.stringify([item]));
    } else {
      shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
      // Je vérifie que la camera n'est pas dans le panier et ajoute une quantité si c'est le cas
      // for(let item in shoppingCart) {
        // if(shoppingCart[item].camera === camera) {
          // shoppingCart[item].count ++;
          // shoppingCart.push(item);
          // localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
          // return;
        // }
      // }
      shoppingCart.push(item);
      localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
    }
    displayCart();
  });
}