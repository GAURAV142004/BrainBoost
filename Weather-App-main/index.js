let date = new Date();

let hours = date.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = date.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[date.getDay()];

let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let todayDate = date.getDate();
let month = months[date.getMonth()];
let year = date.getFullYear();

let timeElement = document.querySelector("#time");
timeElement.innerHTML = `${hours}:${minutes}`;

let dateElement = document.querySelector("#date");
dateElement.innerHTML = `${day},&nbsp; ${todayDate} ${month},&nbsp; ${year}`;

function getCity(event) {
  event.preventDefault();
  let changeCity = document.querySelector("#place");
  displayCity(changeCity.value);
}

displayCity("New York");

function displayCity(city) {
  let apiKey = "2fa9ddec71ce08d23a59a79b1d873ee1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(getTemp);
}

let city = document.querySelector("#form");
city.addEventListener("submit", getCity);

function getTemp(response) {
  console.log(response.data);
  tempinC = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${Math.round(response.data.main.temp)}&degC`;

  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#country").innerHTML = response.data.sys.country;
  document.querySelector("#high").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#low").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  let iconElement = document.querySelector("#icon-current");
  iconElement.setAttribute("src", `img/${response.data.weather[0].icon}.png`);
  iconElement.setAttribute("alt", `${response.data.weather[0].description}`);
  getForecast(response.data.coord);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "2fa9ddec71ce08d23a59a79b1d873ee1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
          <div class="column">
            <div class="card">
              <img src="img/${
                forecastDay.weather[0].icon
              }.png" id="icon1" width="90%" />
              <h3 id="day1">${formatDay(forecastDay.dt)}</h3>
              <h4>
                <span class="min">${Math.round(forecastDay.temp.min)}° </span>|
                <span class="max">${Math.round(forecastDay.temp.max)}° </span>
              </h4>
            </div>
          </div>
    `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showCurrentLocation(position) {
  let apiKey = "2fa9ddec71ce08d23a59a79b1d873ee1";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getTemp);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

let tempinC = null;

function getInF(event) {
  event.preventDefault();
  let tempinF = (tempinC * 9) / 5 + 32;
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${Math.round(tempinF)}&degF`;
}

let viewinF = document.querySelector("#f");
viewinF.addEventListener("click", getInF);

function getInC(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${Math.round(tempinC)}&degC`;
}

let viewinC = document.querySelector("#c");
viewinC.addEventListener("click", getInC);

displayCity("New York");
