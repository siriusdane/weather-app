import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Button, FormGroup, FormControl, HelpBlock, InputGroup } from 'react-bootstrap';
import WeatherMin from './WeatherMin.jsx';
import { weatherSelectCity, weatherGetCity, weatherClearCustom } from '../actions/weather';
import FieldValidator from '../utils/validation';

class WeatherList extends React.Component {
    static propTypes = {
        weathers: PropTypes.object,
        custom: PropTypes.object,
        unit: PropTypes.string,
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
                    this.props.custom ?
                        this.renderCustomCity() :
                        this.renderCustomSelector()
                }
            </div>
        );
    }

    renderDefaultCities() {
        const weathers = _.sortBy(_.values(this.props.weathers), weather => weather.main.temp);

        return (
            <div className='default-cities'>
                {
                    weathers.map(weather => (
                        <WeatherMin
                            key={ _.uniqueId('weather-min-') }
                            weather={ weather }
                            unit={ this.props.unit }
                            route={ this.getRoute(weather.id) }
                        />
                    ))
                }
            </div>
        );
    }

    renderCustomCity() {
        return (
            <div className='weather-custom-container'>
                <WeatherMin
                    weather={ this.props.custom }
                    unit={ this.props.unit }
                    route={ this.getRoute(this.props.custom.id) }
                />
                <Button bsStyle='link' onClick={ this.onNewSearch }>
                    Perform another search
                </Button>
            </div>
        );
    }

    renderCustomSelector() {
        return (
            <div className='weather-custom-container'>
                <FormGroup controlId='1' validationState={ this.getCustomValidationState() }>
                    <InputGroup>
                        <FormControl
                            type='text'
                            onChange={ this.onChangeCustom }
                            value={ this.state.query }
                            placeholder='Input a city name'
                        />
                        <InputGroup.Button>
                            <Button
                                bsStyle='primary'
                                onClick={ this.onClickSearch }
                                disabled={ Boolean(this.state.queryError) }
                            >
                                Search
                            </Button>
                        </InputGroup.Button>
                    </InputGroup>
                    <HelpBlock>{ this.state.queryError }</HelpBlock>
                </FormGroup>
            </div>
        );
    }

    // SELECTORS
    getCustomValidationState() {
        return this.state.queryError ? 'error' : null;
    }

    getRoute(cityId) {
        return `/details/${cityId}`;
    }

    // HANDLERS
    onChangeCustom = (e) => {
        this.setState({ query: e.target.value }, this.validateCustomField);
    }

    onClickSearch = () => {
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
        this.props.dispatch(weatherClearCustom());
    }

    validateCustomField = () => {
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
