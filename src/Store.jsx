import React from 'react';

class CartItem extends React.Component {
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

class Cart extends React.Component {
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
        e.target.classList.add('disabled')

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

class Card extends React.Component {
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
                    <i className="material-icons medium">add</i>
                    Add this item to the cart
                </button>
            </div>
        )
    }
}

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
    componentDidMount() {
        this.loadGoods();
    }
    async loadCart(button) {
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

        
        button.classList.remove('disabled');
    }
    async loadGoods(button) {
        const query = `
            query {
                goods {
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
        this.setState({goods: result.data.goods});

        this.setState({isLoading: false});

        button.classList.remove('disabled');
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

export {Store, Cart};