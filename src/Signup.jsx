import React from 'react';

export default class Signup extends React.Component {
    constructor() {
        super();
        this.signUp = this.signUp.bind(this);
    }
    signUp() {

    }
    render() {
        return (
            <div className="signup">
                <h2>Sign up</h2>
                <form onSubmit={this.signUp}>
                    <div className="input-field">
                        <input id="name" />
                        <label htmlFor="name">Name</label>
                    </div>
                    <div className="input-field">
                        <input id="email" />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="input-field">
                        <input id="password" />
                        <label htmlFor="password">Password</label>
                    </div>
                    <button type="submit">Sign up</button>
                </form>
            </div>
        )
    }
}
