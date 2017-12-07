import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { getUnitDisplay } from '../utils/units';
import { WEATHER_BASE_ICON } from '../constants/weather';

class WeatherMin extends React.Component {
    static propTypes = {
        weather: PropTypes.object.isRequired,
        unit: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired
    }

    render() {
        return (
            <div className='weather-min-container' onClick={ this.onClick }>
                { this.renderInfo() }
                { this.renderName() }
            </div>
        );
    }

    renderInfo() {
        const temp = this.props.weather.main.temp,
            unit = this.props.unit;

        return (
            <div className='weather-info'>
                <div className='icons'>
                    { 
                        this.props.weather.weather.slice(0,2).map(weather =>
                            this.renderWeatherIcon(weather, _.uniqueId('icon-'))
                        ) 
                    }
                </div>
                <span className='temp'>{ getUnitDisplay(temp, unit) }</span>
            </div>
        );
    }

    renderName() {
        const name = this.props.weather.name,
            country = this.props.weather.sys.country;

        return (
            <div className='weather-name'>
                <span>{ `${name}, ${country}` }</span>
            </div>
        );
    }

    renderWeatherIcon(weather, key) {
        return (
            <img
                key={ key }
                className='weather-icon'
                src={ `${WEATHER_BASE_ICON}/${weather.icon}.png` }
                alt={ `${weather.main}` }
            />
        );
    }

    onClick = () => {
        this.props.onClick(this.props.weather);
    }
}

export default WeatherMin;
