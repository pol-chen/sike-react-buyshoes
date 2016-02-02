const AppDispatcher = require("./AppDispatcher");

module.exports = {
	enableLogging() {
	  	AppDispatcher.register((action) => {
	    	console.log(JSON.stringify({
	      		timestamp: new Date(),
	      		action
	    	},undefined,2));
	  	})
	}
}