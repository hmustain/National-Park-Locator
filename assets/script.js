var stateInput;
var stateSearchEl = document.getElementById('state-name');
var searchButtonEl = document.querySelector('#parksearchbtn');
var mapboxAPIKey = apiKey.mapboxAPIKey
var npsAPIKey = apiKey.npsAPIKey
var mapEl = document.getElementById('park-map');
var parkContainer = document.getElementById('park-container');

// Gathers users search parameter and converts to lowercase
var searchSubmit = function (event) {
  event.preventDefault();
  parkContainer.innerHTML = "";
  stateInput = stateSearchEl.value.trim();
  console.log(stateInput);
  lowerState = stateInput.toLowerCase();
  console.log(lowerState);

  if (lowerState) {
    getStateCode(lowerState);
    stateSearchEl.value = '';
  } else {
    alert('Please enter a state');
  }
};

// Converts state to 2 letter abbreviation for park api search
var getStateCode = function (state) {
  var stateList = [
    { state: 'arizona', abbr: 'az' },
    { state: 'alabama', abbr: 'al' },
    { state: 'alaska', abbr: 'ak' },
    { state: 'arkansas', abbr: 'ar' },
    { state: 'california', abbr: 'ca' },
    { state: 'colorado', abbr: 'co' },
    { state: 'connecticut', abbr: 'ct' },
    { state: 'delaware', abbr: 'de' },
    { state: 'florida', abbr: 'fl' },
    { state: 'georgia', abbr: 'ga' },
    { state: 'hawaii', abbr: 'hi' },
    { state: 'idaho', abbr: 'id' },
    { state: 'illinois', abbr: 'il' },
    { state: 'indiana', abbr: 'in' },
    { state: 'iowa', abbr: 'ia' },
    { state: 'kansas', abbr: 'ks' },
    { state: 'kentucky', abbr: 'ky' },
    { state: 'louisiana', abbr: 'la' },
    { state: 'maine', abbr: 'me' },
    { state: 'maryland', abbr: 'md' },
    { state: 'massachusetts', abbr: 'ma' },
    { state: 'michigan', abbr: 'mi' },
    { state: 'minnesota', abbr: 'mn' },
    { state: 'mississippi', abbr: 'ms' },
    { state: 'missouri', abbr: 'mo' },
    { state: 'montana', abbr: 'mt' },
    { state: 'nebraska', abbr: 'ne' },
    { state: 'nevada', abbr: 'nv' },
    { state: 'new hampshire', abbr: 'nh' },
    { state: 'new jersey', abbr: 'nj' },
    { state: 'new mexico', abbr: 'nm' },
    { state: 'new york', abbr: 'ny' },
    { state: 'north carolina', abbr: 'nc' },
    { state: 'north dakota', abbr: 'nd' },
    { state: 'ohio', abbr: 'oh' },
    { state: 'oklahoma', abbr: 'ok' },
    { state: 'oregon', abbr: 'or' },
    { state: 'pennsylvania', abbr: 'pa' },
    { state: 'rhode island', abbr: 'ri' },
    { state: 'south carolina', abbr: 'sc' },
    { state: 'south dakota', abbr: 'sd' },
    { state: 'tennessee', abbr: 'tn' },
    { state: 'texas', abbr: 'tx' },
    { state: 'utah', abbr: 'ut' },
    { state: 'vermont', abbr: 'vt' },
    { state: 'virginia', abbr: 'va' },
    { state: 'washington', abbr: 'wa' },
    { state: 'west virginia', abbr: 'wv' },
    { state: 'wisconsin', abbr: 'wi' },
    { state: 'wyoming', abbr: 'wy' },
  ];
  var result;
  for (i = 0; i < stateList.length; i++) {
    if (state === stateList[i].state) {
      result = stateList[i].abbr
    }
  }
  console.log(result);
  getParkList(result);
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

// Create the cards
var createParkCard = function (parkData) {
  for (let i = 0; i < parkData.data.length; i++) {

    var parkContainer = document.getElementById('park-container');

    var divRow = document.createElement('div');
    divRow.classList = 'row';
    parkContainer.appendChild(divRow);

    // Map Cards
    var divMapCol = document.createElement('div');
    divMapCol.classList = 'col s6 m6 hoverable';
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
    mapAddCont.appendChild(mapAdd);

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

    // Park Cards
    var divParkCol = document.createElement('div');
    divParkCol.classList = 'col s6 m6 hoverable';
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

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('select');
  var instances = M.AutoInit();
});
// searchButtonEl.addEventListener('click', searchSubmit);
