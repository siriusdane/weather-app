import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Button, FormGroup, FormControl, HelpBlock, InputGroup } from 'react-bootstrap';
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
                <Button bsStyle='link' onClick={ this.onNewSearch }>
                    Perform another search
                </Button>
            </div>
        );
    }

    renderSearchSelector() {
        return (
            <div className='weather-search-container'>
                <FormGroup controlId='1' validationState={ this.getSearchValidationState() }>
                    <InputGroup>
                        <FormControl
                            type='text'
                            onChange={ this.onChangeSearch }
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
    getSearchValidationState() {
        return this.state.queryError ? 'error' : null;
    }

    getRoute(cityId) {
        return `/details/${cityId}`;
    }

    // HANDLERS
    onChangeSearch = (e) => {
        this.setState({ query: e.target.value }, this.validateSearchField);
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
