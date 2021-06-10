import 'babel-polyfill';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import './style.css';

import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Link} from 'react-router-dom';

import Routing from './Routing.jsx';

class CartIcon extends React.Component {
    constructor() {
        super();
        this.loadAmount = this.loadAmount.bind(this);
        this.state = {
            amountGoodsInCart: 0
        };
    }
    componentDidMount() {
        this.loadAmount();
    }
    async loadAmount() {
        const query = `
            query {amountCart}
        `;
        
        const response = await fetch(API_SERVER_ADDRESS, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({query})
        });
        
        const result = await response.json();
        this.setState({amountGoodsInCart: result.data.amountCart});
    }
    render() {
        return (
            <div className="cart">
                <Link to="/cart">
                    <i className="material-icons medium">shopping_cart</i>
                    <span className="amount-item-in-cart">{this.state.amountGoodsInCart}</span>
                </Link>
            </div>
        )
    }
}

ReactDOM.render(
    <HashRouter>
        <div className="store">
            <header className="header">
                <h1>
                    <Link to="/">
                        Graphics Card store
                    </Link>
                </h1>
                <CartIcon />
            </header>
            <Routing />
        </div>
    </HashRouter>,
    document.getElementById('content')
);