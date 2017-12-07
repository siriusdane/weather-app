import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { TEMP_CELCIUS, TEMP_FAHRENHEIT, TEMP_KELVIN } from '../constants/weather';
import { weatherChangeUnit, weatherClearCity } from '../actions/weather';

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
            <div className='navbar-title' onClick={ this.onTitleClick }>
                <span>Weather App</span>
            </div>
        );
    }

    renderDropdown() {
        return (
            <div className='navbar-selector'>
                <DropdownButton id='1' title={ this.getButtonCopy() }>
                    <MenuItem
                        eventKey={ TEMP_CELCIUS }
                        onClick={ () => this.onClick(TEMP_CELCIUS) }
                    >Celcius</MenuItem>
                    <MenuItem
                        eventKey={ TEMP_FAHRENHEIT }
                        onClick={ () => this.onClick(TEMP_FAHRENHEIT) }
                    >Fahrenheit</MenuItem>
                    <MenuItem
                        eventKey={ TEMP_KELVIN }
                        onClick={ () => this.onClick(TEMP_KELVIN) }
                    >Kelvin</MenuItem>
                </DropdownButton>
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
