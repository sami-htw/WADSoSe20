import React, { Component } from 'react';
import axios from 'axios';
import Contact from './Contact';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'







class Home extends Component {

 handleLogOut= (e)=>{
        this.props.history.push('/adviz');
 };


 handleAddContacts= (e) =>{
         this.props.history.push('/add');
 }

    getGreeting(currentUser){
        
        let permission = '';
        if(currentUser.isAdmin == true){
            permission = 'admin'
        }else{
            permission = 'nicht-admin'
        }

        return 'Hallo ' + currentUser.firstName + ' ' + currentUser.lastName + ', eingeloggt als ' + permission
    }

    render() {
        const { contacts } = this.props;
        const { currentUser } = this.props;
        let greetingString = this.getGreeting(currentUser);
        const contactList = contacts.length ? (
            contacts.map((contact) => {
                return (
                    <div className='post card' key={contact._id} >
                        <div className="card-content">
                        {
                    currentUser.isAdmin
                    ? <Link to={'/contacts/' + contact._id}>
                    <span className="card-title">{contact._id}</span>
                    </Link>
                    : <span className="card-title">{contact._id}</span>
                }
                            <p>{contact.firstName}</p>
                            <p>{contact.lastName}</p>
                            <p>{contact.street}</p>
                            <p>{contact.city}</p>
                            <p>{contact.plz}</p>
                            <p>{contact.country}</p>
                            <p>{contact.priv.toString()}</p>
                        </div>
                    </div>
                )

            })
        ) : (

                <div className="center">No posts to show</div>
            );
            //console.log(greeting);


        return (
            <div>
                <div>
                    <div className="contaner">
                    <div><h1>{greetingString}</h1></div>
                        <ul>{contactList}</ul>
                    </div>
                </div>
                {
                    currentUser.isAdmin
                    ? <button type='submit' className='button' id='btn-insert' onClick={this.handleAddContacts}>Add</button>
                    : null
                }
                
                <button type='submit' className='button' id='btn-insert' onClick={this.handleLogOut}>logout</button>
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return{
        contacts: state.contacts,
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps)(Home);

