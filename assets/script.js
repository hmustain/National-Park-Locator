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

// Create the card
var createParkCard = function (parkData) {
  for (let i = 0; i < parkData.data.length; i++) {

    var parkContainer = document.getElementById('park-container');

    var divRow = document.createElement('div');
    divRow.classList = 'row';
    parkContainer.appendChild(divRow);
    var divCol = document.createElement('div');
    divCol.classList = 'col s12 m7';
    divRow.appendChild(divCol);

    var divCard = document.createElement('div');
    divCard.classList = 'card';
    divCol.appendChild(divCard);

    var parkImgDiv = document.createElement('div');
    parkImgDiv.classList = 'card-image';
    divCard.appendChild(parkImgDiv);

    var parkImg = document.createElement('img');
    parkImg.setAttribute('src', parkData.data[i].images[0].url);
    parkImg.setAttribute('style', 'width:515px height:345px' );
    parkImgDiv.appendChild(parkImg);

    var parkName = document.createElement('span');
    parkName.classList = 'card-title';
    parkName.textContent = parkData.data[i].fullName;
    parkImgDiv.appendChild(parkName);

    var divText = document.createElement('div');
    divText.classList = 'card-content';
    divCard.appendChild(divText);

    var parkDesc = document.createElement('p')
    parkDesc.textContent = parkData.data[i].description;
    divText.appendChild(parkDesc);

    var parkLink = document.createElement('div');
    parkLink.classList = 'card-action';
    divCard.appendChild(parkLink);

    var parkUrl = document.createElement('a')
    parkUrl.setAttribute('href', parkData.data[i].url);
    parkUrl.textContent = parkData.data[i].fullName + "Website";
    parkLink.appendChild(parkUrl);

  }
};

//   var getInfo = function (data) {
//     // park 1 card
//     var parkName = document.getElementById('park-name');
//     var parkDesc = document.getElementById('text-description');
//     var parkUrl = document.getElementById('park-url');
//     var parkImage = document.getElementById('park-image')

// // park 2 card
//     var parkName2 = document.getElementById('park-name2');
//     var parkDesc2 = document.getElementById('text-description2');
//     var parkUrl2 = document.getElementById('park-url2');
//     var parkImage2 = document.getElementById('park-image2')

//     // console.log(data.data[2].name);
//     // park 1 getting data to show up in browser
//     parkName.textContent = data.data[2].fullName;
//     parkDesc.textContent = data.data[2].description;
//     parkUrl.textContent = data.data[2].fullName;
//     parkUrl.href = data.data[2].url;
//     parkImage.src = data.data[2].images[0].url;

//     // console logs 
//     console.log(parkUrl);
//     // parkUrl.a = data.data[2].url;
//     console.log(parkImage2);
//     console.log(data.data[3].name);

//     //park 2 getting data to show up in browser
//     parkName2.textContent = data.data[3].fullName;
//     parkDesc2.textContent = data.data[3].description;
//     parkUrl2.textContent = data.data[3].fullName;
//     parkUrl2.href = data.data[3].url;
//     parkImage2.src = data.data[3].images[0].url;

//     // parkUrl2.textContent = data.data[3].url;
//     // parkUrl2.href = data.data[3].url;

//   };
// };

// var getInfo = function (data) {
// var parkName = document.getElementById('park-name');
// var parkDesc = document.getElementById('text-description');

// console.log(data[0].name);
// parkName.textContent = data[0].name;
// parkDesc.textContent = data[0].description;

// };

searchButtonEl.addEventListener('click', searchSubmit);
