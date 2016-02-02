const EventEmitter = require("events");

let emitter = new EventEmitter();

function emitChange() {
	emitter.emit("change");
}

let _likeItems = {};

module.exports = {
	getLikeItems() {
		return _likeItems;
	},
	likeItems() {
		return _likeItems;
	},

	addLikeItem(productId) {
		let likeItem = {};
		likeItem.id = productId;
		_likeItems[productId] = likeItem;
		emitChange();
	},
	removeLikeItem(productId) {
		delete _likeItems[productId];
		emitChange();
	},
	addChangeListener(callback) {
		emitter.addListener("change", callback);
	},
	removeChangeListener(callback) {
		emitter.removeListener("change", callback);
	}
}