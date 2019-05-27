import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password1: "",
            password2: "",
            errors: {}
        };
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password1: this.state.password1,
            password2: this.state.password2
        };

        console.log("Submitting user: ");
        console.log(newUser);
    };


}

export default Register;