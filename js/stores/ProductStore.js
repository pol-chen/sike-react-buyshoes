const EventEmitter = require("events");
const AppDispatcher = require("../AppDispatcher");

const LikeStore = require("./LikeStore");

const {products} = require("../data");

let emitter = new EventEmitter();

let _products = products;

let _showOnlyLike = false;

function emitChange() {
	emitter.emit("change");
}

AppDispatcher.register((action) => {
	let handler = handlers[action.type];
	handler && handler(action);
})

let handlers = {
	toggleShowOnlyLike() {
		_showOnlyLike = !_showOnlyLike;
		emitChange();
	}
}

module.exports = {
	products() {
		return _products;
	},

	filteredProducts() {
		if (!_showOnlyLike) {
			return _products;
		} else {
			let likeItems = LikeStore.getLikeItems();
			let _likeProducts = {};
			Object.keys(_products).forEach(id => {
				if (likeItems[id]) {
					_likeProducts[id] = _products[id];
				};
			});
			return _likeProducts;
		}
	},

	isShowOnlyLike() {
		return _showOnlyLike;
	},

	toggleShowOnlyLike() {
		_showOnlyLike = !_showOnlyLike;
		emitChange();
	},

	addChangeListener(callback) {
		emitter.addListener("change", callback);
	},
	removeChangeListener(callback) {
		emitter.removeListener("change", callback);
	}
}