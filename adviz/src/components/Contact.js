import React, { Component } from 'react';

import axios from 'axios';



    


class Contact extends Component {

    state = {
        username: null,
        password: null,
    };

   

    handleSubmit = (e) => {
        e.preventDefault();
        axios.get('http://localhost:3003/contact', {
            username: this.state.username,
            password: this.state.password
        })
        .then( response => {
            console.log(response.data[0]);
            setTimeout(() => {
                this.props.history.push('/contact');
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
        return(

            <div id="fieldMembers">
            <legend> Contacts</legend>
            </div>

            
           
        );          
    }              
}
export default Contact;