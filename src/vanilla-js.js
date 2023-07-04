//Time & Date

function formatDate(timestamp) {
  let currentDate = new Date(timestamp);
  let week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = week[currentDate.getDay()];

  let currentHour = currentDate.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinutes = currentDate.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  return `${currentDay}, ${currentHour}:${currentMinutes}`;
}

//Forecast
function showForecast() {
  let forecast = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
            <div class="col-2">
              <div class="weather-forecase-date">
              ${day}
              </div>
              <img src="http://openweathermap.org/img/wn/01n@2x.png" alt="" width="36" />
              <div class="weather-forecast-temps">
              <span class="weather-forecast-temp-max">18&deg;</span>
              <span class="weather-forecast-temp-min">12&deg;</span>
              </div>
            </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;

  forecast.innerHTML = forecastHTML;
}

//Weather Display & Conditions
function displayWeather(response) {
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;

  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(response.data.main.temp);

  let weatherDescription = document.querySelector("#description");
  weatherDescription.innerHTML = response.data.weather[0].description;

  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = Math.round(response.data.main.feels_like);

  let cloudCover = document.querySelector("#cloud-cover");
  cloudCover.innerHTML = response.data.clouds.all;

  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);

  let timeDate = document.querySelector("#time-date");
  timeDate.innerHTML = formatDate(response.data.dt * 1000);

  let weatherIcon = document.querySelector("#weather-icon");
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  celsiusTemp = response.data.main.temp;
}

function searchCity(city) {
  let apiKey = "bff072a9132941ace910fa356cbfe57c";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#searchCityInput");
  searchCity(cityInput.value);
}

searchCity("Cape Town");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

//Temperature Conversion

function showFahrenheitTemp(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  celsiusConversion.classList.remove("active");
  fahrenheitConversion.classList.add("active");
  let fahrenheit = (celsiusTemp * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheit);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  celsiusConversion.classList.add("active");
  fahrenheitConversion.classList.remove("active");
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let fahrenheitConversion = document.querySelector("#fahrenheit-link");
fahrenheitConversion.addEventListener("click", showFahrenheitTemp);

let celsiusConversion = document.querySelector("#celsius-link");
celsiusConversion.addEventListener("click", showCelsiusTemp);

showForecast();
