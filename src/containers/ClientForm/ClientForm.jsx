import React from 'react';
import PropTypes from 'prop-types';
import nanoid from 'nanoid';
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
        const nameError = this.state.name === '';
        this.setState({
            nameError,
        });
        if (!nameError) {
            onSubmit && onSubmit({
                name: this.state.name,
                descr: this.state.descr,
                id: nanoid(),
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

    render() {
        return (
            <div className="w-full max-w-xs">
                <form
                    className="bg-white px-2 pt-3 pb-4 mb-2"
                    onSubmit={this.handleSubmit}
                >
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
                    <div className="flex items-center justify-between">
                        <Button>Add</Button>
                    </div>
                </form>
            </div>
        );
    }
}

ClientForm.propTypes = {
    onSubmit: PropTypes.func,
};

ClientForm.defaultProps = {
    onSubmit: null,
};

export default ClientForm;