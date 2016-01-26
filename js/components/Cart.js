const Ps = require("perfect-scrollbar");
const React = require("react");

const QuantityControl = require("./QuantityControl");

const {products,cartItems} = require("../data");

let CartItem = React.createClass({
  render() {
  	let {item} = this.props;
  	let {id,quantity} = this.props.item;
  	let {name,price,imagePath} = products[id];

  	let priceDisplay = '$' + price;
  	if (quantity > 1) {
  		priceDisplay += ' × ' + quantity;
  	};

    return (

      <div className="cart-item">
        <div className="cart-item__top-part">
          <div className="cart-item__image">
            <img src={imagePath} />
          </div>
          <div className="cart-item__top-part__middle">
            <div className="cart-item__title">
              {name}
            </div>
            <div className="cart-item__price">
              {priceDisplay}
            </div>
          </div>
          <img className="cart-item__trash" src="img/trash-icon.svg" />
        </div>
	    <div className="cart-item__qty">
	      <QuantityControl item={item} />
        </div>
      </div>
    );
  }
});

let Cart = React.createClass({
  componentDidMount() {
    let $cart = React.findDOMNode(this.refs.cart);
    Ps.initialize($cart);  
  },
  renderCartItems() {
  	let cartItemViews = Object.keys(cartItems).map(id => {
  		return <CartItem key={id} item={cartItems[id]} />;
  	});
  	return cartItemViews;
  },

  render() {
    return (
	  <div className="cart">
        <h3 className="cart__title">Shopping Cart</h3>
        <div className="cart__content" ref="cart">
          <h3 className="cart__title cart__title--spacer">Shopping Cart</h3>
          {this.renderCartItems()}
        </div>
      </div>
    );
  }
});

module.exports = Cart;