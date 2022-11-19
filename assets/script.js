mapboxAPIKey = apiKey.mapboxAPIKey
npsAPIKey = apiKey.npsAPIKey
stateSearchEl = document.getElementById('state-name');
searchButtonEl = document.getElementById('parksearchbtn');

// Gathers users search parameter
var searchSubmit = function (event) {
  event.preventDefault();

  stateInput = stateSearchEl.value.trim();
  console.log(stateInput)

  if (stateInput) {
    getStateCode(stateInput);
    stateSearchEl.value = '';
  } else {
    alert('Please enter a state');
  }
};

var getStateCode = function (state) {
  var stateList = {
    'Arizona': 'AZ',
    'Alabama': 'AL',
    'Alaska': 'AK',
    'Arkansas': 'AR',
    'California': 'CA',
    'Colorado': 'CO',
    'Connecticut': 'CT',
    'Delaware': 'DE',
    'Florida': 'FL',
    'Georgia': 'GA',
    'Hawaii': 'HI',
    'Idaho': 'ID',
    'Illinois': 'IL',
    'Indiana': 'IN',
    'Iowa': 'IA',
    'Kansas': 'KS',
    'Kentucky': 'KY',
    'Louisiana': 'LA',
    'Maine': 'ME',
    'Maryland': 'MD',
    'Massachusetts': 'MA',
    'Michigan': 'MI',
    'Minnesota': 'MN',
    'Mississippi': 'MS',
    'Missouri': 'MO',
    'Montana': 'MT',
    'Nebraska': 'NE',
    'Nevada': 'NV',
    'New Hampshire': 'NH',
    'New Jersey': 'NJ',
    'New Mexico': 'NM',
    'New York': 'NY',
    'North Carolina': 'NC',
    'North Dakota': 'ND',
    'Ohio': 'OH',
    'Oklahoma': 'OK',
    'Oregon': 'OR',
    'Pennsylvania': 'PA',
    'Rhode Island': 'RI',
    'South Carolina': 'SC',
    'South Dakota': 'SD',
    'Tennessee': 'TN',
    'Texas': 'TX',
    'Utah': 'UT',
    'Vermont': 'VT',
    'Virginia': 'VA',
    'Washington': 'WA',
    'West Virginia': 'WV',
    'Wisconsin': 'WI',
    'Wyoming': 'WY'
  }
  return stateList[stateAbbr];
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























buttonSearchEl.addEventListener('click', userSearchHandler);
previousSearchEl.addEventListener('click', buttonClickHandler);