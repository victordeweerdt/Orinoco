fetch('http://localhost:3000/api/cameras/')
.then(function(response) {
  return response.json();
})
.then(function(json) {
  let cameras = json;
  console.log(cameras);
  displayCart();
})
.catch(function(err) {
  console.log('Fetch problem: ' + err.message);
});





