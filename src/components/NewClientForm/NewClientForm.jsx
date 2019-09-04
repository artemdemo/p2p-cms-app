import React from 'react';
import PropTypes from 'prop-types';
import NewClientName from './NewClientName';
import NewClientDescr from './NewClientDescr';

class NewClientForm extends React.PureComponent {
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
        onSubmit && onSubmit();
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

NewClientForm.propTypes = {
    onSubmit: PropTypes.func,
};

NewClientForm.defaultProps = {
    onSubmit: null,
};

export default NewClientForm;