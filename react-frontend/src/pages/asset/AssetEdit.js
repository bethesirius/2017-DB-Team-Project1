/**
 * Created by rino0 on 2017-03-27.
 */
import React from "react";
import {browserHistory} from "react-router";
import {SubmissionError} from "redux-form";
import {Button, Dimmer, Form, Header, Loader, Segment} from "semantic-ui-react";
import ServerCreateForm, {fieldNames as serverField} from "../../form/ServerCreateForm";
import SwitchCreateForm from "../../form/SwitchCreateForm";
import StorageCreateForm from "../../form/StorageCreateForm";
import RackCreateForm from "../../form/RackCreateForm";
import ItemGroup from "../../component/ItemGroup";
import moment from "moment";

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

function zerofill(num, length) {
    return (num / Math.pow(10, length)).toFixed(length).substr(2);
}

class AssetEdit extends React.Component {
    static propTypes = {
        params: React.PropTypes.object,
    };
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
            isFetching: false,
            type: "none",
            options: [
                {text: "--- 추가할 장비를 선택하세요 ---", value: "none"},
                {text: '서버', value: 'server',},
                {text: '스위치', value: 'network',},
                {text: '스토리지', value: 'storage',},
                {text: '랙', value: 'rack',},
            ],
            asset: {},
            none: {form: () => <Segment attached={true}/>, submit: null, list: [],},
            server: {form: ServerCreateForm, submit: this.handleServerSubmit, list: [],},
            network: {form: SwitchCreateForm, submit: this.handleSwitchSubmit, list: [],},
            storage: {form: StorageCreateForm, submit: this.handleStorageSubmit, list: [],},
            rack: {form: RackCreateForm, submit: this.handleRackSubmit, list: [],}
        };
    }

    // getChildContext() {}
    componentDidMount() {
        this.setState({isFetching: true,});
        fetch(`/api/asset/${this.props.params.id}`).then(res => res.json()).then(message => {
            this.setState({
                isFetching: false,
                asset: message
            });
        })
    }

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
        let location = values[serverField.location];
        let spec = values[serverField.spec];
        let core_num = parseInt(values[serverField.core_num], 10);
        let asset_id = parseInt(this.props.params.id, 10);
        location = Number.isInteger(location) ? {location_id: location} : {location: {location: {location: location}}};
        spec = Number.isInteger(spec) ? {spec_id: spec} : {spec: {spec: spec}};

        const body = {};
        Object.assign(body, {
            core_num,
            asset_id,
        }, location, spec);
        return fetch("/api/server", {
            method: "POST",
            headers: {"Content-Type": "application/json",},
            body: JSON.stringify(body),
        }).then(res => res.json()).then(message => {
            let manage_num = `S${zerofill(moment(this.state.asset.get_date).year() % 100, 2)}${zerofill(message.id % 1000, 3)}`;
            return fetch(`/api/server/${message.id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json",},
                body: JSON.stringify({manage_num}),
            });
        }).then(res => res.json()).then(message => {
            this.setState((state, props) => {
                state.type = "none";
                state.server.list.push(message);
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
                    core_num: Math.random(),
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
                    core_num: Math.random(),
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
        const {params: {asset_num},} = this.props;
        const device = this.state[this.state.type];
        const DeviceForm = device.form;
        return (
            <Dimmer.Dimmable as="div">
                <Dimmer active={this.state.isFetching}>
                    <Loader size='massive'>Loading</Loader>
                </Dimmer>
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
            </Dimmer.Dimmable>
        );
    }
}

export default AssetEdit;
