let map = null;
let featureGroup = null;
function showMap(list) {
  L.mapquest.key = 'CKvWSTNixxAb9dVV0kMTryinWJdAqS8K';
  // Geocode three locations, then call the createMap callback
  L.mapquest.geocoding().geocode(list, createMap);
  // 'map' refers to a <div> element with the ID map
  function createMap(error, response) {
    // Initialize the Map
    if(map == null){
        map = L.mapquest.map('map', {
        layers: L.mapquest.tileLayer('map'),
        center: [0, 0],
        zoom: 14
      });
    }else{
      map.removeLayer(featureGroup);
    }
    
    // Generate the feature group containing markers from the geocoded locations
    featureGroup = generateMarkersFeatureGroup(response);

    // Add markers to the map and zoom to the features
    featureGroup.addTo(map);
    map.fitBounds(featureGroup.getBounds());
  }

  function generateMarkersFeatureGroup(response) {
    let group = [];
    for (let i = 0; i < response.results.length; i++) {
      let location = response.results[i].locations[0];
      let locationLatLng = location.latLng;
      let code = location.geocodeQualityCode;
      if (!parseQualityCode(code)) {
        continue;
      }
      // Create a marker for each location
      let marker = L.marker(locationLatLng, {
          icon: L.mapquest.icons.marker()
        })
        .bindPopup(location.street + ', ' + location.adminArea5 + ', ' + location.adminArea3);

      group.push(marker);
    }
    return L.featureGroup(group);
  }

  function parseQualityCode(code) {
    // at least confidence match quality A OR B to be displayed as marker
    let regex = /\D\d[ABC][ABC]\D/;
    return regex.test(code);
  }
}





const login_button = document.querySelector('#login-button')
//const loginForm = document.querySelector('#login-form');
const login_userName = document.querySelector('#username');
const login_password = document.querySelector('#pass');
const login_form = document.querySelector('#login-form')

login_button.addEventListener('click', function (event) {

  if(!login_form.reportValidity()){
    return;
  }
  // admin index 0, normalo index 1, not in user index -1
  currentUser = users.map(function (user) {
    return user.userName;
  }).indexOf(login_userName.value);
  if (currentUser !== -1 && users[currentUser]["pass"] === login_password.value) {
    managePermission();
    loadContactsLocalStorage();
    openContactList();
    showMap(getAdressList());
  } else {
    event.preventDefault();
    alert("Wrong Username or password")
  }
});



function getAdressList() {
  let list = [];
  let del = ', ';
  let adress = '';
  for (i = 0; i < contacts.length; i++) {
    adress = contacts[i]['street'] + del + contacts[i]['plz'] + del + contacts[i]['city'] + del + contacts[i]['country'];
    list.push(adress);

  }


  return list;
}


function getAdressListdisplay() {
  let list = [];
  let del = ', ';
  let i, checkValue;
  let adress = '';


  /*
   * if normalo skip all private users, else create list of all
   */
  if (users[currentUser]['permission'] === "normal") {
    for (i = 0; i < contacts.length; i++) {
      if (contacts[i]['priv']=== true){
        continue;
      }
      adress = 'Vorname :' + contacts[i]['firstName'] + del + 'Nachname :' + contacts[i]['lastName'] + del + 'Straße :' + contacts[i]['street'] + del + 'Postleitzahl:' + contacts[i]['plz'] + del + 'Stadt :' + contacts[i]['city'] + del + 'Land :' + contacts[i]['country'];
      list.push(adress);
    }
  }else{
    for (i = 0; i < contacts.length; i++) {
      adress = 'Vorname :' + contacts[i]['firstName'] + del + 'Nachname :' + contacts[i]['lastName'] + del + 'Straße :' + contacts[i]['street'] + del + 'Postleitzahl:' + contacts[i]['plz'] + del + 'Stadt :' + contacts[i]['city'] + del + 'Land :' + contacts[i]['country'];
      list.push(adress);
    }
  }

  
  return list; // hinter den Aktuallisierung wird list zurück gegeben ,und drin stehen alle users
}



function openContactList() {
  let element ;
  let contactList = document.querySelector('#fieldMembers > ul');
  if (contactList != null) {
    contactList.remove();
  }
    
  location.href = '#maps';
  ul = document.createElement('ul');
  ul.id = "contact-list";

  document.querySelector('#fieldMembers').appendChild(ul);

  getAdressListdisplay().forEach(function (item) {
    let li = document.createElement('li');
    ul.appendChild(li);
    li.addEventListener('click', openUpdateForm); //TODO idea
    li.innerHTML += item;
  });
}

function managePermission() {
  if (users[currentUser]['permission'] === "normal") {
    document.querySelector("#maps-add-button").style.display = "none";
    document.querySelector("#maps-update-button").style.display = "none";
    document.querySelector("#update-update-button").style.display = "none";
    document.querySelector("#update-delete-button").style.display = "none";
  }
}


var L;

let users = [{
  userName: "admin",
  pass: "admin",
  permission: "admin"
}, {
  userName: "normalo",
  pass: "neko",
  permission: "normal"
}];

let currentUser = -1;

let contacts = [{
  firstName: "Samet",
  lastName: "Yildiz",
  street: "Zwinglistraße 31a",
  plz: "10555",
  city: "Berlin",
  country: "Deutschland",
  priv: false
}, {
  firstName: "Max",
  lastName: "Müller",
  street: "Alexanderplatz 5",
  plz: "10178",
  city: "Berlin",
  country: "Deutschland",
  priv: true
}];


const insert_button = document.querySelector('#btn-insert');
const update_button = document.querySelector('#update-update-button');
const delete_button = document.querySelector('#update-delete-button');

insert_button.addEventListener('click', addContact);
update_button.addEventListener('click', updateContact);
delete_button.addEventListener('click', deleteContact);


function addContact(){
  let addForm = document.querySelector('#add-form');
  let firstName = document.querySelector("#add-first_name").value;
  let lastName = document.querySelector("#add-last_name").value;
  let strasse = document.querySelector("#add-street").value;
  let plz = document.querySelector("#add-plz").value;
  let stadt = document.querySelector("#add-city").value;
  let land = document.querySelector("#add-country").value;
  let priv = document.querySelector("#add-priv").checked;
  
  if(!addForm.reportValidity()){
    return;
  }
  
  let newContact = {

    firstName: firstName,
    lastName: lastName,
    street: strasse,
    plz: plz,
    city: stadt,
    country: land,
    priv: priv
  
  }

  contacts.push(newContact);
  addForm.reset();
  saveContactsLocalStorage();
  openContactList();
  showMap(getAdressList());
}

function openUpdateForm(event){
  let ul = document.querySelector('#contact-list');
  let ulArray = Array.from(ul.children);
  let indexOfContact = ulArray.indexOf(event.target);
  localStorage.setItem('selectedContact', indexOfContact);
  location.href = '#updates';

  document.querySelector("#update-first_name").value = contacts[indexOfContact]['firstName'];
  document.querySelector("#update-last_name").value = contacts[indexOfContact]['lastName'];
  document.querySelector("#update-street").value = contacts[indexOfContact]['street'];
  document.querySelector("#update-plz").value = contacts[indexOfContact]['plz'];
  document.querySelector("#update-city").value = contacts[indexOfContact]['city'];
  document.querySelector("#update-country").value = contacts[indexOfContact]['country'];
  document.querySelector("#update-priv").checked = contacts[indexOfContact]['priv'];
}

function updateContact(){
  
  let selectedContact = localStorage.getItem('selectedContact');
  let updateForm = document.querySelector('#update-form');
  let firstName = document.querySelector("#update-first_name").value;
  let lastName = document.querySelector("#update-last_name").value;
  let strasse = document.querySelector("#update-street").value;
  let plz = document.querySelector("#update-plz").value;
  let stadt = document.querySelector("#update-city").value;
  let land = document.querySelector("#update-country").value;
  let priv = document.querySelector("#update-priv").checked;
  if(!updateForm.reportValidity()){
    return;
  }
  contacts[selectedContact]['firstName'] = firstName;
  contacts[selectedContact]['lastName']= lastName;
  contacts[selectedContact]['street']= strasse;
  contacts[selectedContact]['plz']= plz;
  contacts[selectedContact]['city']= stadt;
  contacts[selectedContact]['country']= land;
  contacts[selectedContact]['priv']= priv;
 

  updateForm.reset();
  saveContactsLocalStorage();
  openContactList();
  showMap(getAdressList());
  localStorage.setItem('selectedContact', null);
}

function deleteContact(){
  let updateForm = document.querySelector('#update-form');
  let selectedContact = localStorage.getItem('selectedContact');
  contacts.splice(selectedContact, 1);
  updateForm.reset();
  saveContactsLocalStorage();
  openContactList();
  showMap(getAdressList());
  localStorage.setItem('selectedContact', null);
}

function saveContactsLocalStorage(){
  localStorage.setItem('contacts', JSON.stringify(contacts));
}

function loadContactsLocalStorage(){
  if(localStorage.getItem('contacts') != null){
    contacts = JSON.parse(localStorage.getItem('contacts'));
  }
}

