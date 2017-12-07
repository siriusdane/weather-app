import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import Navbar from '../components/Navbar.jsx';
import WeatherDetail from '../components/WeatherDetail.jsx';
import WeatherList from '../components/WeatherList.jsx';
import { weatherGetMultiple } from '../actions/weather';
import { CITIES } from '../constants/weather';

class AppHandler extends React.Component {
    static propTypes = {
        weathers: PropTypes.object.isRequired,
        unit: PropTypes.string.isRequired,
        custom: PropTypes.object,
        selectedCity: PropTypes.object,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            errors: false
        };
    }

    componentDidMount() {
        this.getDefaultWeathers();
    }

    render() {
        return this.state.loading ? 
            this.renderLoading() : 
            this.state.errors ? 
                this.renderErrors() :
                this.renderElement();
    }

    renderElement() {
        return (
            <div className='weather-app'>
                <Navbar { ...this.props } />
                {
                    this.props.selectedCity ?
                        <WeatherDetail { ...this.props } /> :
                        <WeatherList { ...this.props } />
                }
            </div>
        );
    }

    renderLoading() {
        return (
            <div className='loading-main-page'>
                <i className='fa fa-spinner fa-spin fa-3x fa-fw' />
                <span>Loading Weather Information</span>
            </div>
        );
    }

    renderErrors() {
        return (
            <div className='loading-main-error'>
                <i className='fa fa-exclamation-circle' />
                <span>There was an error loading the weather information</span>
                <Button bsStyle='link' onClick={ this.getDefaultWeathers }>
                    Try Again
                </Button>
            </div>
        );
    }

    loadingDone = () => {
        this.setState({ loading: false, errors: false });
    }

    loadingFailed = () => {
        this.setState({ loading: false, errors: true });
    }

    getDefaultWeathers = () => {
        this.props.dispatch(weatherGetMultiple(CITIES))
            .then(this.loadingDone)
            .catch(this.loadingFailed);
    }
}

function mapStateToProps(state) {
    return {
        weathers: state.weather.weathers,
        custom: state.weather.custom,
        unit: state.weather.unit,
        selectedCity: state.weather.selectedCity
    };
}

export default connect(mapStateToProps)(AppHandler);
