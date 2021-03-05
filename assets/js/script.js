//pull search term from text box
var searchEl = 'Cairo, Egypt' //document.querySelector("search-input");
var searchLat = "";
var searchLong = "";

//convert location to lat/long
function getLocation(){
    var coordApi = 'http://api.positionstack.com/v1/forward?access_key=f1ea9c11296bb9b55231907c9490a377&query=' + searchEl + '&limit=1'
    

    fetch(coordApi)
    .then(function(response){
        if(response.ok){
            response.json()
            .then(function(data){
                searchLat = data.data[0].latitude;
                searchLong = data.data[0].longitude;
                searchLocation(searchLat, searchLong);
            })

        }
        else{
            alert('Error' + response.statusText)
        };
    })
    
};
//input data into api call
function searchLocation(lat, long){
    var locationApi = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + long + '&appid=0958194fbb856d0a690b86691e35b9b3&units=imperial'
    fetch(locationApi)
    .then(function(response){
        if(response.ok){
            response.json()
            .then(function(data){
                console.log('Location data', data);
            })
        }
    })
}

function log(){
    console.log(searchLat);
    console.log(searchLong);
}
//fetch data

//display on page

//save location to history

getLocation();