
function makeCartScrollNicely() {
  var cart = document.querySelector(".cart");
  Ps.initialize(cart);
}

window.onload = function() {
  console.log("page loaded");
  makeCartScrollNicely();
}