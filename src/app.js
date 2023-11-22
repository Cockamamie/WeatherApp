import requestWeather from "./scripts/weather-client";
import './styles/main.scss';

async function handleSubmit() {
    const queryParameters = new URLSearchParams();
    queryParameters.append('lat', '56.85');
    queryParameters.append('lon', '60.6');
    const request = {
        method: 'GET'
    }
    const res = await requestWeather(56.85, 60.6);
    alert(res);
}

const form = document.querySelector(".input__form");
form.addEventListener("submit", handleSubmit);