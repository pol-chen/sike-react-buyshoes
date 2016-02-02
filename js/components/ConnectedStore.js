const React = require("react");

let ConnectedStore = React.createClass ({
  componentDidMount() {
    this.props.store.addChangeListener(this.forceUpdate.bind(this));
  },
    
  render() {
    let contentRenderFunction = this.props.children;
    let {store,propNames} = this.props;
    let storeProps = {};
    
    propNames.forEach(propName => {
      storeProps[propName] = store[propName]();
    });

    return contentRenderFunction(storeProps);
  }
});

module.exports = ConnectedStore;