import React from 'react';
import { withRouter } from 'react-router-dom';
import Button from '../components/Button/Button';
import ClientsList from '../containers/ClientsList/ClientsList';

class HomeView extends React.PureComponent {
    render() {
        return (
            <React.Fragment>
                <div
                    className="px-2 pt-2 pb-2 mb-2"
                >
                    <Button
                        onClick={() => {
                            const { history } = this.props;
                            history.push(`/clients/new`);
                        }}
                    >
                        Add New Client
                    </Button>
                </div>
                <ClientsList />
            </React.Fragment>
        );
    }
}

export default withRouter(HomeView);
