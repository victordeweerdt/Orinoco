// Actualisation du panier dans le header
displayCart();

// Je fais un fetch pour récuperer les informations sur mes camera, de mon API
// --> JE FAIS UN TEST CASE
const getCameras = async function() {
  try {
    let response = await fetch('http://localhost:3000/api/cameras/')
    if (response.ok) {
      let cameras = await response.json();
      console.log(cameras);
      showAllCameras(cameras);
    } else {
      console.error('Retour du serveur: ', await response.status);
    }
  } catch (e) {
    console.log(e)
  }
}
getCameras();

// Fonction qui va afficher toutes les cameras de l'API
// --> COMMENT JE FAIS UN TEST CASE DE CETTE FONCTION ?
function showAllCameras(cameras) {

  // Ciblage des elements UI
  const productsGrid = document.getElementById('products-grid');

  // On crée une boucle qui va parcourir l'objet cameras
  for (let i = 0; i < cameras.length; i++) {
    // Création des elements UI
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