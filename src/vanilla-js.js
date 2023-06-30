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
}

let apiKey = "bff072a9132941ace910fa356cbfe57c";
let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=Cape Town&appid=${apiKey}&units=metric`;

axios.get(apiURL).then(displayWeather);
