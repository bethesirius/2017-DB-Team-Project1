/**
 * Created by rino0 on 2017-03-27.
 */
import React from "react";
import {browserHistory} from "react-router";
import {SubmissionError} from "redux-form";
import {Button, Form, Header, Segment} from "semantic-ui-react";
import ServerCreateForm from "../../form/ServerCreateForm";
import SwitchCreateForm from "../../form/SwitchCreateForm";
import StorageCreateForm from "../../form/StorageCreateForm";
import RackCreateForm from "../../form/RackCreateForm";
import ItemGroup from "../../component/ItemGroup";

const temp_rack = {
    assetId: 'R00000',
    size: 46,
    servers: 5,
    storages: 10,
    networks: 1,
    emptys: 20,
    mounted: [{
        assetId: 'S00000',
        size: 2,
        mount_lv: 1,
        ip: '0.0.0.0',
    }],
};

class AssetEdit extends React.Component {
    static propTypes = {};
    handleNext = (event) => {
        event.preventDefault();
        browserHistory.push(`/asset/form/confirm/${this.props.params.id}`);
    };
    // static defaultProps = {};
    // static  childContextTypes = {};
    // static contextTypes = {};

    constructor(props) {
        super(props);
        this.state = {
            type: "none",
            options: [
                {text: "--- 추가할 장비를 선택하세요 ---", value: "none"},
                {text: '서버', value: 'server',},
                {text: '스위치', value: 'network',},
                {text: '스토리지', value: 'storage',},
                {text: '랙', value: 'rack',},
            ],
            none: {form: () => <Segment attached={true}/>, submit: null, list: [],},
            server: {form: ServerCreateForm, submit: this.handleServerSubmit, list: [],},
            network: {form: SwitchCreateForm, submit: this.handleSwitchSubmit, list: [],},
            storage: {form: StorageCreateForm, submit: this.handleStorageSubmit, list: [],},
            rack: {form: RackCreateForm, submit: this.handleRackSubmit, list: [],}
        };
    }

    // getChildContext() {}
    // componentDidMount(){}
    // componentWillUnmount(){}

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
                    cpu: Math.random(),
                });
                return state;
            });
        });
    };
    handleSwitchSubmit = (values, dispatch) => {
        return this._postDevice("/dummy_ok.json", (json) => {
            this.setState((state, props) => {
                state.type = "none";
                state.network.list.push({
                    id: Math.random(),
                    cpu: Math.random(),
                });
                return state;
            });
        });
    };
    handleStorageSubmit = (values, dispatch) => {
        return this._postDevice("/dummy_ok.json", (json) => {
            this.setState((state, props) => {
                state.type = "none";
                state.storage.list.push({
                    id: Math.random(),
                    cpu: Math.random(),
                });
                return state;
            });
        });
    };
    handleRackSubmit = (values, dispatch) => {
        return this._postDevice("/dummy_ok.json", (json) => {
            this.setState((state, props) => {
                state.type = "none";
                state.rack.list.push(temp_rack);
                return state;
            });
        });
    };
    handleTypeChange = (e, {value}) => {
        this.setState({type: value,});
    };

    render() {
        const {params: {id, asset_num},} = this.props;
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
                    <Header>자산:{asset_num}에 등록된 장비 목록</Header>
                    <ItemGroup.Server items={this.state.server.list}/>
                    <ItemGroup.Storage items={this.state.storage.list}/>
                    <ItemGroup.Switch items={this.state.network.list}/>
                    <ItemGroup.Rack items={this.state.rack.list}/>
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

export default AssetEdit;
