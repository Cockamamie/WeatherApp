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
    const current = response['current']
    const location = response['location'];
    return {
        code: current['condition']['code'],
        local: {
            location: location['name'],
            localTime: location['localtime'],
            isDay: current['is_day'] === 1,
        },
        temperature: {
            tempC: current['temp_c'],
            tempF: current['temp_f'],
            likeC: current['feelslike_c'],
            likeF: current['feelslike_f']
        },
        wind: {
            speedMph: current['wind_mph'],
            speedKph: current['wind_kph'],
            direction: current['wind_dir']
        },
        humidity: current['humidity'],
        pressure: current['pressure_mb'],
    };
}