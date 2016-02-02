const {Dispatcher} = require("flux");

let dispatcher = new Dispatcher();

let tokenA = dispatcher.register((action) => {
  console.log("A", action);
});

let tokenB = dispatcher.register((action) => {
  dispatcher.waitFor([tokenA,tokenC]);
  console.log("B", action);
});

let tokenC = dispatcher.register((action) => {
  console.log("C", action);
});

dispatcher.dispatch({type: "test"});