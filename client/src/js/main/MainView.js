import React, { PropTypes } from 'react';
import { AutoComplete, RaisedButton } from 'material-ui';
import { connect } from 'react-redux';
import { actions } from '../store/storeConfig';
class MainView extends React.Component {

  static propTypes = {
    changeWord: PropTypes.func.isRequired,
    hints: PropTypes.array,
  };

  handleUpdateInput(value) {
    this.props.changeWord(value);
  }

  render() {
    return (
      <div style={{ backgroundColor: '#fff' }}>
        <RaisedButton label="login" linkButton href="login" />
        <br />
        <AutoComplete
          hintText="Калі ласка, Увядзіце слова"
          style={{ marginLeft: '100px' }}
          dataSource={this.props.hints}
          onUpdateInput={(value) => this.handleUpdateInput(value)}
        />
      </div>
    );
  }
}

export default connect(
    (state, ownProps) => ({
      ...ownProps,
      hints: state.definition.hints,
    }),
    dispatch => ({
      changeWord: value => {
        dispatch(actions.changeWord(value));
      },
    })
)(MainView);
