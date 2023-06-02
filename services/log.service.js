import chalk from 'chalk';
import dedent from 'dedent-js';

const printError = (error) => {
	console.log(chalk.bgRed(' ERROR ') + '' + error);
};

const printSuccess = (message) => {
	console.log(chalk.bgGreen(' SUCCESS ') + '' + message);
};

const printHelp = () => {
	console.log(dedent(`
	${chalk.bgCyan(' HELP ')}
	Without parameters - print weather
	-s [CITY] for choosing city
	-h call for help
	-t [API_KEY] for saving api token
	`));
};

const printWeather = (res) => {
	const getDescription = res.weather[0].description;
	const formatDescription = getDescription.charAt(0).toUpperCase() + getDescription.slice(1);
	
	console.log(dedent(`
	${chalk.bgYellow(' WEATHER ')} in the ${res.name} city:
	${formatDescription}
	Temperature: ${res.main.temp}
	Humidity: ${res.main.humidity}
	Wind speed: ${res.wind.speed}
	`));
}


export {printError, printSuccess, printHelp, printWeather};