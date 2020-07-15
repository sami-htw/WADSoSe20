const initState = {
    currentUser: null, 
    contacts: []
}

const rootReducer = (state = initState, action) => {
    // HOME AUFGERUFEN
    if(action.type === 'PERMISSION'){
        if(action.isAdmin === true){
            return state;
        }else{
            let newContactList = state.contacts.filter(contact => {
                return action.isAdmin === contact.priv
        });
            return{
                ...state,
                contacts: newContactList
            }
        }
    }
     //DELETE PAGE   
    if(action.type === 'DELETE_CONTACT'){
        console.log("ICH BIN UNDEFINED")
        console.log(action.contact._id);
        let newContactList = state.contacts.filter(contact => {
            return action.contact._id !== contact._id
        });
        return{
            ...state,
            contacts: newContactList

        }
    }
    //AFTER LOGIN
    if(action.type === 'INIT_CONTACTLIST'){
        return{
            ...state,
            contacts: action.contacts
        }
    }

    if(action.type === 'UPDATE_CONTACT'){
        let newContactIndex = state.contacts.findIndex((contact => contact._id == action.contact._id));
        let newContactList = state.contacts.slice();
        newContactList[newContactIndex] = action.contact;
        return{
            ...state,
            contacts: newContactList
        }
    }

    if (action.type === 'INIT_CURRENTUSER'){
        return{
            ...state,
            currentUser: action.currentUser
        }
    }

    if (action.type === 'ADD_CURRENTUSER'){
        let newContactList = state.contacts.slice();
        newContactList.push(action.contact);
        return{
            ...state,
            contacts: newContactList
        }
    }


    return state;
}

export default rootReducer