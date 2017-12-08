import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

class InputGroup extends React.Component {
    static propTypes = {
        label: PropTypes.string,
        help: PropTypes.string,
        validationState: PropTypes.string,
        inputProps: PropTypes.object
    }

    render() {
        const id = _.uniqueId('input-group-');

        return (
            <div className={ this.getClassNames() }>
                <label htmlFor={ id } className='input-grp-label'>
                    { this.props.label }
                </label>
                <input type='text' className='input-grp-field' { ...this.props.inputProps } />
                { this.props.help && <p className='input-grp-help'>{ this.props.help }</p> }
            </div>
        );
    }

    getClassNames() {
        const classes = ['input-grp']

        switch(this.props.validationState) {
            case InputGroup.VALIDATION_SUCCESS:
                classes.push('has-success');
                break;
            case InputGroup.VALIDATION_ERROR:
                classes.push('has-error');
                break;
            case InputGroup.VALIDATION_WARNING:
                classes.push('has-warning');
                break;
            default:
                break;
        }

        return classes.join(' ');
    }
}

InputGroup.VALIDATION_SUCCESS = 'SUCCESS';
InputGroup.VALIDATION_ERROR = 'ERROR';
InputGroup.VALIDATION_WARNING = 'WARNING';

export default InputGroup;
