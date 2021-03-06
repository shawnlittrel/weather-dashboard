//pull search term from text box
var searchEl = "Phoenix, AZ" //document.querySelector("#search-input");
var currentEl = document.querySelector("#current-weather");
var forecastEl = document.querySelector("#weather-forecast");
var cardEl = document.querySelector("#current-weather-card")
let cityData = [];



//convert location to lat/long
function getLocation(){
    var coordApi = 'http://api.positionstack.com/v1/forward?access_key=f1ea9c11296bb9b55231907c9490a377&query=' + searchEl + '&limit=1'
    //fetch coordinate data based on city name input
    fetch(coordApi)
    .then(function(response){
        if(response.ok){
            response.json()
            //drill down to pertinent data
            .then(function(data){
                searchLat = data.data[0].latitude;
                searchLong = data.data[0].longitude;
                //add Lat/Long data to history array
                cityData.push({'city': searchEl,
                                'latitude': searchLat,
                                'longitude': searchLong 
                });

                //saveArray to localStorage
                saveCity();

                //pass findings to searchLocation
                searchLocation(searchLat, searchLong);
            })

        }
        //if bad request, display error
        else{
            alert('Error' + response.statusText)
        };
    })
    
};

//input data into api call
function searchLocation(lat, long){
    //pass coordinate data into weather fetch request
    var locationApi = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + long + '&appid=0958194fbb856d0a690b86691e35b9b3&units=imperial'
    fetch(locationApi)
    .then(function(response){
        if(response.ok){
            response.json()
            .then(function(data){
                var currentTemp = data.current.temp;
                var currentHumidity = data.current.humidity;
                var currentWeatherReturn = data.current.weather;
                var weatherForecast = data.daily;   
            });
        };
    });
};

//display on page
function currentWeatherDisplay(){
//insert info into elements for current weather

//show card

}

function forecastDisplay(){
//pull information out of array for each upcoming day

//insert info into cards

//color cards by high temp

//show cards

}

//save location to history
getLocation();