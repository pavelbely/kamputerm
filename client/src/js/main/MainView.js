import { AutoComplete } from 'material-ui';
import { Route, Link} from 'react-router'
import React from 'react';
import {connect} from 'react-redux';
import {actions} from '../store/storeConfig';
class MainView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.setState({
            dataSource: [],
        });
    }

    handleUpdateInput(value) {
        this.props.changeWord(value);
    };


    render() {
        return (
            <div style={{backgroundColor : '#fff'}}>
                <AutoComplete
                    hintText="Увядзіце слова"
                    style={{marginLeft : '100px'}}
                    dataSource={this.state.dataSource}
                    onUpdateInput={(value) => this.handleUpdateInput(value)}
                />
                {this.props.hints.map(e => <h1>{e}</h1>)}
            </div>
        );
    }
}

export default connect(
    (state, ownProps) => ({
        ...ownProps,
        hints: state.word.hints
    }),
    dispatch => ({
        changeWord : value => {
            dispatch(actions.changeWord(value))
        }
    })
)(MainView);