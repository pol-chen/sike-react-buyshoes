const React = require("react");

const connect = require("./connect");

const QuantityControl = require("./QuantityControl");

const CartStore = require("../stores/CartStore");
const {addCartItem} = CartStore;

const LikeStore = require("../stores/LikeStore");
const {addLikeItem,removeLikeItem} = LikeStore;

const ProductStore = require("../stores/ProductStore");

let Product = React.createClass({
  addProductToCart(id) {
  	addCartItem(id);
  },
  likeItem(id) {
    addLikeItem(id);
  },
  unlikeItem(id) {
    removeLikeItem(id);
  },
  render() {
  	let {id,name,price,imagePath} = this.props.product;
    let {item,like} = this.props;

    // let cartItems = CartStore.getCartItems();
  	// let item = cartItems[id];
  	let isAddedDisplay = item ? (
      <QuantityControl item={item} variant="gray" />
  	) : (
      <a className="product__add" onClick={this.addProductToCart.bind(this,id)}>
        <img className="product__add__icon" src="img/cart-icon.svg" />
      </a>
  	);

    // let likeItems = LikeStore.getLikeItems();
    // let like = likeItems[id];
    let isLikedDisplay = like ? (
      <img className="product__heart" src="img/heart-liked.svg" onClick={this.unlikeItem.bind(this,id)} />
    ) : (
      <img className="product__heart" src="img/heart.svg" onClick={this.likeItem.bind(this,id)} />
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
          {isLikedDisplay}
        </div>
      </div>
    );
  }
});

let Products = React.createClass({
  // componentDidMount() {
  	// CartStore.addChangeListener(this.forceUpdate.bind(this));
    // LikeStore.addChangeListener(this.forceUpdate.bind(this));
  // },
  renderProducts(cartItems, likeItems, filteredProducts) {
  	let productViews = Object.keys(filteredProducts).map(id => {
  		return <Product key={id} product={filteredProducts[id]} item={cartItems[id]} like={likeItems[id]} />;
  	});
  	return productViews;
  },

  render() {
    let {cartItems,likeItems, filteredProducts} = this.props;
    let productViews = this.renderProducts(cartItems, likeItems, filteredProducts);
    return (

      <div className="products">
        {productViews}
      </div>
    );
  }
});

// class ConnectedProducts extends React.Component {
//   render() {
//     return (
//       <ConnectedStore store={LikeStore} propNames={["likeItems"]}>
//         {propsOfStore1 => {
//           return (
//             <ConnectedStore store={CartStore} propNames={["cartItems"]}>
//               {propsOfStore2 => {
//                 <Products {...propsOfStore1} {...propsOfStore2} />
//               }}
//             </ConnectedStore>
//           )
//         }}
//       </ConnectedStore> 
//     )
//   }
// }

@connect(CartStore,"cartItems")
@connect(LikeStore,"likeItems")
@connect(ProductStore,"filteredProducts")
class ConnectedProducts extends Products {}

module.exports = ConnectedProducts;
// module.exports = MakeConnectedComponent(MakeConnectedComponent(Products, CartStore, "cartItems"), LikeStore, "likeItems");