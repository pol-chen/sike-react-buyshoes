import EventEmitter from "events";
import AppDispatcher from "../AppDispatcher";
import _ from "lodash";

import CartStore from "./CartStore";

let emitter = new EventEmitter();

function emitChange() {
	emitter.emit("change");
}

let _history = [];

function addHistoryItem() {
	let historyItem = _.cloneDeep(CartStore.getCartItems());
	_history.push(historyItem);
	emitChange();
}

let token = AppDispatcher.register((action) => {
	if (action.type === "addCartItem" || action.type === "removeCartItem") {
		addHistoryItem();
	}
})

export default {
	lastHistoryItem() {
		if (_history.length) {
			return _history.pop();
		}
	},

	isUndoable() {
		return _history.length ? true : false;
	},

	getToken() {
		return token;
	},

	addChangeListener(callback) {
		emitter.addListener("change", callback);
	},

	removeChangeListener(callback) {
		emitter.removeListener("change", callback);
	}
}