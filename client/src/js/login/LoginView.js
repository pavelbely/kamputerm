import React from 'react';
import { Link } from 'react-router'
import FlatButton from 'material-ui/lib/flat-button';

export default class LoginView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Link to="/"><FlatButton label="Default"/></Link>
            </div>
        );
    }
}