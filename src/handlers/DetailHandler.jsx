import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
                <div className='error-container'>
                    <i className='fa fa-exclamation-circle' />
                    <span>There was an error loading the weather information</span>
                    <button className='btn btn-big' onClick={ this.getCityInformation }>
                        Try Again
                    </button>
                </div>
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
            })
            .catch(error => {
                this.setState({ loading: false, errors: true });
            })
    }
}

function mapStateToProps(state) {
    return {
        city: state.weather.city,
        unit: state.weather.unit
    };
}

export default connect(mapStateToProps)(DetailHandler);
