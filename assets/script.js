var stateInput;
var stateSearchEl = document.getElementById('state-name');
var searchButtonEl = document.querySelector('#parksearchbtn');
// var mapboxAPIKey = apiKey.mapboxAPIKey
var npsAPIKey = apiKey.npsAPIKey

// Gathers users search parameter and converts to lowercase
var searchSubmit = function (event) {
  event.preventDefault();

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
  var apiUrl = 'https://developer.nps.gov/api/v1/parks?stateCode=' + abbr + '&api_key=' + npsAPIKey;

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          // displayRepos(data, user);
          console.log(data.states)
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to National Park Service');
    });
    
};



searchButtonEl.addEventListener('click', searchSubmit);
