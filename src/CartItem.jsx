import React from 'react';

export default class CartItem extends React.Component {
    render() {
        return (
            <div className="cartItem-card">
                <div className="info">
                    <label>{this.props.cartItem.id}</label>
                    <h2 className="product-title">{this.props.cartItem.title}</h2>
                    <span className="cost">It costs: <span>{this.props.cartItem.cost}</span>$</span>
                </div>
                <div className="add-substract">
                    <span className="amount"><span>-</span>{this.props.cartItem.amount}<span onClick={this.props.addToCart}>+</span></span>
                    <span className="totalCost">Total cost of this/these GPUs: {this.props.cartItem.totalCost}$</span>
                </div>
            </div>
        )
    }
}