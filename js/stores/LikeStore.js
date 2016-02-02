const EventEmitter = require("events");
const AppDispatcher = require("../AppDispatcher");

let emitter = new EventEmitter();

function emitChange() {
	emitter.emit("change");
}

let _likeItems = {};

AppDispatcher.register((action) => {
	let handler = handlers[action.type];
	handler && handler(action);
})

let handlers = {
	addLikeItem({productId}) {
		let likeItem = {};
		likeItem.id = productId;
		_likeItems[productId] = likeItem;
		emitChange();
	},
	removeLikeItem({productId}) {
		delete _likeItems[productId];
		emitChange();
	}
}

module.exports = {
	getLikeItems() {
		return _likeItems;
	},
	likeItems() {
		return _likeItems;
	},
	
	addChangeListener(callback) {
		emitter.addListener("change", callback);
	},
	removeChangeListener(callback) {
		emitter.removeListener("change", callback);
	}
}