const React = require("react");

const QuantityControl = require("./QuantityControl");

const {products,cartItems} = require("../data");

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

module.exports = Products;