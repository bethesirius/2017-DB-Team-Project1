/**
 * Created by rino0 on 2017-03-27.
 */
import React from "react";
import {browserHistory} from "react-router";
import {Button, Dimmer, Form, Header, Loader, Segment} from "semantic-ui-react";
import RackCreateForm, {fieldNames} from "../../form/RackCreateForm";
import ItemGroup from "../../component/ItemGroup";
import moment from "moment";

function zerofill(num, length) {
    return (num / Math.pow(10, length)).toFixed(length).substr(2);
}

class AssetEdit extends React.Component {
    static propTypes = {
        params: React.PropTypes.object,
    };
    handleNext = (event) => {
        event.preventDefault();
        browserHistory.push(`/asset/form/edit/${this.props.params.id}/${this.props.params.asset_num}`);
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
                {text: '랙', value: 'rack',},
            ],
            asset: {},
            none: {
                form: () => (
                    <Segment attached={true}>
                        추가 할 Rack 이 없다면 바로 다음으로 진행 하셔도 좋습니다.
                    </Segment>
                ),
                submit: null,
                list: [],
            },
            rack: {form: RackCreateForm, submit: this.handleRackSubmit, list: [],}
        };
    }

    componentDidMount() {
        this.setState({isFetching: true,});
        fetch(`/api/asset/${this.props.params.id}`).then(res => res.json()).then(message => {
            this.setState({
                isFetching: false,
                asset: message
            });
        }).catch(err => {
            alert(err.message);
            this.setState({isFetching: false});
        });
    }

    _handleDeviceDelete = (path, listName, e, value) => {
        this.setState({isFetching: true});
        fetch(`/api/${path}/${value}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"}
        }).then(() => {
            this.setState((state, props) => {
                state[listName].list = state[listName].list.filter(item => item.id !== value);
                state.isFetching = false;
                return state;
            });
        }).catch(err => {
            alert(err.message);
            this.setState({isFetching: false});
        });
    };

    handleRackSubmit = (values, dispatch) => {
        let asset_id = parseInt(this.props.params.id, 10);
        let location = values[fieldNames.location];
        location = Number.isInteger(location) ? {location_id: location} : {location: {location: location}};
        let spec = values[fieldNames.spec];
        spec = Number.isInteger(spec) ? {spec_id: spec} : {spec: {spec: spec}};
        let detail = values[fieldNames.detail];
        let rack_size = parseInt(values[fieldNames.size], 10);
        let rack = Object.assign({rack_size, asset_id}, spec,);
        rack = {rack};

        const body = {};
        Object.assign(body, {detail,}, rack, location);
        this.setState({isFetching: true});
        return fetch(`/api/detail_location`, {
            method: "POST",
            headers: {"Content-Type": "application/json",},
            body: JSON.stringify(body),
        }).then(res => res.json()).then(message => {
            let manage_num = `R${zerofill(moment(this.state.asset.get_date).year() % 100, 2)}${zerofill(message.rack.id % 1000, 3)}`;
            return fetch(`/api/rack/${message.rack.id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json",},
                body: JSON.stringify({manage_num}),
            });
        }).then(res => res.json()).then(message => {
            this.setState((state, props) => {
                state.type = "none";
                state.rack.list.push(message);
                state.isFetching = false;
                return state;
            });
        }).catch(err => {
            alert(err.message);
            this.setState({isFetching: false});
        });
    };
    handleRackDelete = (e, {value}) => {
        this._handleDeviceDelete("rack", "rack", e, value);
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
                    <ItemGroup.Rack items={this.state.rack.list} onDelete={this.handleRackDelete}/>
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
