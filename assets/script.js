var stateInput;
var stateSearchEl = document.getElementById('state-name');
var searchButtonEl = document.querySelector('#parksearchbtn');
// var mapboxAPIKey = apiKey.mapboxAPIKey
// var npsAPIKey = apiKey.npsAPIKey
var stateList = {
  'arizona': 'az',
  'alabama': 'al',
  'alaska': 'ak',
  'arkansas': 'ar',
  'california': 'ca',
  'colorado': 'co',
  'connecticut': 'ct',
  'delaware': 'de',
  'florida': 'fl',
  'georgia': 'ga',
  'hawaii': 'hi',
  'idaho': 'id',
  'illinois': 'il',
  'indiana': 'in',
  'iowa': 'ia',
  'kansas': 'ks',
  'kentucky': 'ky',
  'louisiana': 'la',
  'maine': 'me',
  'maryland': 'md',
  'massachusetts': 'ma',
  'michigan': 'mi',
  'minnesota': 'mn',
  'mississippi': 'ms',
  'missouri': 'mo',
  'montana': 'mt',
  'nebraska': 'ne',
  'nevada': 'nv',
  'new Hampshire': 'nh',
  'new Jersey': 'nj',
  'new Mexico': 'nm',
  'new York': 'ny',
  'north Carolina': 'nc',
  'north Dakota': 'nd',
  'ohio': 'oh',
  'oklahoma': 'ok',
  'oregon': 'or',
  'pennsylvania': 'pa',
  'rhode Island': 'ri',
  'south Carolina': 'sc',
  'south Dakota': 'sd',
  'tennessee': 'tn',
  'texas': 'tx',
  'utah': 'ut',
  'vermont': 'vt',
  'virginia': 'va',
  'washington': 'wa',
  'west Virginia': 'wv',
  'wisconsin': 'wi',
  'wyoming': 'wy'
}

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
  
  console.log(stateList);
};



// // Get Park listing
// var getParkList = function (user) {
//   // var apiUrl = 'https://developer.nps.gov/api/v1/parks?' + parkCode +'=acad&api_key=' + npsAPIKey;

//   fetch(apiUrl)
//     .then(function (response) {
//       if (response.ok) {
//         console.log(response);
//         response.json().then(function (data) {
//           console.log(data);
//           displayRepos(data, user);
//         });
//       } else {
//         alert('Error: ' + response.statusText);
//       }
//     })
//     .catch(function (error) {
//       alert('Unable to connect to GitHub');
//     });
// };

searchButtonEl.addEventListener('click', searchSubmit);
