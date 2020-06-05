


window.onload = function() {
  showMap(getAdressList());
}



function showMap(list){
 
  L.mapquest.key = 'CKvWSTNixxAb9dVV0kMTryinWJdAqS8K';

  // Geocode three locations, then call the createMap callback
  L.mapquest.geocoding().geocode(list, createMap);

  // 'map' refers to a <div> element with the ID map
  function createMap(error, response) {
    // Initialize the Map
    let map = L.mapquest.map('map', {
      layers: L.mapquest.tileLayer('map'),
      center: [0, 0],
      zoom: 12
    });
  
     // Generate the feature group containing markers from the geocoded locations
     let featureGroup = generateMarkersFeatureGroup(response);

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
      if(!parseQualityCode(code)){
        continue;
      }
      // Create a marker for each location
      let marker = L.marker(locationLatLng, {icon: L.mapquest.icons.marker()})
        .bindPopup(location.street + ', ' + location.adminArea5 + ', ' + location.adminArea3);

      group.push(marker);
    }
    return L.featureGroup(group);
  }

  function parseQualityCode(code){
    // at least confidence match quality A OR B to be displayed as marker
    let regex = /\D\d[AB][AB]\D/;
    return regex.test(code);
  }
}


const loginForm = document.querySelector('#login-form');
const login_userName = document.querySelector('#username');
const login_password = document.querySelector('#pass');

loginForm.addEventListener('submit', function(event){
  // admin index 0, normalo index 1, not in user index -1
  let index = users.map(function (user) { return user.userName; }).indexOf(login_userName.value);
  if (index !== -1 && users[index]["pass"] === login_password.value){
    if(users[index]["permission"] === "normal"){
      document.querySelector("#maps-add-button").style.display="none";
      document.querySelector("#maps-update-button").style.display="none";
    }
  } else {
    event.preventDefault();
    alert("Wrong Username or password")
  }
});

function getAdressList(){
  let list = [];
  let del = ', ';
  for(i = 0 ; i < contacts.length; i++ ){
    adress = contacts[i]['street'] + del + contacts[i]['plz'] + del + contacts[i]['city'] + del + contacts[i]['country'] ;
    list.push(adress);
    
    
  }
  return list;
}

// the elements will  
function getListElement(){

  document.get
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

let contacts = [{
  firstName: "Samet",
  lastName: "Yildiz",
  street: "Zwinglistraße 31a",
  plz: "10555",
  city:"Berlin",
  country:"Deutschland"
}, {
  firstName: "Max",
  lastName: "Müller",
  street: "Alexanderplatz 5",
  plz: "10178",
  city:"Berlin",
  country:"Deutschland"
}];