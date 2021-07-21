import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Routing from '../src/Routing.jsx';
import template from './template';

export default function render(req, res) {
    if (req.url == '/') res.redirect('/store')

    const element = (
        <StaticRouter
            location={req.url}
            context={{}}
        >
            <Routing />
        </StaticRouter>
    );
 
    const body = ReactDOMServer.renderToString(element);

    res.send(template(body));
}
