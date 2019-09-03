import React from 'react';
import PropTypes from 'prop-types';
import NewClientName from './NewClientName';
import NewClientDescr from './NewClientDescr';

class NewClientForm extends React.PureComponent {
    handleSubmit = () => {
        const { onSubmit } = this.props;
        onSubmit && onSubmit();
    };

    render() {
        return (
            <div class="w-full max-w-xs">
                <form
                    class="bg-white px-2 pt-3 pb-4 mb-2"
                    onSubmit={this.handleSubmit}
                >
                    <div class="mb-4">
                        <NewClientName />
                    </div>
                    <div class="mb-4">
                        <NewClientDescr />
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