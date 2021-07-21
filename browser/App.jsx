import 'babel-polyfill';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import '../src/style.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import Routing from '../src/Routing.jsx';

ReactDOM.hydrate(
    <BrowserRouter>
        <Routing />
    </BrowserRouter>,
    document.getElementById('content')
);