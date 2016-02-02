const EventEmitter = require("events");

const LikeStore = require("./LikeStore");

const {products} = require("../data");

let emitter = new EventEmitter();

let _products = products;

let _showOnlyLike = false;

function emitChange() {
	emitter.emit("change");
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