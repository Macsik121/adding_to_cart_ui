import React from 'react';
import { withRouter } from 'react-router-dom';
import fetchData from './fetchData';

class Login extends React.Component {
    constructor() {
        super();
        this.login = this.login.bind(this);
    }
    async login(e) {
        e.preventDefault();
        const form = document.forms.login;
        const email = form.email.value;
        const password = form.password.value;

        await fetchData(`
            query login($email: String!, $password: String!) {
                login(email: $email, password: $password) {
                    name
                    email
                    cart
                    cartAmount
                }
            }
        `, {email, password})
            .then(
                (res) => {
                    if (res.status == 200) {
                        res.json().then(data => {
                            localStorage.setItem('token', data.token)
                        })
                        this.props.history.push('/');
                    } else {
                        const error = new Error(res.error);
                        throw error;
                    }
                }
            );
    }
    render() {
        return (
            <div className="login">
                <h2>Login to your account</h2>
                <form name="login" onSubmit={this.login}>
                    <div className="input-field">
                        <input name="email" id="email" />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="input-field">
                        <input name="password" id="password" />
                        <label htmlFor="password">Password</label>
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        )
    }
}

export default withRouter(Login)
