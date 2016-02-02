const Ps = require("perfect-scrollbar");
const React = require("react");

const connect = require("./connect");

const QuantityControl = require("./QuantityControl");

const CartStore = require("../stores/CartStore");
const {removeCartItem,undoShoppingCart} = require("../actions/actions");

const ProductStore = require("../stores/ProductStore");
const UndoStore = require("../stores/UndoStore");

let CartItem = React.createClass({
  removeProductFromCart(id) {
  	removeCartItem(id);
  },
  render() {
  	let {item} = this.props;
  	let {id,quantity} = this.props.item;
  	let {name,price,imagePath} = this.props.product;

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
          <img className="cart-item__trash" src="img/trash-icon.svg" onClick={this.removeProductFromCart.bind(this,id)} />
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
  	// CartStore.addChangeListener(this.forceUpdate.bind(this));
  },

  undo() {
    undoShoppingCart();
  },

  renderCartItems() {
  	// let cartItems = CartStore.getCartItems();
    let {cartItems,products} = this.props;
  	let cartItemViews = Object.keys(cartItems).map(id => {
  		return <CartItem key={id} item={cartItems[id]} product={products[id]} />;
  	});
  	return cartItemViews;
  },

  render() {
    let {isUndoable} = this.props;
    let undoDisplay = isUndoable ? (
      <h3 className="cart__undo"><a onClick={this.undo.bind(this)}>undo</a></h3>
    ) : ("");

    return (
	    <div className="cart">
        <h3 className="cart__title">Shopping Cart</h3>
        <div className="cart__content" ref="cart">
          <h3 className="cart__title cart__title--spacer">Shopping Cart</h3>
          {this.renderCartItems()}
        </div>
        {undoDisplay}
      </div>
    );
  }
});

// class ConnectedCart extends React.Component {
//   render() {
//     return (
//       <ConnectedStore store={CartStore} propNames={["cartItems"]}>
//         {propValues => <Cart {...propValues} />}
//       </ConnectedStore>
//     )
//   }
// }

@connect(CartStore,"cartItems")
@connect(ProductStore,"products")
@connect(UndoStore,"isUndoable")
class ConnectedCart extends Cart {};

module.exports = ConnectedCart;


// class ConnectedCart extends Cart {};
// ConnectedCart = connect(CartStore,"cartItems")(ConnectedCart);

// module.exports = ConnectedCart;

// module.exports = MakeConnectedComponent(Cart, CartStore, "cartItems");