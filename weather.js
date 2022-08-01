#!/usr/bin/env node
import { printError, printSuccess, printHelp,printWeather } from './services/log_service.js'; 
import { getWeather,getIcon } from './services/api_service.js'; 
import { getArgs } from './helpers/args.js';
import { getKeyValue, saveKeyValue, TOKENS } from './services/storage_service.js'; 

const saveToken = async (token) => {
    if(!token.length){
        printError('Sorry! We havent token :(');
        return;
    }
    try {
        await saveKeyValue(TOKENS.token, token);
        printSuccess('token saved');
    } catch (error) {
        printError(error.message);
    }    
};
const getForcast = async () =>{
    try {
        const city =process.env.CITY ?? await getKeyValue(TOKENS.city);
        const weather = await getWeather(city);
        // console.log(weather);
        printWeather(weather,getIcon(weather.weather[0].icon));
    } catch (error) {
        if(error?.response?.status == 404){
            printError('Неверно указан город !!!');
        } else if(error?.response?.status == 401) {
            printError('Неверно указан токен !!!');
        } else {
            printError(error.message);
        }
    }
};
const saveCityName = async (city) => {
    if(!city.length) {
        printError('Sorry! We havent city :(');
        return ;
    }
    try {
        await saveKeyValue(TOKENS.city, city);
        saveStart();
        printSuccess('city saved');
        // letsStart([1,2,'start']);
    } catch (error) {
        printError(error.message);
    }
};
const saveStart = ()=>{
    getForcast();
}






const initCLI = ()=> {
    const args = getArgs(process.argv)
    
    if(args.h) {
        return printHelp();
    }
    if(args.s) {
        return saveCityName(args.s);
    }
    if (args.t) {
       return saveToken(args.t)
        // getKeyValue(args.t);
    }// getForcast();
    letsStart(process.argv);
    //show weather
};

const letsStart = async (dd)=> {
    const res = {};
    const [executer, file, ...rest] = dd;
    
    if(rest == 'start') {
        await getForcast();
        console.log(`
    теперь вводи: "-s" и название города и жми энтер!!!
        `);
    } else if( rest == '' || ' ') {
        console.log(`-s - указать город
-h - помощь

                Вперед, бро!
                напиши "node weather" и выбирай команду`);
    }
};


// const showCity = async() => {
//     const show  = await getKeyValue(TOKENS.city);
//     console.log(show);
// }
// showCity();
initCLI();
