import React, { Component } from 'react'

class UpdateForm extends React.Component {
    render() {
        return (



            <div>
                <section id="updates">
                    <div className="card">
                        <h2 className="card_title" >Update/Delete Adress</h2>
                        <hr
                            style={{ border: '0', height: '5px', backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(10, 0, 0, 0));' }} />
                        <form action="#maps" method="GET" className="label-control" id="update-form">

                            <div className="label-control">
                                <label className="form-item" for="update-first_name" className="label-control">Vorname</label>
                                <input className="form-item" type="text" name="update-first_name" id="update-first_name" required/> 
                            </div>
                            <div className="label-control">
                                <label className="form-item" for="update-last_name" className="label-control">Name</label>
                                <input className="form-item" type="text" name="update-last_name" id="update-last_name" required />
                            </div>
                            <div class="label-control">
                                <label className="form-item" for="update-street" className="label-control">Straße</label>
                                <input className="form-item" type="text" name="update-street" id="update-street" required />
                            </div>
                            <div class="label-control">
                                <label className="form-item" for="update-plz" className="label-control">PLZ</label>
                                <input className="form-item" type="text" id="update-plz" name="update-plz" minlength="5" maxlength="5" pattern="[0-9]{5}"
                                    title="Postleitzahl sollte aus 5 Ziffern bestehen. Bsp. 10556" required />
                            </div>
                            <div div class="label-control">
                                <label className="form-item" for="update-city" className="label-control">Stadt</label>
                                <input className="form-item" type="text" name="update-city" id="update-city" required />
                            </div>
                            <div div className="label-control">
                                <label className="form-item" for="update-country" className="label-control">Land</label>
                                <input className="form-item" type="text" name="update-country" id="update-country" required />
                            </div>
                            <div className="label-control">
                                <label for="update-priv" className="label-control">privat</label>
                                    <input id="update-priv" type="checkbox" checked="checked" name="update-priv"/>
                                
                            </div>
                            <div className="button-container">
                                <a id="update-update-button" className="button" type="submit" href="#maps">Update</a>
                                <a id="update-delete-button" className="button" type="reset" href="#maps">Delete</a>
                                { /* <!-- auf reset weil keine andere funktion ohne jscript--> */}
                            </div>
                        </form>
                    </div>
                </section>


            </div>

        );
    }
}
 export default UpdateForm;