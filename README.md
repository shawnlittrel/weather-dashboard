# Weather Dashboard

**Description**
---
This page is a simple weather dashboard for checking future and current conditions in a given location.  It was written with HTML, Materialize CSS, vanilla Javascript.  It utilizes APIs from positionstack to geocode city names to latitude and longitude coordinates, API from openweather to fetch weather for the selected location, and day.js to handle time and date.  

The user enters a city and state or city and country, and is then presented with a card which displays the city name and current date.  Below the heading are the current temperature, dewpoint, windspeed, and UV index.  The color of  the UV index changes based on how dangerous the current sunlight is.  Colors range from green to red in order to give the user a clear visual understanding of how fast they will be burned if in the sun.

Under the current conditions are a set of cards that show the weather forecast.  Each card contains the date, amount of clouds (sunny, mostly sunny, mostly cloudy, or cloudy), and the high and low temperatures for the day.  The icons for cloud level as well as the card background dynamically change based on the number of clouds forecasted for that day.

Once a search query is initiated, the query is saved to an array which is displayed by a set of up to 5 cards on the left hand side of the screen.  The user may click those cards to search for that particular location again.

**Screenshots**
---
Landing Page
![Screenshot](/assets/images/landing-page.JPG?raw=true "Landing Page")

Example Search Results
![Screenshot](/assets/images/search-info.JPG?raw=true "Search Results")


**Future Improvements**
---
I plan to improve the website by switching the forecast card display to a carousel for a more interactive experience.  There is also a current bug where searching for a city populates another card with that city name.  I plan to optimize the code so that clicking a history card will not cause any further array modifications.

**See Code In Action**
---
https://shawnlittrel.github.io/weather-dashboard
