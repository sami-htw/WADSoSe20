import React, { Component } from 'react';
import axios from 'axios';
import Contact from './Contact';
import ReactDOM from 'react-dom';







class Home extends Component {


    state = {

        contacts: [],

    }



 handleLogOut= (e)=>{

    setTimeout(() => {
        this.props.history.push('/adviz');
    }, 2000);
 };


 handleAddContacts= (e) =>{
     setTimeout(() =>{
         this.props.history.push('/Add');
     },2000);
 }

    componentDidMount() {

        axios.get('http://localhost:3003/contacts').then(res => {

            console.log(res);

            this.setState({
                contacts: res.data,
            });

        })


    }




    render() {
        const { contacts } = this.state;

        const postList = contacts.length ? (
            contacts.map((contact) => {

                return (
                    <div className='post card' key={contact._id} >

                        <div className="card-content">

                            <span className="card-title">{contact._id}</span>
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



        return (
            <div>


                <div>
                    <div className="contaner">
                        <h4 className="center">Home</h4>
                        <ul>{postList}</ul>
                    </div>
                </div>

                <button type='submit' className='button' id='btn-insert' onClick={this.handleAddContacts}>Add</button>
                <button type='submit' className='button' id='btn-insert' onClick={this.handleLogOut}>logout</button>
            </div>

        );



    }
}

export default Home;




