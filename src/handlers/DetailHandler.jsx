import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import Navbar from '../components/Navbar.jsx';
import WeatherDetail from '../components/WeatherDetail.jsx';
import { weatherGetCityInfo } from '../actions/weather';

class DetailHandler extends React.Component {
    static propTypes = {
        city: PropTypes.object,
        unit: PropTypes.string.isRequired,
        dispatch: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            errors: false
        };
    }

    componentDidMount() {
        this.getCityInformation();
    }

    render() {
        return (
            <div className='app-container'>
                <Navbar { ...this.props } />
                { this.renderBody() }
            </div>
        );
    }

    renderBody() {
        if (this.state.loading) {
            return this.renderLoading();
        } else if (this.state.errors) {
            return this.renderErrors();
        } else {
            return this.renderElement();
        }
    }

    renderElement() {
        return (
            <WeatherDetail { ...this.props } />
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
                <Button bsStyle='link' onClick={ this.getCityInformation }>
                    Try Again
                </Button>
            </div>
        );
    }

    // HANDLERS
    getCityInformation = () => {
        const { match } = this.props,
            { params } = match;

        this.props.dispatch(weatherGetCityInfo(params.id))
            .then(error => {
                this.setState({ loading: false, errors: Boolean(error) });
            });
    }
}

function mapStateToProps(state) {
    return {
        city: state.weather.selectedCity,
        unit: state.weather.unit
    };
}

export default connect(mapStateToProps)(DetailHandler);
