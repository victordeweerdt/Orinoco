// Fonction qui tranforme le prix en une valeur claire
// --> FAIRE UN TEST UNITAIRE

const tranformPrice = (price) => {
  const lastPrice =  price/100;
  return lastPrice
};

// Fonction qui permet de faire un retour sur la page précédente
let element = document.getElementById('back-link');
element.setAttribute('href', document.referrer);
element.onclick = function() {
  history.back();
  return false;
}

