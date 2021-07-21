import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Store from './Store.jsx';
import Cart from './Cart.jsx';
import NavBar from './NavBar.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';

class Routing extends React.Component {
    render() {
        return (
            <div className="store">
                <NavBar />
                <Switch>
                    <Redirect exact from="/" to="/store" />
                    <Route exact path="/store" component={Store} />
                    <Route exact path="/cart" component={Cart} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={Signup} />
                </Switch>
            </div>
        )
    }
}

export default Routing;