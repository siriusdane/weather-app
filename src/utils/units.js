import { TEMP_KELVIN, TEMP_FAHRENHEIT, TEMP_CELCIUS } from '../constants/weather';

export function getUnitDisplay(temp, unit) {
    let temperature;
    switch(unit) {
        case TEMP_FAHRENHEIT:
            temperature = temp * (9/5) - 460.67;
            return `${temperature.toFixed(2)} °F`;
        case TEMP_CELCIUS:
            temperature = temp - 273.15;
            return `${temperature.toFixed(2)} °C`;
        case TEMP_KELVIN:
        default:
            return `${temp.toFixed(2)} °K`;
    }
}
