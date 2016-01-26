"use strict";

var products = {

  "jameson-vulc": {
    id: "jameson-vulc",
    name: "Jameson Vulc",
    price: 64.99,
    imagePath: "img/shoes/jameson-vulc-brown-gum-orig.png",
    gender: "man"
  },

  "marana-x-hook-ups": {
    id: "marana-x-hook-ups",
    name: "Marana X Hook-Up",
    price: 79.99,
    imagePath: "img/shoes/marana-x-hook-ups-black-orig.png",
    gender: "man"
  },

  "jameson-e-lite": {
    id: "jameson-e-lite",
    name: "Jameson E-Lite",
    price: 69.99,
    imagePath: "img/shoes/jameson-e-lite-maroon-orig.png",
    gender: "man"
  },

  "jameson-e-lite-julian-davidson-4": {
    id: "jameson-e-lite-julian-davidson-4",
    name: "Jameson E-Lite Julian Davidson",
    price: 74.99,
    imagePath: "img/shoes/jameson-e-lite-julian-davidson-4-black-gum-orig.png",
    gender: "man"
  },

  "scout-womens-6": {
    id: "scout-womens-6",
    name: "Scout Women's",
    imagePath: "img/shoes/scout-womens-6-teal-orig.png",
    price: 59.99,
    gender: "woman"
  },

  "scout-womens-coco-ho-5": {
    id: "scout-womens-coco-ho-5",
    name: "Scout Women's Coco Ho",
    imagePath: "img/shoes/scout-womens-coco-ho-5-olive-white-orig.png",
    price: 59.99,
    gender: "woman"
  },

  "jameson-2-womens-8": {
    id: "jameson-2-womens-8",
    name: "Jameson 2 Women's",
    imagePath: "img/shoes/jameson-2-womens-8-black-white-gum-orig.png",
    price: 59.99,
    gender: "woman"
  },

  "corby-womens-2": {
    id: "corby-womens-2",
    name: "Corby Women's",
    imagePath: "img/shoes/corby-womens-2-tan-white-orig.png",
    price: 44.99,
    gender: "woman"
  }
};

var cartItems = {
  "jameson-vulc": {
    id: "jameson-vulc",
    quantity: 1
  },

  "marana-x-hook-ups": {
    id: "marana-x-hook-ups",
    quantity: 2
  },

  "scout-womens-6": {
    id: "scout-womens-6",
    quantity: 2
  },

  "scout-womens-coco-ho-5": {
    id: "scout-womens-coco-ho-5",
    quantity: 1
  },

  "jameson-2-womens-8": {
    id: "jameson-2-womens-8",
    quantity: 1
  }
};

var App = React.createClass({
  displayName: "App",

  componentDidMount: function componentDidMount() {
    var $toggle = document.querySelector(".site__right-sidebar-toggle");
    $toggle.addEventListener("click", function () {
      document.body.classList.toggle("js-show-right-sidebar");
    });
  },
  render: function render() {
    return React.createElement(
      "div",
      { className: "site" },
      React.createElement(
        "div",
        { className: "bg" },
        React.createElement("div", { className: "bg__img" })
      ),
      React.createElement(
        "div",
        { className: "site__main" },
        React.createElement(
          "div",
          { className: "site__left-sidebar" },
          React.createElement(SiteTitle, null)
        ),
        React.createElement(
          "div",
          { className: "site__content" },
          React.createElement(Products, null)
        )
      ),
      React.createElement(
        "div",
        { className: "site__right-sidebar" },
        React.createElement(Cart, null),
        React.createElement(Checkout, null)
      ),
      React.createElement(
        "a",
        { className: "site__right-sidebar-toggle" },
        React.createElement("img", { src: "img/arrow-icon.svg" })
      )
    );
  }
});
var SiteTitle = React.createClass({
  displayName: "SiteTitle",

  render: function render() {
    return React.createElement(
      "div",
      { className: "title" },
      React.createElement(
        "h2",
        null,
        "Buy Me Shoes"
      ),
      React.createElement("img", { className: "title__heart", src: "img/heart.svg" })
    );
  }
});

var Products = React.createClass({
  displayName: "Products",

  renderProducts: function renderProducts() {
    var productViews = Object.keys(products).map(function (id) {
      return React.createElement(Product, { key: id, product: products[id] });
    });
    return productViews;
  },

  render: function render() {

    return React.createElement(
      "div",
      { className: "products" },
      this.renderProducts()
    );
  }
});

var Cart = React.createClass({
  displayName: "Cart",

  componentDidMount: function componentDidMount() {
    var $cart = React.findDOMNode(this.refs.cart);
    Ps.initialize($cart);
  },
  renderCartItems: function renderCartItems() {
    var cartItemViews = Object.keys(cartItems).map(function (id) {
      return React.createElement(CartItem, { key: id, item: cartItems[id] });
    });
    return cartItemViews;
  },

  render: function render() {
    return React.createElement(
      "div",
      { className: "cart" },
      React.createElement(
        "h3",
        { className: "cart__title" },
        "Shopping Cart"
      ),
      React.createElement(
        "div",
        { className: "cart__content", ref: "cart" },
        React.createElement(
          "h3",
          { className: "cart__title cart__title--spacer" },
          "Shopping Cart"
        ),
        this.renderCartItems()
      )
    );
  }
});

var Checkout = React.createClass({
  displayName: "Checkout",

  render: function render() {
    var discount = 80;
    var subtotal = 0;
    Object.keys(cartItems).forEach(function (id) {
      var price = products[id].price;
      var quantity = cartItems[id].quantity;
      subtotal += price * quantity;
    });
    var saving = subtotal - discount;
    return React.createElement(
      "div",
      { className: "checkout" },
      React.createElement("hr", { className: "checkout__divider" }),
      React.createElement("input", { type: "text", className: "checkout__coupon-input", placeholder: "coupon code" }),
      React.createElement(
        "div",
        { className: "checkout__line" },
        React.createElement(
          "div",
          { className: "checkout__line__label" },
          "Discount"
        ),
        React.createElement(
          "div",
          { className: "checkout__line__amount" },
          '-$' + discount
        )
      ),
      React.createElement(
        "div",
        { className: "checkout__line" },
        React.createElement(
          "div",
          { className: "checkout__line__label" },
          "Subtotal"
        ),
        React.createElement(
          "div",
          { className: "checkout__line__amount checkout__line__amount--strikeout" },
          '$' + subtotal
        )
      ),
      React.createElement(
        "div",
        { className: "checkout__line" },
        React.createElement(
          "div",
          { className: "checkout__line__amount checkout__line__amount--omg-savings" },
          '$' + saving
        )
      ),
      React.createElement(
        "a",
        { className: "checkout__button" },
        React.createElement("img", { className: "checkout__button__icon", src: "img/cart-icon.svg" }),
        React.createElement(
          "div",
          { className: "checkout__button__label" },
          "Checkout"
        )
      )
    );
  }
});

var Product = React.createClass({
  displayName: "Product",

  render: function render() {
    var _props$product = this.props.product;
    var id = _props$product.id;
    var name = _props$product.name;
    var price = _props$product.price;
    var imagePath = _props$product.imagePath;

    var item = cartItems[id];
    var isAddedDisplay = item ? React.createElement(QuantityControl, { item: item, variant: "gray" }) : React.createElement(
      "a",
      { className: "product__add" },
      React.createElement("img", { className: "product__add__icon", src: "img/cart-icon.svg" })
    );

    return React.createElement(
      "div",
      { className: "product" },
      React.createElement(
        "div",
        { className: "product__display" },
        React.createElement(
          "div",
          { className: "product__img-wrapper" },
          React.createElement("img", { className: "product__img", src: imagePath })
        ),
        isAddedDisplay,
        React.createElement(
          "div",
          { className: "product__price" },
          price
        )
      ),
      React.createElement(
        "div",
        { className: "product__description" },
        React.createElement(
          "div",
          { className: "product__name" },
          name
        ),
        React.createElement("img", { className: "product__heart", src: "img/heart.svg" })
      )
    );
  }
});

var CartItem = React.createClass({
  displayName: "CartItem",

  render: function render() {
    var item = this.props.item;
    var _props$item = this.props.item;
    var id = _props$item.id;
    var quantity = _props$item.quantity;
    var _products$id = products[id];
    var name = _products$id.name;
    var price = _products$id.price;
    var imagePath = _products$id.imagePath;

    var priceDisplay = '$' + price;
    if (quantity > 1) {
      priceDisplay += ' × ' + quantity;
    };

    return React.createElement(
      "div",
      { className: "cart-item" },
      React.createElement(
        "div",
        { className: "cart-item__top-part" },
        React.createElement(
          "div",
          { className: "cart-item__image" },
          React.createElement("img", { src: imagePath })
        ),
        React.createElement(
          "div",
          { className: "cart-item__top-part__middle" },
          React.createElement(
            "div",
            { className: "cart-item__title" },
            name
          ),
          React.createElement(
            "div",
            { className: "cart-item__price" },
            priceDisplay
          )
        ),
        React.createElement("img", { className: "cart-item__trash", src: "img/trash-icon.svg" })
      ),
      React.createElement(
        "div",
        { className: "cart-item__qty" },
        React.createElement(QuantityControl, { item: item })
      )
    );
  }
});

var QuantityControl = React.createClass({
  displayName: "QuantityControl",

  render: function render() {
    var variant = this.props.variant;
    var _props$item2 = this.props.item;
    var id = _props$item2.id;
    var quantity = _props$item2.quantity;

    var className = 'adjust-qty';
    if (variant == 'gray') {
      className += ' adjust-qty--gray';
    };
    return React.createElement(
      "div",
      { className: className },
      React.createElement(
        "a",
        { className: "adjust-qty__button" },
        "-"
      ),
      React.createElement(
        "div",
        { className: "adjust-qty__number" },
        quantity
      ),
      React.createElement(
        "a",
        { className: "adjust-qty__button" },
        "+"
      )
    );
  }
});

window.onload = function () {
  React.render(React.createElement(App, null), document.querySelector("#root"));
};
