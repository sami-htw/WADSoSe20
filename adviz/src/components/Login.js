import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {

    
    state = {
        username: null,
        password: null,
    }

    handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3003/login', {
            username: this.state.username,
            password: this.state.password
        })
        .then( response => {
            console.log(response.data[0]);
            setTimeout(() => {
                this.props.history.push('/home');
            }, 2000);
        })
        .catch( error => {
            console.log(error);
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    render() {
        return (
            <div>
                <header>
                    <h2 align="center">user's Page</h2>
                </header>
                    <div className="card">
                        <p className="card_title">Login</p>
                        <form onSubmit = {this.handleSubmit} id="login-form">
                            {/* method eigentlich POST weil passwort nicht in url stehen sollte aber sonst funkt verlinkung nicht */}
                            <label htmlFor="username">
                                <input className="login_input" type="text" id="username" placeholder="Username" name="username" onChange={this.handleChange} required />
                            </label>
                            <label htmlFor="password">
                                <input className="login_input" type="password" id="password" placeholder="Password" name="password" onChange={this.handleChange} required />
                            </label>
                            <div className="button-container">
                                <button id="login-button" className="button">Sign in</button>
                            </div>
                        </form>
                    </div>

                <footer>
                    <p align="center">Autor:Htw-team</p>
                    <p align="center"><a href="mailto:team@example.com" style={{ color: '#000' }}>team@example.com</a></p>
                </footer>
                </div>
                    
        );
    }              

}

export default Login;
