const API_KEY = "b8753c1d706e3e5284cd9616c6e90c03";

const renderCities = () => {
  // get recent cities from LS []
  let searchResults = localStorage.getItem("searchResults");
  let cities = searchResults.split("|");
  let output = "";
  cities.forEach((city) => {
    output += `<span class='searchHistoryButton'>${city}</span>`;
  });
  document.getElementById("search").innerHTML = output;
  // if [] is empty then render alert
  // else render all recent cities
  // add an event listener on div containing all cities
};

const renderCurrentWeather = (currentWeatherData) => {
  // render the current weather data and append to section
};

const renderForecastWeather = (forecastWeatherData) => {
  // render the forecast weather data and append each card to section
};

const renderWeatherData = (cityName) => {
  // use API to fetch current weather data

  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;

  fetch(currentWeatherUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);

      if (!data["main"]) {
        alert("Location not found");
      } else {
        let searchResults = localStorage.getItem("searchResults");
        searchResults = searchResults + "|" + cityName;
        window.localStorage.setItem("searchResults", searchResults);
        console.log(searchResults);
        renderCities();

        // appendToHistory(search);
        getWeatherforcast(data["coord"]["lon"], data["coord"]["lat"]);
        let icon = data["weather"][0]["icon"];
        let date = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");

        let result = `<h2>${cityName}</h2>${date}<br/><img src="http://openweathermap.org/img/wn/${icon}@2x.png">`;
        result += `Temp: ${data["main"]["temp"]}F<br>`;
        result += `Humidity: ${data["main"]["humidity"]}%<br>`;
        result += `Wind: ${data["wind"]["speed"]}MPH<br>`;
        $("#result").html(result);
      }
    })
    .catch(function (err) {
      console.error(err);
    });
  // from the response cherry pick all the data you want to see in the current weather card

  // get the lat and lon from current weather data API response
  //const forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&units=metric&appid=${API_KEY}`;

  // render current weather data

  // render forecast weather data
};

const handleFormSubmit = () => {
  // get the city name from input
  // if city name is empty handle that
  // else render weather data
};

const onReady = () => {
  // render recent cities
};

$(document).ready(onReady);
const searchCity = () => {
  let city = document.getElementById("City").value;
  renderWeatherData(city);
};

const getWeatherforcast = (lon, lat) => {
  const currentWeatherUrl = `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=5&appid=${API_KEY}`;
  fetch(currentWeatherUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);

      if (data["main"]) {
        // appendToHistory(search);
        let icon = data["weather"][0]["icon"];
        let date = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");

        let result = `<div class='weatherBox'><h2>${cityName}</h2>${date}<br/><img src="http://openweathermap.org/img/wn/${icon}@2x.png">`;
        result += `Temp: ${data["main"]["temp"]}F<br>`;
        result += `Humidity: ${data["main"]["humidity"]}%<br>`;
        result += `Wind: ${data["wind"]["speed"]}MPH<br></div>`;
        $("#FiveDayForecast").html(result);
      }
    })
    .catch(function (err) {
      console.error(err);
    });
};
renderCities();
