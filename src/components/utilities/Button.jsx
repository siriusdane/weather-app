import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
    static propTypes = {
        id: PropTypes.string,
        classes: PropTypes.string,
        style: PropTypes.string,
        size: PropTypes.string,
        onClick: PropTypes.func
    }

    render() {
        return (
            <button
                id={ this.getId() }
                className={ this.getClasses() }
                onClick={ this.onClick }
            >{ this.props.children }</button>
        );
    }

    getId() {
        return this.props.id || null;
    }

    getClasses() {
        const style = this.getStyleClass(),
            size = this.getSizeClass(),
            classes = ['btn', style, size, ...(this.props.classes.split(' '))];

        return classes.join(' ');
    }

    getStyleClasses() {
        switch(this.props.style) {
            case 'primary':
                return 'btn-primary';
            case 'error':
                return 'btn-error';
            case 'success':
                return 'btn-success';
            default:
                return 'btn-default';
        }
    }

    getSizeClass() {
        switch(this.props.size) {
            case 'large':
                return 'btn-large';
            case 'small':
                return 'btn-small';
            default:
                return '';
        }
    }
}

export default Button;
