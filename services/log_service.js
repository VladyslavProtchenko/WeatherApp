import chalk from 'chalk';
import dedent from 'dedent-js';


const printError = (error) =>{
    console.log(chalk.bgRed(' ERROR: ')+' '+error);
};

const printSuccess = (message) =>{
    console.log(chalk.bgGreen(' SUCCESS: ')+' '+ message);
};

const printHelp = ()=>{
    console.log(
        dedent`${chalk.bgBlue(' ! HELP: ')}
        Нет параметров - Информация о погоде
        -s - [city] сохранить город
        -h - Помощь
        -t - [API_KEY] для сохранения токена 
        `
    );
};

const printWeather = (res, icon)=> {
    console.log(
        dedent`${chalk.bgYellow(' ! WEATHER TODAY:  ')}
        ${chalk.bgBlue(`
        Погода ${res.name}:                              ⛧ 
        ${icon}  ${res.weather[0].description},                            ⛧ 
        Температура: ${res.main.temp} (ощущается как ${res.main.feels_like}), ⛧ `)}
        ${chalk.bgYellow(`        Влажность: ${res.main.humidity}%,                            ⛧ 
        Скорость ветра: ${res.wind.speed}.                      ⛧ 
              Слава Україні!!!                    ⛧ `)}
        
        `
    );
};

export { printError, printSuccess,printHelp, printWeather }
