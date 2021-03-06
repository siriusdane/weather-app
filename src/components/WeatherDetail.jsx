import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Map from './Map.jsx';
import { weatherGetForecast } from '../actions/weather';
import { getUnitDisplay, isSameDate, displayDate } from '../utils/units';
import { GOOGLE_MAPS_URL, GOOGLE_MAPS_API_KEY } from '../constants/google';

class WeatherDetail extends React.Component {
    static propTypes = {
        city: PropTypes.object.isRequired,
        unit: PropTypes.string.isRequired,
        dispatch: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    componentDidMount() {
        this.getCityForecast();
    }

    render() {
        return (
            <div className='weather-detail-container'>
                { this.renderHeader() }
                { this.renderMap() }
                { !this.state.loading && this.renderForecast() }
            </div>
        );
    }

    renderHeader() {
        return (
            <div className='header'>
                <h1 className='name'>{ this.props.city.name }</h1>
                <h2 className='weather'>
                    <span>{ this.getTempCopy() }</span>
                    <span>{ this.getWeatherCopy(this.props.city) }</span>
                </h2>
            </div>
        );
    }

    renderMap() {
        const { lat, lon } = this.props.city.coord;

        return (
            <div className='city-map'>
                <Map
                    lat={ lat }
                    lon={ lon }
                    googleMapURL={ `${GOOGLE_MAPS_URL}&key=${GOOGLE_MAPS_API_KEY}` }
                    loadingElement={ <div style={{ height: '100%' }} /> }
                    containerElement={ <div style={{ height: '400px' }} /> }
                    mapElement={ <div style={{ height: '100%' }} /> }
                />
            </div>
        );
    }

    renderCurrentWeather() {
        return (
            <div className='weather-container'>
                <h2>Current Weather</h2>
                <div className='city-weather'>
                    <span className='temp'>{ this.getTempCopy() }</span>
                    <span className='weather'>{ this.getWeatherCopy(this.props.city) }</span>
                </div>
            </div>
        );
    }

    renderForecast() {
        const weathers = this.getProperWeathers(),
            unit = this.props.unit;

        return (
            <div className='forecast-container'>
                <h2>Forecast</h2>
                <div className='city-forecast'>
                    {
                        weathers.map(weather => (
                            <div className='forecast' key={ _.uniqueId('forecast-') }>
                                <div className='date'>{ this.getWeatherDate(weather) }</div>
                                <div className='info'>
                                    <span className='temp'>{ getUnitDisplay(weather.main.temp, unit) }</span>
                                    <span className='weather'>{ this.getWeatherCopy(weather) }</span>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    }

    // HANDLERS
    getCityForecast = () => {
        this.setState({ loading: true });
        this.props.dispatch(weatherGetForecast(this.props.city.id))
            .then(error => {
                this.setState({
                    loading: false,
                    error: error ? _.capitalize(error.message) : null
                });
            });
    }

    // SELECTORS
    getTempCopy() {
        return getUnitDisplay(this.props.city.main.temp, this.props.unit);
    }

    getWeatherCopy(city) {
        return city.weather.map(weather => weather.main).join(', ');
    }

    getWeatherDate(city) {
        const date = new Date(city.dt * 1000);
        return displayDate(date);
    }

    getProperWeathers() {
        const weathers = [];
        let selectedDate = new Date();
        selectedDate.setHours(0, 0, 0, 0);

        this.props.city.forecast.list.forEach(weather => {
            const date = new Date(weather.dt * 1000);
            date.setHours(0, 0, 0, 0);

            if (!isSameDate(date, selectedDate)) {
                selectedDate = date;
                weathers.push(weather);
            }
        });

        return weathers.slice(0, 5);
    }
}

export default WeatherDetail;
