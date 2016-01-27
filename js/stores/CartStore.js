const EventEmitter = require("events");

let emitter = new EventEmitter();

function emitChange() {
  emitter.emit("change");
};

let _cartItems = {};

module.exports = {
  getCartItems() {
    return _cartItems;
  },

  addCartItem(productId) {
    let item = {};
    item.id = productId;
    item.quantity = 1;
    _cartItems[productId] = item;
    emitChange();
  },
  removeCartItem(productId) {
    delete _cartItems[productId];
    emitChange();
  },
  updateCartItemQuantity(productId,quantity) {
    _cartItems[productId].quantity = quantity;
    emitChange();
  },

  addChangeListener(callback) {
    emitter.addListener("change",callback)
  },

  removeChangeListener(callback) {
    emitter.removeListener("change",callback)
  }
};