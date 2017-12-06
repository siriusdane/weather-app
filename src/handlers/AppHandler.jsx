import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import App from '../components/App.jsx';

class AppHandler extends React.Component {
    static propTypes = {
        foo: PropTypes.object.isRequired
    };

    render() {
        return (
            <App { ...this.props } />
        );
    }
}

function mapStateToProps(state) {
    return {
        foo: state.foo
    };
}

export default connect(mapStateToProps)(AppHandler);
