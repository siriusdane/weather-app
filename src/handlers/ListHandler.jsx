import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from '../components/Navbar.jsx';
import WeatherList from '../components/WeatherList.jsx';
import { weatherGetMultiple } from '../actions/weather';
import { CITIES } from '../constants/weather';

class ListHandler extends React.Component {
    static propTypes = {
        weathers: PropTypes.object.isRequired,
        unit: PropTypes.string.isRequired,
        queryId: PropTypes.number,
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
        return (
            <div className='weather-app'>
                <Navbar { ...this.props } blockRedirect={ true } />
                { this.renderBody() }
            </div>
        );
    }

    renderBody() {
        if (this.state.loading) { return this.renderLoading(); }
        else if (this.state.errors) { return this.renderErrors(); }
        else { return this.renderElement(); }
    }

    renderElement() {
        return (
            <WeatherList { ...this.props } />
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
                    <button className='btn btn-big' onClick={ this.getDefaultWeathers }>
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    getDefaultWeathers = () => {
        this.setState({ loading: true, errors: false });
        this.props.dispatch(weatherGetMultiple(CITIES))
            .then(error => {
                this.setState({ loading: false, errors: Boolean(error) });        
            })
    }
}

function mapStateToProps(state) {
    return {
        weathers: state.weather.weathers,
        unit: state.weather.unit,
        queryId: state.weather.queryId
    };
}

export default connect(mapStateToProps)(ListHandler);

