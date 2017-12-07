import { WEATHER_BASE_API, WEATHER_API_KEY } from '../constants/weather';
import _ from 'lodash';

export const ADD_WEATHER = 'WTR_ADD_WEATHER';
export const REMOVE_WEATHER = 'WTR_REMOVE_WEATHER';
export const ADD_CUSTOM = 'WTR_ADD_CUSTOM';
export const CLEAR_CUSTOM = 'WTR_CLEAR_CUSTOM';
export const SELECT_CITY = 'WTR_SELECT_CITY';
export const CLEAR_CITY = 'WTR_CLEAR_CITY';
export const CHANGE_UNIT = 'WTR_CHANGE_UNIT';
export const ADD_FORECAST = 'WTR_ADD_FORECAST';

export function weatherGetCity(name, custom = true) {
    return dispatch => {
        const params = {
            q: name,
            APPID: WEATHER_API_KEY
        };

        return fetch(`${WEATHER_BASE_API}/weather?${getQueryParams(params)}`)
            .then(response => response.json())
            .then(json => {
                if (json.cod && json.message) {
                    return json;
                }

                if (custom) {
                    dispatch(addCustomWeather(json));
                } else {
                    dispatch(addWeather(json));
                }

                return null;
            })
            .catch(error => { return error; });
    };
}

export function weatherGetCityInfo(id) {
    return dispatch => {
        const params = {
            id,
            APPID: WEATHER_API_KEY
        };

        return fetch(`${WEATHER_BASE_API}/weather?${getQueryParams(params)}`)
            .then(response => response.json())
            .then(json => {
                if (json.cod && json.message) {
                    return json;
                }

                dispatch(selectCity(json));
                return null;
            })
            .catch(error => { return error; });
    };
}

export function weatherGetForecast(id) {
    return dispatch => {
        const params = {
            id,
            APPID: WEATHER_API_KEY
        };

        return fetch(`${WEATHER_BASE_API}/forecast?${getQueryParams(params)}`)
            .then(response => response.json())
            .then(json => {
                if (json.cod !== '200' && json.message) {
                    return json;
                }

                dispatch(addWeatherForecast(json));
                return null;
            })
            .catch(error => { return error; });
    };
}

export function weatherGetMultiple(cities) {
    return dispatch => {
        const promises = cities.map(city => {
            return dispatch(weatherGetCity(city, false));
        });

        return Promise.all(promises)
            .then((errors) => _.some(errors));
    }
}

export function weatherRemoveCity(city) {
    return dispatch => {
        return dispatch(removeWeather(city));
    };
}

export function weatherClearCustom() {
    return dispatch => {
        return dispatch(clearCustomWeather());
    };
}

export function weatherSelectCity(cityId) {
    return dispatch => {
        return dispatch(selectCity(cityId));
    };
}

export function weatherClearCity() {
    return dispatch => {
        return dispatch(clearCity());
    }
}

export function weatherChangeUnit(unit) {
    return dispatch => {
        return dispatch(changeUnit(unit));
    }
}

function addWeather(city) {
    return { type: ADD_WEATHER, city };
}

function removeWeather(city) {
    return { type: REMOVE_WEATHER, cityId: city.id };
}

function addCustomWeather(city) {
    return { type: ADD_CUSTOM, city };
}

function clearCustomWeather() {
    return { type: CLEAR_CUSTOM };
}

function selectCity(city) {
    return { type: SELECT_CITY, city };
}

function clearCity() {
    return { type: CLEAR_CITY };
}

function changeUnit(unit) {
    return { type: CHANGE_UNIT, unit };
}

function addWeatherForecast(forecast) {
    return { type: ADD_FORECAST, forecast };
}

function getQueryParams(params) {
    return _.keys(params).map(k => `${k}=${params[k]}`).join('&');
}
