#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import {
	printError,
	printHelp,
	printSuccess,
	printWeather
} from "./services/log.service.js";
import {
	getKeyValue,
	saveKeyValue,
	TOKEN_DICTIONARY
} from "./services/storage.service.js";
import {getWeather} from "./services/api.service.js";

const saveToken = async (token) => {
	if (!token.length) {
		printError("Token not set");
		return;
	}
	try {
		await saveKeyValue(TOKEN_DICTIONARY.token, token);
		printSuccess("Token saved");
	} catch (e) {
		printError(e.message);
	}
};

const saveCity = async (city) => {
	if (!city.length) {
		printError("City not set");
		return;
	}
	try {
		if (typeof city === "string" && city !== await getKeyValue(TOKEN_DICTIONARY.city)) {
			await saveKeyValue(TOKEN_DICTIONARY.city, city);
			printSuccess("City saved");
		}
	} catch (e) {
		printError(e.message);
	}
};

const getForcast = async () => {
	const city = await getKeyValue(TOKEN_DICTIONARY.city);
	try {
			const weather = await getWeather(city);
			await saveCity(city);
			printWeather(weather);
	} catch (e) {
		if (e?.response?.status === 404) {
			printError('City error with command -s NAME');
		} else if (e?.response?.status === 401) {
			printError('Token error 1');
		} else if (city === undefined) {
			printError('Put the city');
		} else {
			printError(e.message + ' ' + 'error weather.js');
		}
	}
};

const initCLI = () =>{
	const args = getArgs(process.argv);
	if (args.h) {
		return printHelp();
	}
	if (args.s) {
		return saveCity(args.s);
	}
	if (args.t) {
		return saveToken(args.t);
	}
	return getForcast().then();
};

initCLI();