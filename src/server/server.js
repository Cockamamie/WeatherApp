import * as http from 'http';
import {requestWeather} from './weather-client.js';

const server = http.createServer((req, res) => {
    switch (req.method) {
        case 'GET':
            if (req.url.startsWith('/api/weather')) {
                processGetWeather(req, res);
            }
            break;
        default:
            res.writeHead(405).end();
    }
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

async function processGetWeather(req, res) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const searchParams = url.searchParams;
    const result = await requestWeather(searchParams.get('lat'), searchParams.get('lon'));
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(result));
}