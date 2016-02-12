import AutoComplete from 'material-ui/lib/auto-complete';
import { Route, Link} from 'react-router'
import React from 'react';

export default class MainView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            dataSource: [],
        };
    }

    handleUpdateInput(t) {
        this.setState({
            dataSource: [t, t + t, t + t + t],
        });
    };

    render() {
        return (
            <AutoComplete
                hintText="Увядзіце слова"
                dataSource={this.state.dataSource}
                onUpdateInput={this.handleUpdateInput}
            />
        );
    }
}