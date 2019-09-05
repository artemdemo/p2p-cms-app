import React from 'react';
import PropTypes from 'prop-types';
import nanoid from 'nanoid';
import NewClientName from './ClientName';
import NewClientDescr from './ClientDescr';

class ClientForm extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            descr: '',
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { onSubmit } = this.props;
        onSubmit && onSubmit({
            name: this.state.name,
            descr: this.state.descr,
            id: nanoid(),
        });
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
                            onChange={e => this.setState({ name: e.target.value })}
                        />
                    </div>
                    <div className="mb-4">
                        <NewClientDescr
                            value={this.state.descr}
                            onChange={e => this.setState({ descr: e.target.value })}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Add
                        </button>
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