// Ciblage des elements UI
const productImage = document.getElementById('product-image');
const productName = document.getElementById('product-name');
const productPrice = document.getElementById('product-price');
const productDescription = document.getElementById('product-description');
const s = document.getElementById('lenses-select');

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
  console.log(camera);
})
.catch(function(err) {
  console.log('Fetch problem: ' + err.message);
});


function showCameraInformation(camera) {
  // On attribut les valeurs aux elements
  productImage.src = camera.imageUrl;
  productName.innerHTML = camera.name;
  productPrice.innerHTML = tranformPrice(camera.price);
  productDescription.innerHTML = camera.description;

  // Insertion des valeurs de lenses dans le select
  const allLenses = camera.lenses;
  var selected;
  var selectedKey = [0];
	var i=0;
	s.options.length = 0;
 
	for (var key in allLenses) 
	{
		// permet de choisir le champ à définir par défaut
		if (selectedKey == key) 
		{
			selected = i;
		}
 
		s.options[s.length] = new Option(allLenses[key],key);
		i++;
	}
	//permet de positionner la combo sur le bon champ
  s.selectedIndex = selected;
  displayCart();
}


// *****************************************
// Cart Events Listener
// ***************************************** 

// Je récupère la valeur séléctionée de la lense
document.getElementById("lenses-select").addEventListener("change", selectLensesEvent);

function selectLensesEvent() {
  let lenseSelected = event.target.value;
  lenseSelected = "";
  console.log(lenseSelected);
};

// Add item to Cart
const addToCart = document.getElementById('add-to-cart');

addToCart.addEventListener('click', function() {
  event.preventDefault();
  var name = document.getElementById('product-name').textContent;
  var price = document.getElementById('product-price').textContent;
  var lenses = this.lenseSelected;
  shoppingCart.addItemToCart(name, price, lenses, 1);

  displayCart();
});