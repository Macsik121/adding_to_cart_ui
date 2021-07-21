import React from 'react';
import CartItem from './CartItem.jsx';

export default class Cart extends React.Component {
    constructor() {
        super();
        this.loadCart = this.loadCart.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.state = {
            cart: [],
            isLoading: true
        };
    }
    componentDidMount() {
        this.loadCart();
    }
    async loadCart(span) {
        const query = `
            query {
                cart {
                    id
                    title
                    cost
                    amount
                    inCart
                    totalCost
                }
            }
        `;

        const res = await fetch(API_SERVER_ADDRESS, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({query})
        });

        const result = await res.json();
        this.setState({cart: result.data.cart})
        this.setState({isLoading: false});

        span ? span.classList.remove('disabled') : '';
    }
    async addToCart(e) {
        if (e.target) {
            e.target.classList.remove('enabled');
            e.target.classList.add('disabled');
        }

        const id = +e.target.parentElement.parentElement.parentElement.childNodes[0].childNodes[0].textContent;
        const title = e.target.parentElement.parentElement.parentElement.childNodes[0].childNodes[1].textContent;
        const cost = +e.target.parentElement.parentElement.parentElement.childNodes[0].childNodes[2].childNodes[1].textContent;

        const goodsToAdd = {
            id,
            title,
            cost
        };

        const mutation = `
            mutation addGoodsInCart($goods: CartGoods!) {
                addGoodsInCart(goods: $goods) {
                    id
                    title
                    cost
                    amount
                    inCart
                    totalCost
                }
            }
        `;

        const res = await fetch(API_SERVER_ADDRESS, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({query: mutation, variables: {goods: goodsToAdd}})
        });

        this.loadCart(e.target);

        if (e.target) {
            e.target.classList.remove('disabled');
            e.target.classList.add('enabled');
        }
    }
    render() {
        const cart = this.state.cart.map(cartItem => {
            return (
                <CartItem
                    cartItem={cartItem}
                    addToCart={this.addToCart}
                    key={cartItem.id}
                />
            )
        });
        return (
            <div className="cart">
                {
                    this.state.isLoading
                    &&
                    <div className="preloader-wrapper big active">
                        <div className="spinner-layer spinner-blue-only">
                            <div className="circle-clipper left">
                                <div className="circle"></div>
                            </div><div className="gap-patch">
                                <div className="circle"></div>
                            </div><div className="circle-clipper right">
                                <div className="circle"></div>
                            </div>
                        </div>
                    </div>
                }
                {cart}
                <div className="finalCost">
                    
                </div>
            </div>
        )
    }
}