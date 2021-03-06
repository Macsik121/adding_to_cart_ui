import React from 'react';
import fetchData from './fetchData';
import Card from './Card.jsx';

class Store extends React.Component {
    constructor() {
        super();
        this.state = {
            goods: [],
            cart: [],
            isLoading: true
        };
        this.addToCart = this.addToCart.bind(this);
        this.loadCart = this.loadCart.bind(this);
        this.loadGoods = this.loadGoods.bind(this);
    }
    async componentDidMount() {
        await fetch('query');
        this.loadGoods();
    }
    async loadCart(button) {
        if (button) {
            button.classList.remove('add');
            button.classList.add('disabled')
        }
        const query = `
            query {
                cart {
                    id
                    title
                    cost
                    amount
                    inCart
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

        
        if (button) {
            button.classList.remove('disabled');
            button.classList.add('enabled');
        }
    }
    async loadGoods(button) {
        if (button) {
            button.classList.remove('enabled');
            button.classList.add('disabled');
        }

        const query = `
            query {
                goods {
                    id
                    title
                    cost
                    amount
                }
            }
        `;

        const res = await fetch(API_SERVER_ADDRESS, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({query})
        });
        const result = await res.json();
        this.setState({goods: result.data.goods});

        this.setState({isLoading: false});

        if (button) {
            button.classList.remove('disabled');
            button.classList.add('enabled');
        }
    }
    async addToCart(e, button) {
        button.classList.add('disabled');

        const id = +e.childNodes[0].textContent;
        const title = e.childNodes[1].textContent;
        const cost = +e.childNodes[2].childNodes[1].textContent;

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

        this.loadCart(button);
    }
    render() {
        const cards = this.state.goods.map(product => {
            return (
                <Card
                    product={product}
                    key={product.id}
                    addToCart={this.addToCart}
                />
            )
        });
        return (
            <div className="cards">
                {
                    this.state.isLoading
                    &&
                    <div className="preloader-wrapper big active">
                        <div className="spinner-layer spinner-green-only">
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
                {cards}
            </div>
        )
    }
}

export default Store;