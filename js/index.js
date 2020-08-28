// Ciblage des elements UI
const productImage = document.getElementById('product-image');
const productName = document.getElementById('product-name');
const productPrice = document.getElementById('product-price');
const productDescription = document.getElementById('product-description');

// Ciblage des elements UI
const productsGrid = document.getElementById('products-grid');

// Je fais ma requète à l'API en utilisant une fonction qui va vérifier que ma requète réponde une fois celle-ci terminée.
fetch('http://localhost:3000/api/cameras/')
.then(function(response) {
  return response.json();
})
.then(function(json) {
  let cameras = json;
  showAllCameras(cameras);
  displayCart();
})
.catch(function(err) {
  console.log('Fetch problem: ' + err.message);
});

// Fonction qui va afficher toutes les cameras de l'API
function showAllCameras(cameras) {
    
  // On crée une boucle qui va parcourir l'objet cameras
  for (let i = 0; i < cameras.length; i++) {
    let sectionCard = document.createElement('div')
    let subSectionCard = document.createElement('div')
    let productImage = document.createElement('img');
    let productName = document.createElement('h2');
    let productPrice = document.createElement('h2');
    let productLink = document.createElement('a');

    // Ajout d'un query param pour chaque URL de chaque produit
    const newURL = `product.html?camera_id=${cameras[i]._id}`;

    // Ajout de class aux elements créés
    sectionCard.classList.add('prev-card', 'col-12', 'col-md-6');
    subSectionCard.classList.add('subsection-card');
    productLink.setAttribute("href", newURL);

    // Implémentation des elements dans le HTML
    productsGrid.appendChild(sectionCard);
    sectionCard.appendChild(productLink);
    productLink.appendChild(productImage);
    productLink.appendChild(subSectionCard);
    subSectionCard.appendChild(productName);
    subSectionCard.appendChild(productPrice);

    // Raccord aux propriétés de l'objet
    productImage.src = cameras[i].imageUrl;
    productName.innerHTML = cameras[i].name;
    productPrice.innerHTML = tranformPrice(cameras[i].price) + " €"; 

  }
};