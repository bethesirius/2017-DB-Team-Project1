/**
 * Created by rino0 on 2017-03-27.
 */
import React from "react";
import {Segment} from "semantic-ui-react";
import {browserHistory} from "react-router";
import AssetCreateForm, {fieldNames} from "../../form/AssetCreateForm";

class AssetCreate extends React.Component {
    static propTypes = {};
    // static defaultProps = {};
    // static  childContextTypes = {};
    // static contextTypes = {};

    constructor(props) {
        super(props);
        this.state = {};
    }

    // getChildContext() {}
    // componentDidMount(){}
    // componentWillUnmount(){}
    handleSubmit = (values, dispatch) => {
        browserHistory.push(`/asset/form/edit/${values[fieldNames.deviceId]}`);
    };

    render() {
        const {} = this.props;
        return (
            <Segment>
                <AssetCreateForm onSubmit={this.handleSubmit}/>
            </Segment>
        );
    }
}

export default AssetCreate;