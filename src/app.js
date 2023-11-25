import requestWeather from "./scripts/weather-client";
import './styles/main.scss';

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
    applyWeather(result);
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

function applyWeather(weatherInfo) {
    setTemperature(weatherInfo.temperature);
    setHumidity(weatherInfo.humidity);
    setPressure(weatherInfo.pressure);
    setWindSpeed(weatherInfo.wind);
}

function setTemperature(temperatureInfo) {
    const temperatureElement = getMeasurmentsTextElement("temperature");
    const degrees = new Intl.NumberFormat('en-US', {
        style: 'unit',
        unit: 'celsius',
    });
    temperatureElement.innerText = `${degrees.format(temperatureInfo.tempC)}`;
}

function setHumidity(humidity) {
    const humidityElement = getMeasurmentsTextElement("humidity");
    humidityElement.innerText = `${humidity}%`;
}

function setPressure(pressure) {
    const pressureElement = getMeasurmentsTextElement("atmospheric-pressure");
    pressureElement.innerText = `${pressure} mb`;
}

function setWindSpeed(windInfo) {
    const windElement = getMeasurmentsTextElement("wind-speed");
    windElement.innerText = `${windInfo.speedKph} k/h ${windInfo.direction}`;
}

function getMeasurmentsTextElement(modificator) {
    return document.querySelector(`.weather__measurments-item_${modificator} .weather__measurment-info`);
}
