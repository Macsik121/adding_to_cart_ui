import React from 'react';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

export default class CartIcon extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div className="cart">
                <Link to="/cart">
                    <ShoppingCartIcon className="cart-icon" />
                </Link>
                <span className="amount-item-in-cart">0</span>
            </div>
        )
    }
}