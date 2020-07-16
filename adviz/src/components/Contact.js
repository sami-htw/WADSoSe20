import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'


    


class Contact extends Component {

    

    constructor(props){
        super(props);
        this.state = {
            _id: null,
            firstName: null,
            lastName: null,
            street: null,
            plz: null,
            city: null,
            country: null,
            priv: true, 
        };
    
    
        this.handleInputChange = this.handleInputChange.bind(this);
    }



    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        })
    }


    handleInputChange(event) {
        const target = event.target;
        const value = target.name === 'priv' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }
    
    handleDelete = (e) => {
        axios.delete('http://localhost:3003/contacts/' + this.state._id, {

    })
    .then( response => {
        this.props.deleteContact(this.state);
        setTimeout(() => {
            this.props.history.push('/home');
        }, 2000);
    })
    .catch( error => {
        console.log(error);
    })
}

    handleSubmit = (e) => {
        e.preventDefault();
        axios.put('http://localhost:3003/contacts/' + this.state._id, {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            street:this.state.street,
            plz:this.state.plz,
            city:this.state.city,
            country:this.state.country,
            priv:this.state.priv
        })
        .then( response => {
            this.props.updateContact(this.state);
                this.props.history.push('/home');
        })
        .catch( error => {
            console.log(error);
        })
    }

componentWillMount(){
    const { contact } = this.props;
        this.setState({
            ...contact
        })

}
    
    render() {
        return (
            <div>
                <h1>Update/Delete</h1>
                    <div className="card">
                        <h2 className="card_title" align="center">{this.state.firstName}</h2>
                        {/*<h2>{this.state._id}</h2> */}            
                            <hr
                            style={{ border: '0', height: '5px', backgroundImage: "linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.75}), rgba(10,0,0,0)) " }} />
                        <form className="label-control" id="add-form">

                            <div className="label-control">
                                <label className="form-item" htmlFor="firstName" className="label-control">firstname</label>
                                <input className="form-item" type="text" name="firstName" id="firstName" align="center" onChange={this.handleChange} defaultValue={this.state.firstName} required />
                            </div>
                            <div className="label-control">
                                <label className="form-item" htmlFor="lastName" className="label-control">lastname</label>
                                <input className="form-item" type="text" name="lastName" id="lastName" onChange={this.handleChange} defaultValue={this.state.lastName} required  />
                            </div>
                            <div className="label-control">
                                <label className="form-item" htmlFor="street" className="label-control">street</label>
                                <input className="form-item" type="text" name="street" id="street" onChange={this.handleChange} defaultValue={this.state.street} required />
                            </div>
                            <div className="label-control">
                                <label className="form-item" htmlFor="plz" className="label-control">PLZ</label>
                                <input className="form-item" type="text" id="plz" name="plz" minLength="5" maxLength="5" pattern="[0-9]{5}"
                                    title="Postleitzahl sollte aus 5 Ziffern bestehen. Bsp. 10556" onChange={this.handleChange} defaultValue={this.state.plz} required />
                            </div>
                            <div className="label-control">
                                <label className="form-item" htmlFor="city" className="label-control">city</label>
                                <input className="form-item" type="text" name="city" id="city" onChange={this.handleChange} defaultValue={this.state.city} required />
                            </div>
                            <div className="label-control">
                                <label className="form-item" htmlFor="country" className="label-control">country</label>
                                <input className="form-item" type="text" name="country" id="country" onChange={this.handleChange} defaultValue={this.state.country} required />
                            </div>
                            <div className="checkbox">
                                <label htmlFor="priv" className="label-control">privat </label>
                                <input name= "priv" id="priv" type="checkbox" checked={this.state.priv} onChange={this.handleInputChange} />
                            </div>
                            
                        </form>
                        <div className="button-container">
                                <button id="btn-insert" className="button" onClick={this.handleSubmit}>Update</button>
                                <button id="btn-insert" className="button" onClick={this.handleDelete}>Delete</button>
                            </div>
                    </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    
    let id = ownProps.match.params.contactId;
    let contact = state.contacts.find(contact => contact._id === id)
    if (typeof contact === 'undefined'){
        return{
            contact:{}
        }
    }
    return{
        contact:{
            _id: contact._id,
            firstName: contact.firstName,
            lastName: contact.lastName,
            street: contact.street,
            plz: contact.plz,
            city: contact.city,
            country: contact.country,
            priv: contact.priv, 
        }
            
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateContact: (contact) => dispatch({type: 'UPDATE_CONTACT', contact: contact}),
        deleteContact: (contact) => dispatch({type: 'DELETE_CONTACT', contact: contact})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact);