const MakeConnectedComponent = require("./MakeConnectedComponent");

function connect(store,...propNames) {
  return (ViewComponent) => {
    return MakeConnectedComponent(ViewComponent, store, ...propNames);
  };
}

module.exports = connect;