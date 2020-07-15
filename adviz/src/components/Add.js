import React, { Component } from 'react';
import axios from 'axios';

class Add extends Component {
    constructor(props){
        super(props);
        this.state = {
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
    
    

    handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3003/contacts', {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            street:this.state.street,
            plz:this.state.plz,
            city:this.state.city,
            country:this.state.country,
            priv:this.state.priv
        })
        .then( response => {
            console.log(response.data[1]);
            setTimeout(() => {
                this.props.history.push('/home');
            }, 2000);
        })
        .catch( error => {
            console.log(error);
        })
    }

    render() {
        return (
            <div>
                <h1>Add </h1>
                    <div className="card">
                        <h2 className="card_title" align="center">Add new contact</h2>
                        <hr
                            style={{ border: '0', height: '5px', backgroundImage: "linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.75}), rgba(10,0,0,0)) " }} />
                        <form action="#maps" className="label-control" id="add-form" onSubmit={this.handleSubmit}>

                            <div className="label-control">
                                <label className="form-item" htmlFor="firstName" className="label-control">firstname</label>
                                <input className="form-item" type="text" name="firstName" id="firstName" align="center" onChange={this.handleChange} required />
                            </div>
                            <div className="label-control">
                                <label className="form-item" htmlFor="lastName" className="label-control">lastname</label>
                                <input className="form-item" type="text" name="lastName" id="lastName" onChange={this.handleChange} required />
                            </div>
                            <div className="label-control">
                                <label className="form-item" htmlFor="street" className="label-control">street</label>
                                <input className="form-item" type="text" name="street" id="street" onChange={this.handleChange} required />
                            </div>
                            <div className="label-control">
                                <label className="form-item" htmlFor="plz" className="label-control">PLZ</label>
                                <input className="form-item" type="text" id="plz" name="plz" minLength="5" maxLength="5" pattern="[0-9]{5}"
                                    title="Postleitzahl sollte aus 5 Ziffern bestehen. Bsp. 10556" onChange={this.handleChange} required />
                            </div>
                            <div className="label-control">
                                <label className="form-item" htmlFor="city" className="label-control">city</label>
                                <input className="form-item" type="text" name="city" id="city" onChange={this.handleChange} required />
                            </div>
                            <div className="label-control">
                                <label className="form-item" htmlFor="country" className="label-control">country</label>
                                <input className="form-item" type="text" name="country" id="country" onChange={this.handleChange} required />
                            </div>
                            <div className="checkbox">
                                <label htmlFor="priv" className="label-control">privat </label>
                                <input name= "priv" id="priv" type="checkbox" checked={this.state.priv} onChange={this.handleInputChange} />
                            </div>
                            <div className="button-container">
                                <button id="btn-insert" className="button" onSubmit={this.handleSubmit }>Add</button>
                            </div>
                        </form>
                    </div>
            </div>
        );
    }
}
export default Add;