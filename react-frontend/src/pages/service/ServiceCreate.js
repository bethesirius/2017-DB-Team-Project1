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
        let name = values[fieldNames.name];
        if (Number.isInteger(name)) {
            browserHistory.push(`/service/form/storage/${name}`);
            return;
        }
        name = {service_name: name};
        const body = {};
        Object.assign(body, name);
        return fetch("/api/service_name", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        }).then(res => res.ok ? res.json() : Promise.reject(new Error("서버에서 요청을 거절 했습니다."))).then(message => {
            browserHistory.push(`/service/form/storage/${message.id}`);
        });
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