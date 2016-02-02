import EventEmitter from "events";
import AppDispatcher from "../AppDispatcher";

import UndoStore from "../stores/UndoStore";

let emitter = new EventEmitter();

function emitChange() {
  emitter.emit("change");
};

let _cartItems = {};

AppDispatcher.register((action) => {
  AppDispatcher.waitFor([UndoStore.getToken()]);
  let handler = handlers[action.type];
  handler && handler(action);
})

let handlers = {
  addCartItem({productId}) {
    let item = {};
    item.id = productId;
    item.quantity = 1;
    _cartItems[productId] = item;
    emitChange();
  },

  removeCartItem({productId}) {
    delete _cartItems[productId];
    emitChange();
  },

  updateCartItemQuantity({productId, quantity}) {
    _cartItems[productId].quantity = quantity;
    emitChange();
  },

  undoShoppingCart({cartItems}) {
    _cartItems = cartItems;
    emitChange();
  }
}

export default {
  getCartItems() {
    return _cartItems;
  },

  cartItems() {
    return _cartItems;
  },

  addChangeListener(callback) {
    emitter.addListener("change",callback)
  },

  removeChangeListener(callback) {
    emitter.removeListener("change",callback)
  }
};