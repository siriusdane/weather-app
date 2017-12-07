import _ from 'lodash';
import {
    ADD_WEATHER,
    REMOVE_WEATHER,
    ADD_CUSTOM,
    CLEAR_CUSTOM,
    CHANGE_UNIT,
    SELECT_CITY,
    CLEAR_CITY,
    ADD_FORECAST
} from '../actions/weather';
import { TEMP_CELCIUS } from '../constants/weather';

const initialState = {
    weathers: {},
    custom: null,
    unit: TEMP_CELCIUS,
    selectedCity: null
};

function storeHandler(state = initialState, action) {
    switch(action.type) {
        case ADD_WEATHER:
            return {
                ...state,
                weathers: {
                    ...state.weathers,
                    [action.city.id]: action.city
                }
            };
        case REMOVE_WEATHER:
            return {
                ...state,
                weathers: _.pluck(state.weathers, action.cityId)
            };
        case ADD_CUSTOM:
            return {
                ...state,
                custom: action.city
            };
        case CLEAR_CUSTOM:
            return {
                ...state,
                custom: null
            };
        case CHANGE_UNIT:
            return {
                ...state,
                unit: action.unit
            };
        case SELECT_CITY:
            let selectedCity = _.get(state.weathers, action.cityId);

            if (!selectedCity && state.custom.id === action.cityId) {
                selectedCity = state.custom;
            }

            return {
                ...state,
                selectedCity
            };
        case CLEAR_CITY:
            return {
                ...state,
                selectedCity: null
            };
        case ADD_FORECAST:
            return {
                ...state,
                selectedCity: {
                    ...state.selectedCity,
                    forecast: action.forecast
                }
            };
        default:
            return { ...state };
    }
}

export default storeHandler;
