// Fonction qui tranforme le prix en une valeur claire
const tranformPrice = (price) => {
  const lastPrice =  price/100;
  return lastPrice
};

let element = document.getElementById('back-link');
element.setAttribute('href', document.referrer);
element.onclick = function() {
  history.back();
  return false;
}

