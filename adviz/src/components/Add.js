import React, { Component } from 'react';
import axios from 'axios';

class Add extends Component {

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
         

        })
    }


    
    handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3003/contacts', {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
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

                <section id="adds">
                    <div className="card">
                        <h2 className="card_title" align="center">Add new contact</h2>
                        <hr
                            style={{ border: '0', height: '5px', backgroundImage: "linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.75}), rgba(10,0,0,0)) " }} />
                        <form action="#maps" method="GET" className="label-control" id="add-form" onSubmit={this.handleSubmit}>

                            <div className="label-control">
                                <label className="form-item" for="add-first_name" class="label-control">firstname</label>
                                <input className="form-item" type="text" name="add-first_name" id="add-first_name" align="center" required />
                            </div>
                            <div className="label-control">
                                <label className="form-item" for="add-last_name" className="label-control">lastname</label>
                                <input className="form-item" type="text" name="add-last_name" id="add-last_name" required />
                            </div>
                            <div className="label-control">
                                <label className="form-item" for="add-street" class="label-control">street</label>
                                <input className="form-item" type="text" name="add-street" id="add-street" required />
                            </div>
                            <div className="label-control">
                                <label className="form-item" for="add-plz" class="label-control">PLZ</label>
                                <input className="form-item" type="text" id="add-plz" name="add-plz" minlength="5" maxlength="5" pattern="[0-9]{5}"
                                    title="Postleitzahl sollte aus 5 Ziffern bestehen. Bsp. 10556" required />
                            </div>
                            <div div className="label-control">
                                <label className="form-item" for="add-city" className="label-control">city</label>
                                <input className="form-item" type="text" name="add-city" id="add-city" required />
                            </div>
                            <div div className="label-control">
                                <label className="form-item" for="add-country" class="label-control">country</label>
                                <input className="form-item" type="text" name="add-country" id="add-country" required />
                            </div>
                            <div className="checkbox">
                                <label for="add-priv" className="label-control">privat </label>
                                <input id="add-priv" type="checkbox" checked="checked" name="add-priv" />

                            </div>
                            <div className="button-container">
                                <a id="btn-insert" className="button">Add</a>
                            </div>
                        </form>
                    </div>
                </section>











            </div>
        );
    }
}
export default Add;