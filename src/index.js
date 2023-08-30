let city = "istanbul";
let unit = "metric";
let currentData = {};

async function getData(city) {
  try {
    let url = `https://api.weatherapi.com/v1/current.json?key=79a7ec2447774fcca6a184148232508&q=${city}`;
    const response = await fetch(url, { mode: "cors" });
    if (!response.ok) {
      throw new Error(`City ${city} not found`);
    }
    const data = await response.json();
    currentData = data;
    return data;
  } catch (error) {
    alert(error);
    return;
  }
}

function displayData(data, unit) {
  const country = document.querySelector(".country-name");
  const date = document.querySelector(".local-date");
  const weather_img = document.querySelector(".weather-img");
  const temp = document.querySelector(".temp");
  const weather_desc = document.querySelector(".weather-desc");
  const feels_like = document.querySelector(".feels-like");
  const wind = document.querySelector(".wind");
  const humidity = document.querySelector(".humidity");
  const visibility = document.querySelector(".visibility");

  country.textContent = `${data.location.name}, ${data.location.country}`;
  date.textContent = `${data.location.localtime}`;
  weather_img.src = data.current.condition.icon;
  weather_desc.textContent = `${data.current.condition.text}`;
  humidity.textContent = `${data.current.humidity}%`;

  if (unit == "metric") {
    temp.textContent = `${data.current.temp_c}°C`;
    feels_like.textContent = `Feels like ${data.current.feelslike_c}°C`;
    wind.textContent = `${data.current.wind_kph}km/h`;
    visibility.textContent = `${data.current.vis_km}km`;
  } else if (unit == "imperial") {
    temp.textContent = `${data.current.temp_f}°F`;
    feels_like.textContent = `Feels like ${data.current.feelslike_f}°F`;
    wind.textContent = `${data.current.wind_mph}mph`;
    visibility.textContent = `${data.current.vis_miles}miles`;
  } else {
    return;
  }
}

const search_button = document.querySelector(".search-button");

search_button.addEventListener("click", async () => {
  const search_input = document.querySelector(".search-input");
  if (search_input.value === "") {
    return;
  }
  const weatherData = await getData(search_input.value);
  displayData(weatherData, unit);
});

const c_button = document.querySelector(".c-button");
const f_button = document.querySelector(".f-button");

f_button.addEventListener("click", () => {
  c_button.classList.remove("active");
  f_button.classList.add("active");
  unit = "imperial";
  displayData(currentData, unit);
});

c_button.addEventListener("click", () => {
  f_button.classList.remove("active");
  c_button.classList.add("active");
  unit = "metric";
  displayData(currentData, unit);
});

async function callWeather(city, unit) {
  const weatherData = await getData(city);
  displayData(weatherData, unit);
}

callWeather(city, unit);
