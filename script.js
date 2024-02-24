const APIKEY = "50be7a8e02507dee33193513846fca37";

let searchInput = document.querySelector(".search input");
let searchBtn = document.querySelector(".search button");
let weatherIcon = document.querySelector(".weather-icon");
let cityName = document.querySelector(".city");
let temperature = document.querySelector(".temp");
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".wind");

async function getApiData(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric`
    );
    const data = await response.json();
    if (data.cod == 404) {
      alert("City not found");
    }
    return data;
  } catch (error) {
    console.log("Error in fetching data from API: ", error);
  }
}

function displayWeatherImage(apiData) {
  if (apiData.weather[0].main == "Clouds") {
    weatherIcon.src = "images/clouds.png";
  } else if (apiData.weather[0].main == "Clear") {
    weatherIcon.src = "images/clear.png";
  } else if (apiData.weather[0].main == "Rain") {
    weatherIcon.src = "images/rain.png";
  } else if (apiData.weather[0].main == "Drizzle") {
    weatherIcon.src = "images/drizzle.png";
  } else if (apiData.weather[0].main == "Mist") {
    weatherIcon.src = "images/mist.png";
  }
}

(() => {
  searchBtn.addEventListener("click", async () => {
    const data = await getApiData(searchInput.value);
    console.log(data);
    displayWeatherImage(data);
    cityName.innerHTML = data.name;
    temperature.innerHTML = Math.round(data.main.temp) + "°c";
    humidity.innerHTML = data.main.humidity + "%";
    wind.innerHTML = data.wind.speed + "km/h";
  });
})();
