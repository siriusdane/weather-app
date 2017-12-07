import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Map from './Map.jsx';
import { weatherGetForecast } from '../actions/weather';
import { getUnitDisplay } from '../utils/units';
import { GOOGLE_MAPS_URL, GOOGLE_MAPS_API_KEY } from '../constants/google';

class WeatherDetail extends React.Component {
    static propTypes = {
        selectedCity: PropTypes.object.isRequired,
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
                <div className='weather-detail-map'>
                    { this.renderName() }
                    { this.renderMap() }
                </div>
                <div className='weather-detail-info'>
                    { this.renderCurrentWeather() }
                    { !this.state.loading && this.renderForecast() }
                </div>
            </div>
        );
    }

    renderName() {
        return (
            <div className='city-name'>
                <h1>{ this.props.selectedCity.name }</h1>
            </div>
        );
    }

    renderMap() {
        const { lat, lon } = this.props.selectedCity.coord;

        return (
            <div className='city-map'>
                <Map
                    lat={ lat }
                    lon={ lon }
                    googleMapURL={ `${GOOGLE_MAPS_URL}&key=${GOOGLE_MAPS_API_KEY}` }
                    loadingElement={ <div style={{ height: '100%' }} /> }
                    containerElement={ <div style={{ height: '300px' }} /> }
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
                    <span className='weather'>{ this.getWeatherCopy(this.props.selectedCity) }</span>
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
        this.props.dispatch(weatherGetForecast(this.props.selectedCity.id))
            .then(error => {
                this.setState({
                    loading: false,
                    error: error ? _.capitalize(error.message) : null
                });
            });
    }

    // SELECTORS
    getTempCopy() {
        console.log(this.props.selectedCity.main.temp, this.props.unit);
        return getUnitDisplay(this.props.selectedCity.main.temp, this.props.unit);
    }

    getWeatherCopy(city) {
        return city.weather.map(weather => weather.main).join(', ');
    }

    getWeatherDate(city) {
        const date = new Date(city.dt * 1000);
        return date.toDateString();
    }

    getProperWeathers() {
        const weathers = [];
        let selectedDate = null;

        this.props.selectedCity.forecast.list.forEach(weather => {
            const date = new Date(weather.dt * 1000);
            date.setHours(0, 0, 0, 0);

            if (date !== selectedDate) {
                selectedDate = date;
                weathers.push(weather);
            }
        });

        return weathers.slice(0, 5);
    }
}

export default WeatherDetail;
