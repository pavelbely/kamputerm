import ReactDOM from 'react-dom';
import React from 'react';
import LoginView from './login/LoginView';
import MainView from './main/MainView';
import PrivateView from './private/PrivateView';
import auth from './auth/auth';
import FlatButton from 'material-ui/lib/flat-button';
import {Provider} from 'react-redux';
import {store} from './store/storeConfig';
import { Router, Route, Link, browserHistory, withRouter } from 'react-router'

class App extends React.Component {
    render() {
        return (
            <div>
                {this.props.children || <MainView/>}
            </div>
        )
    }
}

function requireAuth(nextState, replace, next) {
  auth.ensureAuthenticated()
    .then(function(res) {
        if (res.status == 401) {
          replace({
            pathname: '/login',
            state: { nextPathname: nextState.location.pathname }
          });
        }
        next();
      });
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <Route path="login" component={LoginView}/>
                <Route path="private" component={PrivateView} onEnter={requireAuth}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('example')
);
