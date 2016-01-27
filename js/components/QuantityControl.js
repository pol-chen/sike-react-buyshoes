const React = require("react");

const CartStore = require("../stores/CartStore");
const {updateCartItemQuantity} = CartStore;

let QuantityControl = React.createClass({
  plusQuantity(id, quantity) {
    updateCartItemQuantity(id,quantity+1);
  },
  minusQuantity(id, quantity) {
    if (quantity > 1) {
      updateCartItemQuantity(id,quantity-1);
    };
  },

  render() {
  	let {variant} = this.props;
  	let {id,quantity} = this.props.item;
  	let className = 'adjust-qty';
  	if (variant == 'gray') {
  		className += ' adjust-qty--gray';
  	};
    return (

        <div className={className}>
          <a className="adjust-qty__button" onClick={this.minusQuantity.bind(this,id,quantity)}>-</a>
          <div className="adjust-qty__number">{quantity}</div>
          <a className="adjust-qty__button" onClick={this.plusQuantity.bind(this,id,quantity)}>+</a>
        </div>
    );
  }
});

module.exports = QuantityControl;