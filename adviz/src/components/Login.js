
import React, { Component } from 'react';

class login extends React.Component {
    render() {
        return (

            <div>
                <header>
                    <h2 align="center">user's Page</h2>
                </header>


                <section id="logins">
                    <div className="card">

                        <p className="card_title">Login</p>
                        <form action="#maps" method="GET" id="login-form">
                            {/* method eigentlich POST weil passwort nicht in url stehen sollte aber sonst funkt verlinkung nicht */}
                            <label for="username">
                                <input className="login_input" type="text" id="username" placeholder="Username" name="username" required />
                            </label>
                            <label for="pass">
                                <input className="login_input" type="password" id="pass" placeholder="Password" name="password" required />
                            </label>
                            <div className="button-container">
                                <a id="login-button" className="button">Sign in</a>
                            </div>
                            <p className="forgot" align="center">
                                <a href="#">Forgot Password?</a>
                            </p>
                        </form>
                    </div>

                </section>


                <footer>
                    <p align="center">Autor:Htw-team</p>
                    <p align="center"><a href="mailto:team@example.com" style={{ color: '#000' }}>team@example.com</a></p>
                </footer>
        
           
                </div>
                    
                    
                


}

export default login;
