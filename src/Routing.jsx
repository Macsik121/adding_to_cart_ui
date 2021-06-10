import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import {Store, Cart} from './Store.jsx';

class Routing extends React.Component {
    render() {
        return (
            <Switch>
                <Redirect exact from="/" to="store" />
                <Route exact path="/store" component={Store} />
                <Route exact path="/cart" component={Cart} />
            </Switch>
        )
    }
}

export default Routing;