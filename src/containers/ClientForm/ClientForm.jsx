import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import Button from '../../components/Button/Button';
import NewClientName from './ClientName';
import NewClientDescr from './ClientDescr';

class ClientForm extends React.PureComponent {
    state = {
        id: '',
        name: '',
        nameError: false,
        descr: '',
    };

    static getDerivedStateFromProps(props, state) {
        const { client } = props;
        if (_get(client, 'id') !== state.id) {
            return {
                ...client,
            };
        }
        return null;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { onSubmit } = this.props;
        const nameError = this.state.name.trim() === '';
        this.setState({
            nameError,
        });
        if (!nameError) {
            const id = this.state.id.trim();
            onSubmit && onSubmit({
                id: id === '' ? undefined : id,
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
        const { client } = this.props;
        const clientId = _get(this.props, 'client._.#', '');
        const text = !!client ?
            `Client: ${clientId}` :
            'Add New Client';
        return (
            <h1 className="font-bold text-gray-700 text-xl mb-3">
                {text}
            </h1>
        );
    }

    renderButtons() {
        const { client, onCancel } = this.props;
        const text = !!client ? 'Update' : 'Add';
        return (
            <div className="flex items-center justify-between">
                <Button>{text}</Button>
                <Button
                    onClick={onCancel}
                    type='button'
                >
                    Cancel
                </Button>
            </div>
        );
    }

    render() {
        return (
            <div className="w-full max-w-s">
                <form
                    className="px-2 pt-1 pb-4 mb-2"
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
                    {this.renderButtons()}
                </form>
            </div>
        );
    }
}

ClientForm.propTypes = {
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
    client: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        descr: PropTypes.string,
    }),
};

ClientForm.defaultProps = {
    onSubmit: null,
    onCancel: undefined,
    client: null,
};

export default ClientForm;
