/**
 * Created by rino0 on 2017-03-27.
 */
import React from "react";
import {browserHistory} from "react-router";
import {SubmissionError} from "redux-form";
import {Button, Form, Header, Segment} from "semantic-ui-react";
import ServerSelectForm from "../../form/ServerSelectForm";
import StorageSelectForm from "../../form/StorageSelectForm";
import ItemGroup from "../../component/ItemGroup";

class ServiceEdit extends React.Component {
    static propTypes = {};
    handleNext = (event) => {
        event.preventDefault();
        if (this.state.removeLeaveHook) {
            this.state.removeLeaveHook();
        }
        browserHistory.push(`/service/form/confirm/${this.props.params.id}`);
    };
    // static defaultProps = {};
    // static  childContextTypes = {};
    // static contextTypes = {};

    constructor(props) {
        super(props);
        this.state = {
            type: "none",
            options: [
                {text: "--- 추가할 장비/볼륨을 선택하세요 ---", value: "none"},
                {text: '서버', value: 'server',},
                {text: '볼륨(스토리지_스펙)', value: 'volume',},
            ],
            none: {form: () => <Segment attached={true}/>, submit: null, list: [],},
            server: {form: ServerSelectForm, submit: this.handleServerSubmit, list: [],},
            volume: {form: StorageSelectForm, submit: this.handleVolumeSubmit, list: [],},
        };
    }

    // getChildContext() {}
    componentDidMount() {
        const {router, route} = this.props;
        window.onbeforeunload = this.handleLeavePage;
        this.setState({
            isFetching: true,
            removeLeaveHook: router.setRouteLeaveHook(route, this.handleLeavePage),
        });
    }

    handleLeavePage = () => {
        return "입력이 완료 되지 않았습니다!. 계속하시겠습니까?";
    };

    componentWillUnmount() {
        window.onbeforeunload = null; // remove listener.
    }


    _postDevice(url, onSuccess) {
        return fetch(
            url,
        ).then(res => {
            if (!res.ok) {
                throw SubmissionError({_error: "Failed Fetch"});
            }
            return res.json();
        }).then(json => {
            onSuccess(json);
        }).catch(err => {
            return Promise.reject(new SubmissionError({_error: `Failed Fetch by:${err}`}));
        });
    }

    handleServerSubmit = (values, dispatch) => {
        return this._postDevice("/dummy_ok.json", (json) => {
            this.setState((state, props) => {
                state.type = "none";
                state.server.list.push({
                    id: Math.random(),
                    core_num: Math.random(),
                });
                return state;
            });
        });
    };
    handleVolumeSubmit = (values, dispatch) => {
        return this._postDevice("/dummy_ok.json", (json) => {
            this.setState((state, props) => {
                state.type = "none";
                state.volume.list.push({
                    id: Math.random(),
                    core_num: Math.random(),
                });
                return state;
            });
        });
    };
    handleTypeChange = (e, {value}) => {
        this.setState({type: value,});
    };

    render() {
        const {params: {id},} = this.props;
        const device = this.state[this.state.type];
        const DeviceForm = device.form;
        return (
            <div>
                <Segment>
                    <Form>
                        <Form.Select label='장비 타입' placeholder='추가 등록할 장비를 선택하세요.' fluid={true}
                                     onChange={this.handleTypeChange}
                                     value={this.state.type}
                                     options={this.state.options}
                        />
                    </Form>
                    <DeviceForm onSubmit={device.submit}/>
                </Segment>
                <Segment attached={true}>
                    <Header>서비스:{id}에 등록된 장비 목록</Header>
                    <ItemGroup.Server items={this.state.server.list}/>
                    <ItemGroup.Storage items={this.state.volume.list}/>
                </Segment>
                <Button.Group attached={"bottom"}>
                    <Button
                        primary={true} content={"다음으로"} icon='right arrow' labelPosition='right'
                        onClick={this.handleNext}
                    />
                </Button.Group>
            </div>
        );
    }
}

export default ServiceEdit;
