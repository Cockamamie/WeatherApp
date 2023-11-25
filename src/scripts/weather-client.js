const url = "http://api.weatherapi.com/v1/current.json";
const apikey = "6bcea4ce48dc43d1b91195832231811";

export default async function requestWeather(latitude, longitude) {
    const queryParameters = new URLSearchParams();
    queryParameters.append('q', `${latitude},${longitude}`);
    queryParameters.append('key', apikey)
    const request = {
        method: 'GET',
    };
    const response = await fetch(url + `?${queryParameters}`, request);
    const body = await response.json();

    return convertWeatherResponseToModel(body);
}

function convertWeatherResponseToModel(response) {
    const measurments = response.current
    return {
        location: response.location.name,
        localTime: response.localTime,
        temperature: {
            tempC: measurments.temp_c,
            tempF: measurments.temp_f,
            likeC: measurments.feelslike_c,
            likeF: measurments.feelslike_f
        },
        wind: {
            speedMph: measurments.wind_mph,
            speedKph: measurments.wind_kph,
            direction: measurments.wind_dir
        },
        humidity: measurments.humidity,
        pressure: measurments.pressure_mb,
    };
}