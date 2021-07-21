import React from 'react';
import AddIcon from '@material-ui/icons/Add';

export default class Card extends React.Component {
    constructor() {
        super();
        this.handleClickAddToCart = this.handleClickAddToCart.bind(this);
    }
    handleClickAddToCart(e) {
        this.props.addToCart(e.currentTarget.parentElement.childNodes[0], e.currentTarget);
    }
    render() {
        return (
            <div className="goods-card">
                <div className="info">
                    <label>{this.props.product.id}</label>
                    <h2 className="product-title">{this.props.product.title}</h2>
                    <span className="cost">It costs: <span>{this.props.product.cost}</span>$</span>
                </div>
                <button onClick={this.handleClickAddToCart} className="addToCart waves-effect waves-light btn">
                    <AddIcon className="material-icons" />
                    Add this item to the cart
                </button>
            </div>
        )
    }
}
