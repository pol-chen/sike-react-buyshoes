const React = require("react");

let QuantityControl = React.createClass({
  render() {
  	let {variant} = this.props;
  	let {quantity} = this.props.item;
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

module.exports = QuantityControl;