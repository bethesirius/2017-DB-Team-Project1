/**
 * Created by rino0 on 2017-03-27.
 */
import React from "react";
import {browserHistory} from "react-router";
import {Button, Segment} from "semantic-ui-react";
import ServerSelectForm from "../../form/ServerSelectForm";

class ServiceSelectServer extends React.Component {
    componentDidMount() {
        const {router, route} = this.props;
        window.onbeforeunload = this.handleLeavePage;
        this.setState({
            removeLeaveHook: router.setRouteLeaveHook(route, this.handleLeavePage),
        });
    }

    handleLeavePage = () => {
        return "입력이 완료 되지 않았습니다!. 계속하시겠습니까?";
    };

    componentWillUnmount() {
        window.onbeforeunload = null; // remove listener.
    }

    handleSkip = (e, props) => {
        e.preventDefault();
        if (this.state.removeLeaveHook) {
            this.state.removeLeaveHook();
        }
        browserHistory.push(`/service/form/confirm/${this.props.params.id}`);
    };
    handleSubmit = (values, dispatch) => {
        //? hhh 구현 불가한 문제임.
        // let server_id = parseInt(values[fieldNames.server_id], 10);
        // let service_name_id = this.props.params.id;
        if (this.state.removeLeaveHook) {
            this.state.removeLeaveHook();
        }
    };

    render() {
        return (
            <Segment>
                <ServerSelectForm onSubmit={this.handleSubmit}/>
                <Button secondary={true} fluid={true} content={"건너 뛰기"} icon='right arrow' labelPosition='right'
                        onClick={this.handleSkip}/>
            </Segment>
        );
    }
}

export default ServiceSelectServer;
