import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Button from './utilities/Button.jsx';
import InputGroup from './utilities/InputGroup.jsx';
import WeatherMin from './WeatherMin.jsx';
import { weatherSelectCity, weatherGetCity, weatherClearSearch } from '../actions/weather';
import { CITIES } from '../constants/weather';
import FieldValidator from '../utils/validation';

class WeatherList extends React.Component {
    static propTypes = {
        weathers: PropTypes.object,
        unit: PropTypes.string,
        queryId: PropTypes.number,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            query: '',
            queryError: null,
            loading: false
        };
    }

    render() {
        return (
            <div className='weather-list-container'>
                { this.renderDefaultCities() }
                { 
                    this.props.queryId ?
                        this.renderSearchedCity() :
                        this.renderSearchSelector()
                }
            </div>
        );
    }

    renderDefaultCities() {
        const weathers = _.filter(_.values(this.props.weathers), weather => _.includes(CITIES, weather.name)),
            ordered = _.sortBy(_.values(weathers), weather => weather.main.temp);

        return (
            <div className='default-cities'>
                {
                    ordered.map((weather, idx) => (
                        <WeatherMin
                            key={ idx }
                            weather={ weather }
                            unit={ this.props.unit }
                            route={ this.getRoute(weather.id) }
                        />
                    ))
                }
            </div>
        );
    }

    renderSearchedCity() {
        const weather = this.props.weathers[this.props.queryId];

        return (
            <div className='weather-search-container'>
                <WeatherMin
                    weather={ weather }
                    unit={ this.props.unit }
                    route={ this.getRoute(weather.id) }
                />
                <p className='link' onClick={ this.onNewSearch }>
                    Perform another search
                </p>
            </div>
        );
    }

    renderSearchSelector() {
        return (
            <div className='weather-search-container'>
                <div>
                    <InputGroup
                        help={ this.state.queryError }
                        validationState={ this.getSearchValidationState() }
                        inputProps={{
                            value: this.state.query,
                            onChange: this.onSearchChange,
                            placeholder: 'Input a city name',
                            onKeyPress: this.onSearchKeyPress
                        }}
                    />
                </div>
            </div>
        );
    }

    // SELECTORS
    getSearchValidationState() {
        return this.state.queryError ? InputGroup.VALIDATION_ERROR : null;
    }

    getRoute(cityId) {
        return `/details/${cityId}`;
    }

    // HANDLERS
    onSearchChange = (e) => {
        this.setState({ query: e.target.value }, this.validateSearchField);
    }

    onSearchKeyPress = (e) => {
        if (!e) e = window.event;
        const keyCode = e.keyCode || e.which;
        if (keyCode == '13') {
            this.submitQuery();
        }
    }

    submitQuery() {
        this.setState({ loading: true });
        this.props.dispatch(weatherGetCity(this.state.query))
            .then(error => { 
                this.setState({
                    loading: false,
                    queryError: error ? _.capitalize(error.message) : null
                });
            });
    }

    onSelectCity = (city) => {
        this.props.dispatch(weatherSelectCity(city.id))
    }

    onNewSearch = () => {
        this.setState({ query: '' });
        this.props.dispatch(weatherClearSearch());
    }

    validateSearchField = () => {
        const error = new FieldValidator(this.state.query)
            .notEmpty()
            .notNumeric()
            .min(2)
            .max(50)
            .result();

        this.setState({ queryError: error });
        return !Boolean(error);
    }
}

export default WeatherList;
