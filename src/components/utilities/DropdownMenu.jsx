import React from 'react';
import PropTypes from 'prop-types';

class DropdownMenu extends React.Component {
    static propTypes = {
        title: PropTypes.string,
        options: PropTypes.arrayOf(PropTypes.shape({
            copy: PropTypes.string,
            value: PropTypes.any
        })),
        onSelect: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.state = { showOptions: false }
    }

    render() {
        return (
            <div className='drpdown-menu'>
                <div className='drpdown-btn' onClick={ this.onClickButton }>
                    { this.props.title }
                </div>
                { this.state.showOptions && this.renderOptions() }
            </div>
        );
    }

    renderOptions() {
        return (
            <div className='drpdown-options'>
                {
                    this.props.options.map((option, idx) =>
                        <div
                            key={ idx }
                            className='drpdown-option-row'
                            onClick={ () => this.onClickOption(option.value) }
                        >
                            { option.copy }
                        </div>
                    )
                }
            </div>
        );
    }

    // HANDLERS
    onClickButton = () => {
        this.setState({ showOptions: !this.state.showOptions });
    }

    onClickOption = (option) => {
        this.props.onSelect(option);
        this.onClickButton();
    }
}

export default DropdownMenu;
