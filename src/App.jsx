import React from 'react';
import { withRouter } from 'react-router-dom';
import 'tailwindcss/dist/base.min.css';
import 'tailwindcss/dist/components.min.css';
import 'tailwindcss/dist/utilities.min.css';

class App extends React.PureComponent {
    render() {
        return (
            <div className="container mx-auto">
                {this.props.children}
            </div>
        );
    }
}

export default withRouter(App);
