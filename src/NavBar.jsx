import React from 'react';
import { Link } from 'react-router-dom';

import CartIcon from './CartIcon.jsx';

export default function NavBar() {
    return (
        <header className="header">
            <nav className="nav">
                <h1>
                    <Link to="/">
                        Graphics Card store
                    </Link>
                </h1>
                <div className="account">
                    <CartIcon />
                    <ul className="auth">
                        <li className="login">
                            <Link to="login">
                                Log in
                            </Link>
                        </li>
                        <li className="signup">
                            <Link to="/signup">
                                Sign up
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}
