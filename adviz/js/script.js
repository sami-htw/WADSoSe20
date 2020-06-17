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
    let regex = /\D\d[AB][AB]\D/;
    return regex.test(code);
  }
}





const login_button = document.querySelector('#login-button')
//const loginForm = document.querySelector('#login-form');
const login_userName = document.querySelector('#username');
const login_password = document.querySelector('#pass');

login_button.addEventListener('click', function (event) {
  // admin index 0, normalo index 1, not in user index -1
  currentUser = users.map(function (user) {
    return user.userName;
  }).indexOf(login_userName.value);
  if (currentUser !== -1 && users[currentUser]["pass"] === login_password.value) {
    managePermission();
    loadContactsLocalStorage();
    openMaps();
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




function openMaps() {
  let element ;
  let contactList = document.querySelector('#fieldMembers > ul');
  if (contactList != null) {
    contactList.remove();
  }
    
  location.href = '#maps';
  ul = document.createElement('ul');

  document.querySelector('#fieldMembers').appendChild(ul);

  getAdressListdisplay().forEach(function (item) {
    let li = document.createElement('li');
    ul.appendChild(li);
    li.addEventListener('click', updateContact); //TODO idea




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

insert_button.addEventListener('click', addContact);


function addContact(){
  let addForm = document.querySelector('#add-form');
  let firstName = document.querySelector("#add-first_name").value;
  let lastName = document.querySelector("#add-last_name").value;
  let strasse = document.querySelector("#add-street").value;
  let plz = document.querySelector("#add-plz").value;
  let stadt = document.querySelector("#add-city").value;
  let land = document.querySelector("#add-country").value;
  let priv = document.querySelector("#add-priv").checked;

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
  openMaps();
  showMap(getAdressList());
}

function updateContact(){
  console.log("Hello World");
}




function saveContactsLocalStorage(){
  localStorage.setItem('contacts', JSON.stringify(contacts));
}

function loadContactsLocalStorage(){
  if(localStorage.getItem('contacts') != null){
    contacts = JSON.parse(localStorage.getItem('contacts'));
  }
}

