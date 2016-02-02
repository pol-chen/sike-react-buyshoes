const AppDispatcher = require("../AppDispatcher");
const UndoStore = require("../stores/UndoStore");

function addCartItem(productId) {
    AppDispatcher.dispatch({type: "addCartItem", productId: productId});
}

function removeCartItem(productId) {
    AppDispatcher.dispatch({type: "removeCartItem", productId: productId});
}

function updateCartItemQuantity(productId, quantity) {
    AppDispatcher.dispatch({type: "updateCartItemQuantity", productId: productId, quantity:quantity});
}

function undoShoppingCart() {
    let cartItems = UndoStore.lastHistoryItem();
    AppDispatcher.dispatch({type: "undoShoppingCart", cartItems: cartItems})
}

function addLikeItem(productId) {
    AppDispatcher.dispatch({type: "addLikeItem", productId: productId});
}

function removeLikeItem(productId) {
    AppDispatcher.dispatch({type: "removeLikeItem", productId: productId});
}

function toggleShowOnlyLike() {
    AppDispatcher.dispatch({type: "toggleShowOnlyLike"});
}

module.exports = {
	addCartItem,
	removeCartItem,
	updateCartItemQuantity,
	undoShoppingCart,
	addLikeItem,
	removeLikeItem,
	toggleShowOnlyLike
}