import ReactDOM from 'react-dom';
import React, { PropTypes } from 'react';
import LoginView from './login/LoginView';
import MainView from './main/MainView';
import PrivateView from './private/PrivateView';
import auth from './auth/auth';
import { Provider } from 'react-redux';
import { store } from './store/storeConfig';
import { Router, Route, browserHistory } from 'react-router';

const App = ({ children }) => (
  <div>
    {children || <MainView />}
  </div>
);

App.propTypes = {
  children: PropTypes.any,
};

function requireAuth(nextState, replace, next) {
  auth.ensureAuthenticated()
    .then((res) => {
      if (res.status === 401) {
        replace({
          pathname: '/login',
          state: { nextPathname: nextState.location.pathname },
        });
      }
      next();
    });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="login" component={LoginView} />
        <Route path="private" component={PrivateView} onEnter={requireAuth} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('example')
);
