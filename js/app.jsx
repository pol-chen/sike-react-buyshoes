let products = {

  "jameson-vulc": {
    id: "jameson-vulc",
    name: "Jameson Vulc",
    price: 64.99,
    imagePath: "img/shoes/jameson-vulc-brown-gum-orig.png",
    gender: "man",
  },

  "marana-x-hook-ups": {
    id: "marana-x-hook-ups",
    name: "Marana X Hook-Up",
    price: 79.99,
    imagePath: "img/shoes/marana-x-hook-ups-black-orig.png",
    gender: "man",
  },

  "jameson-e-lite": {
    id: "jameson-e-lite",
    name: "Jameson E-Lite",
    price: 69.99,
    imagePath: "img/shoes/jameson-e-lite-maroon-orig.png",
    gender: "man",
  },

  "jameson-e-lite-julian-davidson-4": {
    id: "jameson-e-lite-julian-davidson-4",
    name: "Jameson E-Lite Julian Davidson",
    price: 74.99,
    imagePath: "img/shoes/jameson-e-lite-julian-davidson-4-black-gum-orig.png",
    gender: "man",
  },

  "scout-womens-6": {
    id: "scout-womens-6",
    name: "Scout Women's",
    imagePath: "img/shoes/scout-womens-6-teal-orig.png",
    price: 59.99,
    gender: "woman",
  },

  "scout-womens-coco-ho-5": {
    id: "scout-womens-coco-ho-5",
    name: "Scout Women's Coco Ho",
    imagePath: "img/shoes/scout-womens-coco-ho-5-olive-white-orig.png",
    price: 59.99,
    gender: "woman",
  },

  "jameson-2-womens-8": {
    id: "jameson-2-womens-8",
    name: "Jameson 2 Women's",
    imagePath: "img/shoes/jameson-2-womens-8-black-white-gum-orig.png",
    price: 59.99,
    gender: "woman",
  },

  "corby-womens-2": {
    id: "corby-womens-2",
    name: "Corby Women's",
    imagePath: "img/shoes/corby-womens-2-tan-white-orig.png",
    price: 44.99,
    gender: "woman",
  },
};

let cartItems = {
  "jameson-vulc": {
    id: "jameson-vulc",
    quantity: 1,
  },

  "marana-x-hook-ups": {
    id: "marana-x-hook-ups",
    quantity: 2,
  },

  "scout-womens-6": {
    id: "scout-womens-6",
    quantity: 2,
  },

  "scout-womens-coco-ho-5": {
    id: "scout-womens-coco-ho-5",
    quantity: 1,
  },

  "jameson-2-womens-8": {
    id: "jameson-2-womens-8",
    quantity: 1,
  },
};



let App = React.createClass({
  componentDidMount() {
    var $toggle = document.querySelector(".site__right-sidebar-toggle");
    $toggle.addEventListener("click",function() {
      document.body.classList.toggle("js-show-right-sidebar");
    });
  },
  render() {
    return (

      <div className="site">
        <div className="bg">
          <div className="bg__img">
          </div>
        </div>
        <div className="site__main">
          <div className="site__left-sidebar">
            <SiteTitle />
          </div>
          <div className="site__content">
            <Products />
          </div>
        </div>
        <div className="site__right-sidebar">
          <Cart />
          <Checkout />
        </div>
        <a className="site__right-sidebar-toggle">
          <img src="img/arrow-icon.svg" />
        </a>
      </div>
    );
  }
});
let SiteTitle = React.createClass({
  render() {
    return (

      <div className="title">
        <h2>Buy Me Shoes</h2>
        <img className="title__heart" src="img/heart.svg" />
      </div>
    );
  }
});

let Products = React.createClass({
  renderProducts() {
  	let productViews = Object.keys(products).map(id => {
  		return <Product key={id} product={products[id]} />;
  	});
  	return productViews;
  },

  render() {

    return (

      <div className="products">
        {this.renderProducts()}
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

let Checkout = React.createClass({
  render() {
  	let discount = 80;
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
            {'$'+subtotal}
          </div>
        </div>
        <div className="checkout__line">
          <div className="checkout__line__amount checkout__line__amount--omg-savings">
            {'$'+saving}
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

let Product = React.createClass({
  render() {
  	let {id,name,price,imagePath} = this.props.product;
  	let item = cartItems[id];
  	let isAddedDisplay = item ? (
      <QuantityControl item={item} variant="gray" />
  	) : (
      <a className="product__add">
        <img className="product__add__icon" src="img/cart-icon.svg" />
      </a>
  	);

    return (

      <div className="product">
        <div className="product__display">
          <div className="product__img-wrapper">
            <img className="product__img" src={imagePath} />
          </div>
          
          {isAddedDisplay}
          
          <div className="product__price">
            {price}
          </div>
        </div>
        <div className="product__description">
          <div className="product__name">
            {name}
          </div>
          <img className="product__heart" src="img/heart.svg" />
        </div>
      </div>
    );
  }
});

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

let QuantityControl = React.createClass({
  render() {
  	let {variant} = this.props;
  	let {id,quantity} = this.props.item;
  	let className = 'adjust-qty';
  	if (variant == 'gray') {
  		className += ' adjust-qty--gray';
  	};
    return (

        <div className={className}>
          <a className="adjust-qty__button">-</a>
          <div className="adjust-qty__number">{quantity}</div>
          <a className="adjust-qty__button">+</a>
        </div>
    );
  }
});

window.onload = () => {
  React.render(<App/>,document.querySelector("#root"));
}