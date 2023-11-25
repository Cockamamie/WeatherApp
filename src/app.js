import requestWeather from "./scripts/weather-client";
import './styles/main.scss';
import weatherTypes from './client-configs/weather-types.json';

const form = document.querySelector(".input__form");

form.addEventListener("submit", async event => {
    event.preventDefault();
    await handleSubmit();
});

async function handleSubmit() {
    const lat = document.getElementById("latitude").value;
    const lon = document.getElementById("longitude").value;
    const isCorrect = validateInput(lat, lon);
    if (!isCorrect)
        return;

    const result = await requestWeather(lat, lon);
    console.log(result);
    showWeather(result);
}

function validateInput(lat, lon) {
    if (lat === '' || lat === 0) {
        alert('Широта не указана');
        return false;
    }
    if (lon === '' || lon === 0) {
        alert('Долгота не указана');
        return false;
    }
    return true;
}

function showWeather(weatherInfo) {
    setWeatherImage(weatherInfo)
    setTemperature(weatherInfo.temperature);
    setHumidity(weatherInfo.humidity);
    setPressure(weatherInfo.pressure);
    setWindSpeed(weatherInfo.wind);
}

function setWeatherImage(weatherInfo) {
    const weatherImgElement = document.querySelector('.weather__condition-img');
    const info = weatherTypes.find(x => x.code === weatherInfo.code);
    const weatherImageToSet = weatherInfo.local.isDay ? info['images']['day'] : info['images']['night'];
    weatherImgElement.src = `./images/weather-types/animated/${weatherImageToSet}`;
}

function setTemperature(temperatureInfo) {
    const [imgElement, textElement] = getMeasurmentElementChildren("temperature");
    const degrees = new Intl.NumberFormat('en-US', {
        style: 'unit',
        unit: 'celsius',
    });
    imgElement.src = temperatureInfo.tempC > 0
        ? './images/measurments/thermometer-warm.png'
        : './images/measurments/thermometer-cold.png';
    textElement.innerText = `${degrees.format(temperatureInfo.tempC)}`;
}

function setHumidity(humidity) {
    const [_, textElement] = getMeasurmentElementChildren("humidity");
    textElement.innerText = `${humidity}%`;
}

function setPressure(pressure) {
    const [_, textElement] = getMeasurmentElementChildren("atmospheric-pressure");
    textElement.innerText = `${pressure} mb`;
}

function setWindSpeed(windInfo) {
    const [_, textElement] = getMeasurmentElementChildren("wind-speed");
    textElement.innerText = `${windInfo.speedKph} k/h ${windInfo.direction}`;
}

function getMeasurmentElementChildren(parentModificator) {
    const measurmentElement = document.querySelector(`.weather__measurments-item_${parentModificator}`);
    const imgElement = measurmentElement.querySelector('.weather__measurment-img');
    const textElement = measurmentElement.querySelector('.weather__measurment-info');
    return [imgElement, textElement]
}
