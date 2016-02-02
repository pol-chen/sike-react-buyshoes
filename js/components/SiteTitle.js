const React = require("react");

const connect = require("./connect");

const ProductStore = require("../stores/ProductStore");
const {toggleShowOnlyLike} = ProductStore;

let SiteTitle = React.createClass({
  toggleLike() {
  	toggleShowOnlyLike();
  },
  render() {
  	let {isShowOnlyLike} = this.props;
  	let heart = isShowOnlyLike ? "-liked" : "";
    return (

      <div className="title">
        <h2>Buy Me Shoes</h2>
        <img className="title__heart" src={"img/heart"+heart+".svg"} onClick={this.toggleLike.bind(this)} />
      </div>
    );
  }
});

@connect(ProductStore,"isShowOnlyLike")
class ConnectedSiteTitle extends SiteTitle {}

module.exports = ConnectedSiteTitle;