import { returnWindDirection } from "./modules/returnWindDirect.js";
import {
  convertTimestampToTime,
  convertTimestampToWeekDay,
} from "./modules/convertTimestamp.js";
import {
  displayImg,
  displayData,
  displayCurrDateAndTime,
  dailyHourlyForecastDisplay,
} from "./modules/display.js";
import { getDataFromAPI as getData } from "./modules/getDataFromAPI.js";
import { getCityNameCoords } from "./modules/getCityNameCoords.js";
import { changeClassToClass } from "./modules/changeClassToClass.js";

// Containers
const searchTxtInput = document.querySelector(".search-input");
const searchByUserGeolocButton = document.querySelector(".geolocation-icon");
const searchByCityButton = document.querySelector(".search-button");
const errorMessage = document.querySelector(".error-message");
const widgetCont = document.querySelector(".weather-container");
const backgroundImgCont = document.querySelector(".img-container");
const timeBackgroundImg = document.querySelector(".time-img");
const currTempCont = document.querySelector(".curr-temp");
const feelsLikeCont = document.querySelector(".feels-like-curr-temp");
const weatherIconCont = document.querySelector(".weather-icon");
const weatherIcon = document.querySelector(".weather-icon");
const weatherDescCont = document.querySelector(".weather-desc");
const infoCont = document.querySelector(".info-container");
const locationCont = document.querySelector(".location");
const postcodeCont = document.querySelector(".postcode");
const currDayCont = document.querySelector(".curr-day");
const currTimeCont = document.querySelector(".curr-time");
const detailsCont = document.querySelector(".details-container");
const tileIcons = document.querySelectorAll(".tile-icon");
const sunriseTimeCont = document.querySelector(".sunrise-time");
const sunsetTimeCont = document.querySelector(".sunset-time");
const minTempCont = document.querySelector(".min-temp");
const maxTempCont = document.querySelector(".max-temp");
const windSpeedCont = document.querySelector(".wind-speed");
const windDirectCont = document.querySelector(".wind-direction");
const windDirectIcon = document.querySelector(".wind-direct-icon");
const humidityCont = document.querySelector(".humidity");
const pressureCont = document.querySelector(".pressure");
const forecastCont = document.querySelector(".weather-forecast");
const displayHourlyButton = document.querySelector(".disp-hourly");
const displayDailyButton = document.querySelector(".disp-daily");
const hourlyForecastCont = document.querySelector(".hourly-forecast");
const dailyForecastCont = document.querySelector(".daily-forecast");

// Display weather data
async function displayWeatherData(coords) {
  const [lat, lon] = coords;

  const locationData = await getData(
    `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=f52a5f9fe97247faaeb2a726f9ca5405`
  );
  const location = `${locationData.features[0].properties.city}, `;
  const postcode = locationData.features[0].properties.postcode;

  const weatherData = await getData(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=metric&appid=2036b1729952c5742fea723833b9919b`
  );
  const currTemp = `${Math.floor(weatherData.current.temp)}°C`;
  const feelsLikeCurrTemp = `${Math.floor(weatherData.current.feels_like)}°C`;
  const currWeatherIcon = weatherData.current.weather[0].icon;
  const currWeatherDescription = weatherData.current.weather[0].description;
  const timezoneOffset = weatherData.timezone_offset;
  const sunriseTime = convertTimestampToTime(
    weatherData.current.sunrise + timezoneOffset
  );
  const sunsetTime = convertTimestampToTime(
    weatherData.current.sunset + timezoneOffset
  );
  const minTemp = `${weatherData.daily[0].temp.min.toFixed(1)}°C`;
  const maxTemp = `${weatherData.daily[0].temp.max.toFixed(1)}°C`;
  const windSpeed = `${(weatherData.current.wind_speed * 3.6).toFixed(1)}km/h`;
  const windDegrees = weatherData.current.wind_deg;
  const windDirect = returnWindDirection(windDegrees);
  const humidity = `${weatherData.current.humidity}%`;
  const pressure = `${weatherData.current.pressure} hPa`;
  const iconColor =
    currWeatherIcon.at(-1) === "d" ? "filter-darkblue" : "filter-white";
  const borderColor =
    currWeatherIcon.at(-1) === "d" ? "border-day" : "border-night";

  // Display background time img
  displayImg(
    currWeatherIcon.at(-1) === "d" ? "day" : "night",
    timeBackgroundImg,
    "jpg"
  );

  // Display wind direction icon
  displayImg(
    windDirect.length > 2 ? "wind-direct" : windDirect,
    windDirectIcon,
    "png"
  );

  // Display current weather data
  displayImg(currWeatherIcon, weatherIconCont, "png");
  displayData(currTemp, currTempCont);
  displayData(feelsLikeCurrTemp, feelsLikeCont);
  displayData(currWeatherDescription, weatherDescCont);
  displayData(location, locationCont);
  displayData(postcode, postcodeCont);
  displayData(sunriseTime, sunriseTimeCont);
  displayData(sunsetTime, sunsetTimeCont);
  displayData(minTemp, minTempCont);
  displayData(maxTemp, maxTempCont);
  displayData(windSpeed, windSpeedCont);
  displayData(windDirect, windDirectCont);
  displayData(humidity, humidityCont);
  displayData(pressure, pressureCont);
  displayCurrDateAndTime(
    weatherData.current.dt + timezoneOffset - 7200,
    currDayCont,
    currTimeCont
  );

  // Display hourly forecast data
  weatherData.hourly.map((hourlyData) => {
    const forecastTime = convertTimestampToTime(hourlyData.dt + timezoneOffset);
    const forecastTemp = hourlyData.temp.toFixed(1);
    const forecastIcon = hourlyData.weather[0].icon;

    const html = `
    <div class="forecast-tile hourly-tile ${borderColor}">
      <p class="forecast-time-date row-1 col-1">${forecastTime}</p>
      <img src="./images/${forecastIcon}.png" class="hourly-icon ${iconColor} row-2 col-1" />
      <h3 class="hourly-forecast-temp row-3 col-1">${forecastTemp}°C</h3>
    </div>
    `;

    hourlyForecastCont.innerHTML += html;
  });

  // Display daily forecast data
  weatherData.daily.slice(1).map((dailyData) => {
    const forecastWeekDay = convertTimestampToWeekDay(
      dailyData.dt + timezoneOffset
    );
    const forecastIcon = dailyData.weather[0].icon;
    const tempDay = dailyData.temp.day.toFixed(1);
    const tempNight = dailyData.temp.night.toFixed(1);

    const html = `
    <div class="forecast-tile daily-tile ${borderColor}">
      <p class="forecast-time-date row-1 col-1">${forecastWeekDay}</p>
      <img src="./images/${forecastIcon}.png" class="daily-icon ${iconColor}" />
      <div class="daily-forecast-temp">
      <img src="./images/01d.png " class="${iconColor} row-1 col-1" />
      <h3 class="row-1 col-2">${tempDay}°C</h3>
        <img src="./images/01n.png" class="${iconColor} row-2 col-1" />
        <h3 class="row-2 col-2">${tempNight}°C</h3>
      </div>
    </div>
    `;

    dailyForecastCont.innerHTML += html;
  });

  // Set style if day mode
  if (currWeatherIcon.at(-1) === "d") {
    // container
    changeClassToClass(widgetCont, "font-color-night", "font-color-day");
    changeClassToClass(widgetCont, "text-shadow-night", "text-shadow-day");
    // img-container
    changeClassToClass(
      backgroundImgCont,
      "border-right-night",
      "border-right-day"
    );
    changeClassToClass(backgroundImgCont, "box-shadow-night", "box-shadow-day");
    // weather-icon
    changeClassToClass(weatherIcon, "filter-white", "filter-darkblue");
    // info-container
    changeClassToClass(
      infoCont,
      "background-color-night",
      "background-color-day"
    );
    changeClassToClass(infoCont, "box-shadow-night", "box-shadow-day");
    // details-container
    changeClassToClass(detailsCont, "box-shadow-night", "box-shadow-day");
    // tile-icon
    tileIcons.forEach((tileIcon) =>
      changeClassToClass(tileIcon, "filter-grey", "filter-yellow")
    );
    // weather-forecast
    changeClassToClass(forecastCont, "box-shadow-night", "box-shadow-day");
  }

  // Set style if night mode
  if (currWeatherIcon.at(-1) === "n") {
    // container
    changeClassToClass(widgetCont, "font-color-day", "font-color-night");
    changeClassToClass(widgetCont, "text-shadow-day", "text-shadow-night");
    // img-container
    changeClassToClass(
      backgroundImgCont,
      "border-right-day",
      "border-right-night"
    );
    changeClassToClass(backgroundImgCont, "box-shadow-day", "box-shadow-night");
    // weather-icon
    changeClassToClass(weatherIcon, "filter-darkblue", "filter-white");
    // info-container
    changeClassToClass(
      infoCont,
      "background-color-day",
      "background-color-night"
    );
    changeClassToClass(infoCont, "box-shadow-day", "box-shadow-night");
    // details-container
    changeClassToClass(detailsCont, "box-shadow-day", "box-shadow-night");
    // tile-icon
    tileIcons.forEach((tileIcon) =>
      changeClassToClass(tileIcon, "filter-yellow", "filter-grey")
    );
    // weather-forecast
    changeClassToClass(forecastCont, "box-shadow-day", "box-shadow-night");
  }
}

// Remove hidden class from weather container
widgetCont.classList.remove("hidden");

// Listeners
searchByCityButton.addEventListener("click", async function () {
  const cityName = searchTxtInput.value;
  const coords = await getCityNameCoords(cityName);
  widgetCont.style.opacity = "0";

  if (coords === "error") {
    errorMessage.classList.remove("hidden");
  } else {
    hourlyForecastCont.innerHTML = "";
    dailyForecastCont.innerHTML = "";
    await displayWeatherData(coords);
    searchTxtInput.value = "";
    widgetCont.style.opacity = "1";
    errorMessage.classList.add("hidden");
  }
});

searchByUserGeolocButton.addEventListener("click", function () {
  widgetCont.style.opacity = "0";
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async function (position) {
        const userCoords = [
          position.coords.latitude,
          position.coords.longitude,
        ];

        hourlyForecastCont.innerHTML = "";
        dailyForecastCont.innerHTML = "";
        await displayWeatherData(userCoords);
        searchTxtInput.value = "";
        widgetCont.style.opacity = "1";
        errorMessage.classList.add("hidden");
      },
      (err) =>
        alert(`The user have denied the request for Geolocation (${err})`)
    );
  } else {
    alert("Your browser does not support geolocation");
  }
});

displayDailyButton.addEventListener("click", () => {
  dailyHourlyForecastDisplay(
    dailyForecastCont,
    displayDailyButton,
    hourlyForecastCont,
    displayHourlyButton
  );
});

displayHourlyButton.addEventListener("click", () => {
  dailyHourlyForecastDisplay(
    hourlyForecastCont,
    displayHourlyButton,
    dailyForecastCont,
    displayDailyButton
  );
});
