import _ from 'lodash';
import {
    ADD_WEATHER,
    REMOVE_WEATHER,
    CHANGE_UNIT,
    SELECT_CITY,
    CLEAR_CITY,
    ADD_FORECAST,
    ADD_SEARCH,
    CLEAR_SEARCH
} from '../actions/weather';
import { TEMP_CELCIUS } from '../constants/weather';

const initialState = {
    weathers: {},
    unit: TEMP_CELCIUS,
    city: null,
    queryId: null
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
        case CHANGE_UNIT:
            return {
                ...state,
                unit: action.unit
            };
        case SELECT_CITY:
            return {
                ...state,
                city: action.city
            };
        case CLEAR_CITY:
            return {
                ...state,
                city: null
            };
        case ADD_FORECAST:
            return {
                ...state,
                city: {
                    ...state.city,
                    forecast: action.forecast
                }
            };
        case ADD_SEARCH:
            return {
                ...state,
                queryId: action.id
            };
        case CLEAR_SEARCH:
            return {
                ...state,
                queryId: null,
                weathers: _.omit(state.weathers, state.queryId)
            };
        default:
            return { ...state };
    }
}

export default storeHandler;
