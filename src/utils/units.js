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

export function isSameDate(date1, date2) {
    return date1 && date2 &&
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate();
}

export function displayDate(date) {
    return `${getWeekDay(date)}, ${getMonth(date)} ${getDay(date)}`;
}

function getMonth(date) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return months[date.getMonth()];
}

function getDay(date) {
    return date.getDate();
}

function getWeekDay(date) {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    return days[date.getDay()];
}
