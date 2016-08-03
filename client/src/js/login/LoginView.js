import React from 'react';
import { Link } from 'react-router'
import {RaisedButton, TextField} from 'material-ui';
import {setIn} from '../utils/immutable';
import auth from '../auth/auth';
const styles = {
    margin: {marginRight: 12},
    inputsContainer: {height: 120}
};

const requiredFieldErrorProvider = value => !value ? 'Поле абавязковае' : undefined;

const checkProperty = (state, property, errorProvider) => {
    let error = errorProvider[state[property]];
    if (error) {
        return [false, {
            ...state,
            errors: setIn(
                state.errors,
                property,
                errorProvider(state[property])
            )
        }];
    }
    return [true, state];
};

export default class LoginView extends React.Component {

    createTextField(property, label, props = {}) {
        return <TextField
            {...props}
            hintText={label}
            errorText={this.state.errors[property]}
            onChange={(e) => { this.setState({
                                [property] : e.target.value,
                                errors : setIn(this.state.errors, property, '')
                            })
                        }}
        />;
    }

    componentWillMount() {
        this.setState({
            remindMode: false,
            nameOrEmail: '',
            password: '',
            errors: {}
        });
    }

    verifyProperties(...fields) {
        let valid = true,
            nextState = {...this.state, errors : {}};
        for(let field of fields) {
            [valid, nextState] = checkProperty(nextState, field, requiredFieldErrorProvider);
            console.log(`${field} is valid = ${valid}`);
        }
        return [valid, nextState];
    }

    remind() {
        let [valid, nextState] = this.verifyProperties(['nameOrEmail']);
        this.setState(nextState);
    }

    enter() {
        let [valid, nextState] = this.verifyProperties(['nameOrEmail', 'password']);
        this.setState(nextState, this.handleSubmit);
    }

    handleSubmit() {


      const email = this.state.nameOrEmail;
      const pass = this.state.password;

      const { location } = this.props

      auth.login(email, pass)
        .then(response => {
            if (location.state && location.state.nextPathname) {
              this.props.router.replace(location.state.nextPathname)
            }
          },
          reject => {
            this.props.router.replace('/')
          });
    }

    submitLogin() {
      let loginData = {
        username : this.state.nameOrEmail,
        password : this.state.password
      };

      // Send the form data.
      var xmlhttp = new XMLHttpRequest();
      var _this = this;
      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4) {
          var response = JSON.parse(xmlhttp.responseText);
          if (xmlhttp.status === 200 && response.status === 'OK') {
            _this.setState({ type: 'success', message: 'We have received your message and will get in touch shortly. Thanks!' });
          }
          else {
            _this.setState({ type: 'danger', message: 'Sorry, there has been an error. Please try again later or send us an email at info@example.com.' });
          }
        }
      };
      xmlhttp.open('POST', 'auth/login', true);
      xmlhttp.setRequestHeader('Content-type', 'application/json');
      xmlhttp.send(JSON.stringify(loginData));
    }

    createLoginView() {
        return <div>
            <div style={styles.inputsContainer}>
                {this.createTextField('nameOrEmail', "Імя або эмэйл")}
                <br />
                {this.createTextField('password', "Пароль", {type : "password"})}
            </div>
            <RaisedButton
                primary={true} style={styles.margin} label="Увайсці"
                onClick={() => this.enter()}
            />
            <RaisedButton secondary={true} style={styles.margin} label="Забыўся пароль"
                          onClick={() => this.setState({remindMode: true})}
            />
        </div>;
    }

    createRemindView() {
        return <div>
            <div style={styles.inputsContainer}>
                {this.createTextField('nameOrEmail', "Імя або эмэйл")}
            </div>
            <RaisedButton
                primary={true} style={styles.margin} label="Узгадаў :)"
                onClick={() => this.setState({remindMode: false})}
            />
            <RaisedButton secondary={true} style={styles.margin} label="Адправіць"
                          onClick={() => this.remind()}
            />
        </div>;
    }

    render() {
        return <div>
            <Link to="/">
                <RaisedButton label="Вярнуцца"/>
            </Link>
            <br/>
            {this.state.remindMode ? this.createRemindView() : this.createLoginView()}
        </div>;
    }
}
