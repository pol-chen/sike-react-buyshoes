const React = require("react");

const connect = require("./connect");

const ProductStore = require("../stores/ProductStore");
const CartStore = require("../stores/CartStore");

let Checkout = React.createClass({
  componentDidMount() {
    CartStore.addChangeListener(this.forceUpdate.bind(this));
  },
  render() {
    // let cartItems = CartStore.getCartItems();
    let {products,cartItems} = this.props;
  	let discount = 0;
  	let subtotal = 0;
  	Object.keys(cartItems).forEach(id => {
  		let price = products[id].price;
  		let quantity = cartItems[id].quantity;
  		subtotal += price * quantity;
  	});
  	let saving = subtotal - discount;
    
    return (

      <div className="checkout">
        <hr className="checkout__divider" />
        <input type="text" className="checkout__coupon-input" placeholder="coupon code" />
        <div className="checkout__line">
          <div className="checkout__line__label">
            Discount
          </div>
          <div className="checkout__line__amount">
            {'-$'+discount}
          </div>
        </div>
        <div className="checkout__line">
          <div className="checkout__line__label">
            Subtotal
          </div>
          <div className="checkout__line__amount checkout__line__amount--strikeout">
            {'$'+subtotal.toFixed(2)}
          </div>
        </div>
        <div className="checkout__line">
          <div className="checkout__line__amount checkout__line__amount--omg-savings">
            {'$'+saving.toFixed(2)}
          </div>
        </div>
        <a className="checkout__button">
          <img className="checkout__button__icon" src="img/cart-icon.svg" />
          <div className="checkout__button__label">
            Checkout
          </div>
        </a>
      </div>
    );
  }
});

@connect(CartStore,"cartItems")
@connect(ProductStore,"products")
class ConnectedCheckout extends Checkout {}

module.exports = ConnectedCheckout;