var selectInstances;

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('select');
  selectInstances = M.FormSelect.init(elems, {});
});


var stateInput;
var stateSearchEl = document.getElementById('state-name');
var searchButtonEl = document.querySelector('#parksearchbtn');
var mapboxAPIKey = "pk.eyJ1IjoiaG11c3RhaW4iLCJhIjoiY2xhajR1ODl2MDlhZzNybGY0aTU5emp0ZCJ9.2qOaknYc9ioiQbeuM_QbNg";
var npsAPIKey = "NY4tbVheCsm7Lqu2d87KRiybr7CcRPaAERNqOpKA";
var mapEl = document.getElementById('park-map');
var parkContainer = document.getElementById('park-container');
var states = document.getElementById('states');

// Gathers users search selection
var searchSubmit = function (event) {
  event.preventDefault();
  var selectedStates = selectInstances[0].getSelectedValues();
  console.log(selectedStates);

  for (i = 0; i < selectedStates.length; i++) {

    getParkList(selectedStates[i]);

  }
};

// Get Park listing
var getParkList = function (abbr) {
  console.log(abbr);
  var apiUrl = 'https://developer.nps.gov/api/v1/parks?stateCode=' + abbr + '&api_key=' + npsAPIKey;

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          createHeaders(data);
          createParkCard(data);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to National Park Service');
    })
};

// Get Maps for park listings
var getMapImgSrc = function (mapData) {
  if (mapData.longitude === "" || mapData.latitude === "") {
    return "https://www.knowitall.org/sites/default/files/styles/assets_detail/public/2022-03/DVQECyCX0AEHo0r.jpg.webp?itok=q0bWWVxf";
  }
  return "https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/" + mapData.longitude + "," + mapData.latitude + ",10,0/400x400?access_token=" + mapboxAPIKey;
};

// Creates the state name headers for the search results
var createHeaders = function (parkData) {
  
    var parkHeading = document.createElement('h2');
    parkHeading.textContent = "State: " + parkData.data[i].addresses[0].stateCode;
    parkHeading.setAttribute('style', 'text-align: center')
    parkContainer.appendChild(parkHeading);
};

// Create the park and map cards
var createParkCard = function (parkData) {

  for (let i = 0; i < parkData.data.length; i++) {

    var parkContainer = document.getElementById('park-container');

    var divRow = document.createElement('div');
    divRow.classList = 'row';
    parkContainer.appendChild(divRow);


    // Map Cards
    var divMapCol = document.createElement('div');
    divMapCol.classList = 'col s12 m6 l6 hoverable';
    divRow.appendChild(divMapCol);

    var divMapCard = document.createElement('div');
    divMapCard.classList = 'card xl';
    divMapCol.appendChild(divMapCard);

    var mapImgDiv = document.createElement('div');
    mapImgDiv.classList = 'card-image';
    divMapCard.appendChild(mapImgDiv);

    var mapImg = document.createElement('img');
    mapImg.setAttribute('src', getMapImgSrc(parkData.data[i]));
    mapImg.setAttribute('style', 'width:100%; height:345px;');
    mapImgDiv.appendChild(mapImg);

    var divMapText = document.createElement('div');
    divMapText.classList = 'card-content';
    divMapCard.appendChild(divMapText);

    var mapAddCont = document.createElement('ul');
    mapAddCont.setAttribute('style', 'list-style:none');
    divMapText.appendChild(mapAddCont);

    var mapAdd = document.createElement('li');
    mapAdd.textContent = parkData.data[i].addresses[0].line1 + ", " + parkData.data[i].addresses[0].city + " " + parkData.data[i].addresses[0].stateCode + ", " + parkData.data[i].addresses[0].postalCode;
    mapAdd.setAttribute('style', 'font-weight: bolder');
    mapAddCont.appendChild(mapAdd);

    if (parkData.data[i].operatingHours.length === 0) {
      var mapHour = document.createElement('p');
      mapHour.textContent = "Please call for current hours.  " + parkData.data[i].contacts.phoneNumbers[0].phoneNumber
      mapAddCont.appendChild(mapHour);
    } else {

      var mapHourCont = document.createElement('ul');
      mapHourCont.setAttribute('style', 'list-style:none');
      divMapText.appendChild(mapHourCont);

      var mapHour = document.createElement('li');
      mapHour.textContent = "Sunday: " + parkData.data[i].operatingHours[0].standardHours.sunday;
      mapHourCont.appendChild(mapHour);

      var mapHour = document.createElement('li');
      mapHour.textContent = "Monday: " + parkData.data[i].operatingHours[0].standardHours.monday;
      mapHourCont.appendChild(mapHour);

      var mapHour = document.createElement('li');
      mapHour.textContent = "Tuesday: " + parkData.data[i].operatingHours[0].standardHours.tuesday;
      mapHourCont.appendChild(mapHour);

      var mapHour = document.createElement('li');
      mapHour.textContent = "Wednesday: " + parkData.data[i].operatingHours[0].standardHours.wednesday;
      mapHourCont.appendChild(mapHour);

      var mapHour = document.createElement('li');
      mapHour.textContent = "Thursday: " + parkData.data[i].operatingHours[0].standardHours.thursday;
      mapHourCont.appendChild(mapHour);

      var mapHour = document.createElement('li');
      mapHour.textContent = "Friday: " + parkData.data[i].operatingHours[0].standardHours.friday;
      mapHourCont.appendChild(mapHour);

      var mapHour = document.createElement('li');
      mapHour.textContent = "Saturday: " + parkData.data[i].operatingHours[0].standardHours.saturday;
      mapHourCont.appendChild(mapHour);
    };

    // Park Cards
    var divParkCol = document.createElement('div');
    divParkCol.classList = 'col s12 m6 l6  hoverable';
    divRow.appendChild(divParkCol);

    var divParkCard = document.createElement('div');
    divParkCard.classList = 'card xl';
    divParkCol.appendChild(divParkCard);

    var parkImgDiv = document.createElement('div');
    parkImgDiv.classList = 'card-image';
    divParkCard.appendChild(parkImgDiv);

    var parkImg = document.createElement('img');
    parkImg.setAttribute('src', parkData.data[i].images[0].url);
    parkImg.setAttribute('alt', parkData.data[i].images[0].altText);
    parkImg.setAttribute('style', 'width:100%; height:345px;');
    parkImgDiv.appendChild(parkImg);

    var parkName = document.createElement('span');
    parkName.classList = 'card-title';
    parkName.textContent = parkData.data[i].fullName;
    parkImgDiv.appendChild(parkName);

    var divParkText = document.createElement('div');
    divParkText.classList = 'card-content';
    divParkCard.appendChild(divParkText);

    var parkDesc = document.createElement('p')
    parkDesc.textContent = parkData.data[i].description;
    divParkText.appendChild(parkDesc);

    var parkLink = document.createElement('div');
    parkLink.classList = 'card-action';
    divParkCard.appendChild(parkLink);

    var parkUrl = document.createElement('a')
    parkUrl.setAttribute('href', parkData.data[i].url);
    parkUrl.textContent = parkData.data[i].fullName + " Website";
    parkLink.appendChild(parkUrl);
  }
};


searchButtonEl.addEventListener('click', searchSubmit);
