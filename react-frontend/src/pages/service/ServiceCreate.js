/**
 * Created by rino0 on 2017-03-27.
 */
import React from "react";
import {Segment} from "semantic-ui-react";
import {browserHistory} from "react-router";
import ServiceCreateForm, {fieldNames} from "../../form/ServiceCreateForm";

class ServiceCreate extends React.Component {
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
        browserHistory.push(`/service/form/edit/${values[fieldNames.name]}`);
    };

    render() {
        return (
            <Segment>
                <ServiceCreateForm onSubmit={this.handleSubmit}/>
            </Segment>
        );
    }
}

export default ServiceCreate;