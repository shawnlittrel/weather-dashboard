//pull search term from text box
var searchObj = document.querySelector('#search-input');
var searchEl = "";
var currentEl = document.querySelector("#current-weather");
var forecastEl = document.querySelector("#weather-forecast");
var cardEl = document.querySelector("#current-weather-card");
var cityData = [];
var searchHistory = document.querySelector("#search-history");

//convert location to lat/long
function objToStr(){
  var searchString = searchObj.value;

  getLocation(searchString);
};

//search for coordinates with string data
function getLocation(str) {
  searchEl = str

  var coordApi =
    "http://api.positionstack.com/v1/forward?access_key=f1ea9c11296bb9b55231907c9490a377&query=" +
    searchEl +
    "&limit=1";
  //fetch coordinate data based on city name input
  fetch(coordApi).then(function (response) {
    if (response.ok) {
      response
        .json()
        //drill down to pertinent data
        .then(function (data) {
          searchLat = data.data[0].latitude;
          searchLong = data.data[0].longitude;
          //add Lat/Long data to history array if it does not already exist
          if(cityData.includes(searchEl)){
            return
          }else{
            cityData.unshift({
              city: searchEl,
              latitude: searchLat,
              longitude: searchLong,
          });
        }

          //saveArray to localStorage
          saveCity(cityData);

          //pass findings to searchLocation
          searchLocation(searchLat, searchLong);
        });
    }
    //if bad request, display error
    else {
      alert("Error" + response.statusText);
    }
  });
}

//input data into api call
function searchLocation(lat, long) {
  //pass coordinate data into weather fetch request
  var locationApi =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    long +
    "&appid=0958194fbb856d0a690b86691e35b9b3&units=imperial";
  fetch(locationApi).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        var currentTemp = data.current.temp;
        var currentDewPoint = data.current.dew_point;
        var currentWindSpeed = data.current.wind_speed;
        var currentUv = data.current.uvi;
        var weatherForecast = data.daily;

        //pass variables to current weather display
        currentWeatherDisplay(
          currentTemp,
          currentDewPoint,
          currentWindSpeed,
          currentUv
        );

        forecastDisplay(weatherForecast);

      });
    } else {
      alert("Error: " + response.statusText);
    }
  });
}

//display current weather on page
function currentWeatherDisplay(temp, dewpoint, wind, uv) {
  //insert info into elements for current weather
  var currentDate = dayjs().format("MMM D");
  var cityTitle = searchEl.charAt(0).toUpperCase() + searchEl.slice(1);
  var titleText = document.querySelector("#current-weather-title");
  var tempText = document.querySelector("#temp-here");
  var dewText = document.querySelector("#dewpoint-here");
  var windText = document.querySelector("#wind-here")
  var uvi = document.querySelector("#uvi-here");
  //format card title
  titleText.textContent = cityTitle + " on " + currentDate + ":";
  //format other card data
  tempText.textContent = temp + " degrees";
  dewText.textContent = dewpoint + " degrees";
  windText.textContent = wind + " mph";
  uvi.innerHTML = "&nbsp &nbsp" + uv + "&nbsp &nbsp";
  //format background for UV index based on danger
  if (uv < 3) {
    uvi.classList.remove(
      "light-green",
      "yellow",
      "accent-3",
      "orange",
      "deep-orange",
      "accent-4"
    );
    uvi.classList.add("light-green");
  } else if (uv < 6) {
    uvi.classList.remove(
      "light-green",
      "yellow",
      "accent-3",
      "orange",
      "deep-orange",
      "accent-4"
    );
    uvi.classList.add("yellow", "accent-3");
  } else if (uv < 8) {
    uvi.classList.remove(
      "light-green",
      "yellow",
      "accent-3",
      "orange",
      "deep-orange",
      "accent-4"
    );
    uvi.classList.add("orange", "accent-4");
  } else {
    uvi.classList.remove(
      "light-green",
      "yellow",
      "accent-3",
      "orange",
      "deep-orange",
      "accent-4"
    );
    uvi.classList.add("deep-orange", "accent-4");
  }

  //show card
  document.querySelector("#current-weather-card").classList.remove("hide");
}

function forecastDisplay(array) {
  //clear old information
  document.querySelector("#weather-cards").textContent = ""
  //pull information out of array for each upcoming day
  for(i = 0; i < array.length; i++){
      var high = array[i].temp.max;
      var low = array[i].temp.min;
      var clouds = array[i].clouds;
      var date = dayjs().add(i, 'day').format("MM/DD/YY");
    
      //append data to cards and place on page
      createForecastCard(high, low, clouds, date);
  };

};

function createForecastCard(high, low, clouds, date){
   //create new div
   var card = document.createElement("div");
   var cloudPct
   
   //add card classes
   card.classList.add("card-panel", "center", "col", "s12", "m6", "l3");

   //format background color based on clouds
   if(clouds < 30){
       card.classList.add("blue", "lighten-2");
       cloudPct = '<p><i class="far fa-sun"></i> &nbsp Sunny</p>';
   }
   else if(clouds > 30 && clouds < 50){
       card.classList.add("light-blue", "lighten-4");
       cloudPct = '<p><i class="far fa-sun"></i> &nbsp Mostly Sunny</p>';
   }
   else if(clouds > 50 && clouds < 70){
       card.classList.add("blue-grey", "lighten-4");
       cloudPct = '<p><i class="fas fa-cloud-sun"></i> &nbsp Mostly Cloudy</p>';
   }
   else{
       card.classList.add("grey");
       cloudPct = '<p><i class="fas fa-cloud"></i> &nbsp Cloudy</p>';
   }

   //add HTML to card
   card.innerHTML = "<p><strong>" + date + "</strong></p>" +
                    cloudPct +
                    "<p> H: &nbsp &nbsp" + high + "</p>" +
                    "<p> L: &nbsp &nbsp" + low + "</p>";

    //append to page
    document.querySelector("#weather-cards").appendChild(card);
}

//save all city data to local storage
function saveCity(arr){
  //clip array to 5 entries
  if(arr.length > 5){
    arr.length = 5;
  };
  //save to local storage
    localStorage.setItem("searchHistory", JSON.stringify(arr));
    getCity();
};

//load all city data
function getCity(){
    //pull object from storage and associate
    var savedCities = localStorage.getItem("searchHistory");
    //if anything was pulled from storage, parse from JSON, otherwise set empty array
    if(savedCities){
        cityData = JSON.parse(savedCities);
    } else{cityData = []}
    //populate historic searches with data
    loadHistory();
}

//push city data array to history tab
function loadHistory(){
  //empty old results
  document.querySelector("#search-history").textContent = "";

  //if there is any info in local storage
  if(cityData.length > 0){
  //loop through existing data
    for(i = 0; i < cityData.length; i++){
        var city = cityData[i].city;
        var card = document.createElement("div");
        var text = document.createElement("span");
        //var historyArray = document.querySelectorAll("div.history-card")
        //add classes and id to card elements
        card.classList.add("card-panel", "s4", "green", "lighten-3", "center", "history-card");
        text.classList.add("grey-text", "text-darken-2");
        card.setAttribute("id", 'card' + i)
      /*
        //check existing cards to see if search term already exists
        for(i = 0; i < historyArray.length; i++){
          if(historyArray.contains(city)){
            return
          }
          else{
      */
        //add text to span
        text.textContent = city;
        //append span to card
        card.appendChild(text);
        //append card to page
        document.querySelector("#search-history").prepend(card);        
          }
        //}
        
    //}
  }
  //otherwise return
  else{return};

};

//pull up results for historic searches
searchHistory.onclick = function(event){
  //which element was clicked?
  let target = event.target;
  //get text content of clicked card
  var targetText = target.textContent;
  //pass to global variable
  searchStr = targetText;
  //run search for clicked card
  getLocation(targetText);
}

getCity();
document.querySelector("#search-button").addEventListener("click", objToStr);
