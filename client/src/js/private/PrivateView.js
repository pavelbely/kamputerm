import React from 'react';
import { Link } from 'react-router';
import { RaisedButton, TextField } from 'material-ui';
import { setIn } from '../utils/immutable';

export default class PrivateView extends React.Component {

  render() {
    return (<div>
          <p>  Малайчына, вы зайшлі! </p>
        </div>);
  }
}
