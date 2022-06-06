const API_KEY = "b8753c1d706e3e5284cd9616c6e90c03";
//DOM SELECTOR
var searchForm = document.getElementById("search-form");

var forecastContainer = document.querySelector("#forecast");

const renderCities = () => {
  // get recent cities from LS []
  var searchResults = localStorage.getItem("searchResults");
  var cities = searchResults.split("|");
  var output = "";
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

// Function to display a forecast card given an object from open weather api
// daily forecast.
function renderForecastCard(forecast, timezone) {
  // variables for data from api
  var unixTs = forecast.dt;
  var iconUrl = `https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;
  var iconDescription = forecast.weather[0].description;
  var tempF = forecast.temp.day;
  var { humidity } = forecast;
  var windMph = forecast.wind_speed;

  // Create elements for a card
  var col = document.createElement("div");
  var card = document.createElement("div");
  var cardBody = document.createElement("div");
  var cardTitle = document.createElement("h5");
  var weatherIcon = document.createElement("img");
  var tempEl = document.createElement("p");
  var windEl = document.createElement("p");
  var humidityEl = document.createElement("p");

  col.append(card);
  card.append(cardBody);
  cardBody.append(cardTitle, weatherIcon, tempEl, windEl, humidityEl);

  col.setAttribute("class", "col-md");
  col.classList.add("five-day-card");
  card.setAttribute("class", "card bg-primary h-100 text-white");
  cardBody.setAttribute("class", "card-body p-2");
  cardTitle.setAttribute("class", "card-title");
  tempEl.setAttribute("class", "card-text");
  windEl.setAttribute("class", "card-text");
  humidityEl.setAttribute("class", "card-text");

  // Add content to elements
  cardTitle.textContent = dayjs.unix(unixTs).tz(timezone).format("M/D/YYYY");
  weatherIcon.setAttribute("src", iconUrl);
  weatherIcon.setAttribute("alt", iconDescription);
  tempEl.textContent = `Temp: ${tempF} °F`;
  windEl.textContent = `Wind: ${windMph} MPH`;
  humidityEl.textContent = `Humidity: ${humidity} %`;

  forecastContainer.append(col);
}

// Function to display 5 day forecast.
function renderForecast(dailyForecast, timezone) {
  // Create unix timestamps for start and end of 5 day forecast
  var startDt = dayjs().tz(timezone).add(1, "day").startOf("day").unix();
  var endDt = dayjs().tz(timezone).add(6, "day").startOf("day").unix();

  var headingCol = document.createElement("div");
  var heading = document.createElement("h4");

  headingCol.setAttribute("class", "col-12");
  heading.textContent = "5-Day Forecast:";
  headingCol.append(heading);

  forecastContainer.innerHTML = "";
  forecastContainer.append(headingCol);
  for (var i = 0; i < dailyForecast.length; i++) {
    // The api returns forecast data which may include 12pm on the same day and
    // always includes the next 7 days. The api documentation does not provide
    // information on the behavior for including the same day. Results may have
    // 7 or 8 items.
    if (dailyForecast[i].dt >= startDt && dailyForecast[i].dt < endDt) {
      renderForecastCard(dailyForecast[i], timezone);
    }
  }
}
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
        var searchResults = localStorage.getItem("searchResults");
        searchResults = searchResults + "|" + cityName;
        window.localStorage.setItem("searchResults", searchResults);
        console.log(searchResults);
        renderCities();

        // appendToHistory(search);
        getWeatherforcast(data["coord"]["lon"], data["coord"]["lat"]);
        var icon = data["weather"][0]["icon"];
        var date = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");

        var result = `<h2>${cityName}</h2>${date}<br/><img src="http://openweathermap.org/img/wn/${icon}@2x.png">`;
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
  renderCities();
};

const handleSearchFormSubmit = () => {
  var city = document.getElementById("City").value;
  renderWeatherData(city);
};

const getWeatherforcast = (lon, lat) => {
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&cnt=5&appid=${API_KEY}`;
  fetch(currentWeatherUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);

      if (data["main"]) {
        // appendToHistory(search);
        var icon = data["weather"][0]["icon"];
        var date = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");

        var result = `<div class='weatherBox'><h2>${cityName}</h2>${date}<br/><img src="http://openweathermap.org/img/wn/${icon}@2x.png">`;
        result += `Temp: ${data["main"]["temp"]}F<br>`;
        result += `Humidity: ${data["main"]["humidity"]}%<br>`;
        result += `Wind: ${data["wind"]["speed"]}MPH<br></div>`;
        $("#FiveDayForecast").html(result);
        renderForecast(data["daily"], data["timezone"]);
      }
    })
    .catch(function (err) {
      console.error(err);
    });
};

$(document).ready(onReady);
searchForm.addEventListener("click", handleSearchFormSubmit);
