import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from '../components/Navbar.jsx';

class ErrorHandler extends React.Component {
    render() {
        return (
            <div>
                <Navbar { ...this.props } />
                <div className='error-page'>
                    <div className='error-container'>
                        <i className='fa fa-exclamation-circle' />
                        <span>Sorry, the page you requested could not be found</span>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { unit: state.weather.unit };
}

export default connect(mapStateToProps)(ErrorHandler);
