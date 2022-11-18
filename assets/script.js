mapboxAPIKey = apiKey.mapboxAPIKey
npsAPIKey = apiKey.npsAPIKey
userSearchEl = document.getElementById("user-input")
parkSearch;

var buttonSearchHandler = function (event) {
    event.preventDefault();
  
    parkSearch = userSearchEl.value.trim();
  
    if (parkSearch) {
        getParkList(parkSearch);
  
      userSearchEl.value = '';
    } else {
      alert('Please enter a ');
    }
  };


  // Get Park listing
  var getParkList = function (user) {
    // var apiUrl = 'https://developer.nps.gov/api/v1/parks?' + parkCode +'=acad&api_key=' + npsAPIKey;
  
    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          console.log(response);
          response.json().then(function (data) {
            console.log(data);
            displayRepos(data, user);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('Unable to connect to GitHub');
      });
  };
























buttonSearchEl.addEventListener('click', userSearchHandler);
previousSearchEl.addEventListener('click', buttonClickHandler);