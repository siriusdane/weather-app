import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Button from './utilities/Button.jsx';
import DropdownMenu from './utilities/DropdownMenu.jsx';
import { TEMP_CELCIUS, TEMP_FAHRENHEIT, TEMP_KELVIN } from '../constants/weather';
import { weatherChangeUnit, weatherClearCity } from '../actions/weather';
import { displayDate } from '../utils/units';

class Navbar extends React.Component {
    static propTypes = {
        unit: PropTypes.string.isRequired,
        blockRedirect: PropTypes.bool,
        dispatch: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        };
    }

    render() {
        if (this.state.redirect && !this.props.blockRedirect) {
            return <Redirect to='/' />
        }
        return (
            <div className='navbar'>
                { this.renderTitle() }
                { this.renderDropdown() }
            </div>
        );
    }

    renderTitle() {
        return (
            <div className='navbar-title'>
                <div className='selectable' onClick={ this.onTitleClick }>
                    <i className='fa fa-cloud' />
                    <span>Weather App</span>
                </div>
            </div>
        );
    }

    renderDropdown() {
        const options = [
            { copy: 'Celcius', value: TEMP_CELCIUS },
            { copy: 'Fahrenheit', value: TEMP_FAHRENHEIT },
            { copy: 'Kelvin', value: TEMP_KELVIN }
        ];

        return (
            <div className='navbar-selector'>
                <span className='date'>{ displayDate(new Date()) }</span>
                <DropdownMenu
                    title={ this.getButtonCopy() }
                    options={ options }
                    onSelect={ this.onClick }
                />
            </div>
        );
    }

    // SELECTORS
    getButtonCopy() {
        switch(this.props.unit) {
            case TEMP_CELCIUS:
                return 'Celcius';
            case TEMP_FAHRENHEIT:
                return 'Fahrenheit';
            case TEMP_KELVIN:
            default:
                return 'Kelvin';
        }
    }

    // HANDLERS
    onClick = (option) => {
        this.props.dispatch(weatherChangeUnit(option));
    }

    onTitleClick = () => {
        this.setState({ redirect: true });
    }
}

export default Navbar;
