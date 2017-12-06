import React from 'react';
import PropTypes from 'prop-types'

class App extends React.Component {
    static propTypes = {
        foo: PropTypes.object
    };

    render() {
        return (
            <div>{ this.props.foo.text }</div>
        );
    }
};

export default App;
