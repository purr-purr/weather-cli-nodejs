import https from "https";
import {getKeyValue, TOKEN_DICTIONARY} from "./storage.service.js";
import axios from "axios";

const getWeather = async (city) => {
	const token = await getKeyValue(TOKEN_DICTIONARY.token);
	if (!token) {
		throw new Error('API KEY not set, you can put your API KEY with command' +
			' -t [API_KEY]')
	}
	
	const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
			params: {
				q: city,
				appid: token,
				land: 'en',
				units: 'metric',
			}
		})
	console.log(data);
	return data;
}

export {getWeather};