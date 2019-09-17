import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../components/Button/Button';
import NewClientName from './ClientName';
import NewClientDescr from './ClientDescr';

class ClientForm extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            nameError: false,
            descr: '',
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { onSubmit } = this.props;
        const nameError = this.state.name.trim() === '';
        this.setState({
            nameError,
        });
        if (!nameError) {
            onSubmit && onSubmit({
                name: this.state.name,
                descr: this.state.descr,
            });
            this.setState({
                name: '',
                nameError: false,
                descr: '',
            });
        }
    };

    handleNameChange = (e) => {
        const { value: name } = e.target;

        this.setState(prevState => ({
            name,
            nameError: prevState.nameError && name === '',
        }));
    };

    renderTitle() {
        const { isUpdating } = this.props;
        const text = isUpdating ? 'Update Client' : 'Add New Client';
        return (
            <h1 className="font-bold text-gray-700 text-xl mb-3">
                {text}
            </h1>
        );
    }

    renderButton() {
        const { isUpdating } = this.props;
        const text = isUpdating ? 'Update' : 'Add';
        return (
            <div className="flex items-center justify-between">
                <Button>{text}</Button>
            </div>
        );
    }

    render() {
        return (
            <div className="w-full max-w-xs">
                <form
                    className="bg-white px-2 pt-1 pb-4 mb-2"
                    onSubmit={this.handleSubmit}
                >
                    {this.renderTitle()}
                    <div className="mb-4">
                        <NewClientName
                            value={this.state.name}
                            error={this.state.nameError}
                            onChange={this.handleNameChange}
                        />
                    </div>
                    <div className="mb-4">
                        <NewClientDescr
                            value={this.state.descr}
                            onChange={e => this.setState({ descr: e.target.value })}
                        />
                    </div>
                    {this.renderButton()}
                </form>
            </div>
        );
    }
}

ClientForm.propTypes = {
    onSubmit: PropTypes.func,
    isUpdating: PropTypes.bool,
};

ClientForm.defaultProps = {
    onSubmit: null,
    isUpdating: false,
};

export default ClientForm;
