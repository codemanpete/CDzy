import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.id]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        console.log("logging in with data: ");
        console.log(userData);
    }

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div>
                    <div>
                        <Link to="/">
                            <i>keyboard_backspace</i>
                            Back to home
                        </Link>
                        <div>
                            <h4>
                                <b>Login</b> below
                            </h4>
                            <p>
                                Don't have an account? <Link
                                    to="/register">Register
                                </Link>
                            </p>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    errors={errors.email}
                                    id="email"
                                    type="email"
                                />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    errors={errors.password}
                                    id="password"
                                    tyep="password"
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                            <div>
                                <button type="submit">
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;