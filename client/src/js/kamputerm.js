'use strict';

import ReactDOM from 'react-dom';
import React from 'react';
import LoginView from './login/LoginView';
import MainView from './main/MainView';
import FlatButton from 'material-ui/lib/flat-button';

import { Router, Route, Link, browserHistory } from 'react-router'

class App extends React.Component {
    render() {
        return (
            <div>
                <Link to="/login"><FlatButton label="Login"/></Link>
                <Link to="/main"><FlatButton label="Main"/></Link>
                <br/>
                {this.props.children}
            </div>
        )
    }
}



ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path="main" component={MainView}/>
            <Route path="login" component={LoginView}/>
        </Route>
    </Router>,
    document.getElementById('example')
);