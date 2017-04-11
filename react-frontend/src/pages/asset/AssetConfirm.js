/**
 * Created by rino0 on 2017-03-27.
 */
import React from "react";
import {browserHistory} from "react-router";
import {Button, Confirm, Dimmer, Header, Icon, Loader, Segment} from "semantic-ui-react";
import ItemGroup from "../../component/ItemGroup";
import TableVariationItem from "../../component/TableVariationItem";
import AssetTable from "../../component/AssetTable";
import TotalUseStatisticGroup from "../../component/TotalUseStatisticGroup";

class AssetConfirm extends React.Component {
    static propTypes = {
        params: React.PropTypes.object,
    };

    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            isDeleteConfirmOpen: false,
            asset: {},
            server: {list: [],},
            network: {list: [],},
            storage: {list: [],},
            rack: {list: [],},
            statistic: [
                {icon: "server", label: '서버 수', value: 0},
                {icon: "server", label: '스위치 수', value: 0},
                {icon: "server", label: '스토리지 수', value: 0},
                {icon: "server", label: 'Rack 수', value: 0},
            ],
        };
    }

    // getChildContext() {}
    componentDidMount() {
        this.setState({isFetching: true});
        let filters = [{name: "asset_id", op: "eq", val: parseInt(this.props.params.id, 10)}];
        filters = JSON.stringify({filters});
        return Promise.all([
            fetch(`/api/asset/${this.props.params.id}`).then(res => res.json()),
            fetch(`/api/server?q=${filters}`).then(res => res.json()),
            fetch(`/api/switch?q=${filters}`).then(res => res.json()),
            fetch(`/api/storage?q=${filters}`).then(res => res.json()),
            fetch(`/api/rack?q=${filters}`).then(res => res.json()),
        ]).then(([asset, server, network, storage, rack]) => {
            this.setState((state, props) => {
                state.asset = asset;
                state.server.list = server.objects;
                state.statistic[0].value = server.objects.length;
                state.network.list = network.objects;
                state.statistic[1].value = network.objects.length;
                state.storage.list = storage.objects;
                state.statistic[2].value = storage.objects.length;
                state.rack.list = rack.objects;
                state.statistic[3].value = rack.objects.length;
                state.isFetching = false;
                return state;
            });
        }).catch(err => {
            alert(err);
            this.setState({isFetching: false});
        });
    }

    // componentWillUnmount(){}

    handleDone = (event) => {
        event.preventDefault();
        browserHistory.push(`/asset/`);
    };
    handleDelete = (event) => {
        event.preventDefault();
        this.setState({isDeleteConfirmOpen: true});
    };
    handleDeleteCancel = (event) => {
        event.preventDefault();
        this.setState({isDeleteConfirmOpen: false});
    };
    handleDeleteConfirm = (event) => {
        event.preventDefault();
        this.setState({isDeleteConfirmOpen: false});
        // todo do fetch API DELTE.
    };

    handleDeviceDelete = (type, e, {value}) => {
        this.setState({isFetching: true});
        const key = {
            server: 0,
            network: 1,
            storage: 2,
            rack: 3,
        };
        fetch(`/api/${type === "network" ? "switch" : type}/${value}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"}
        }).then(res => {
            this.setState((state, props) => {
                let result = state[type].list.filter(item => item.id !== value);
                state[type].list = result;
                state.statistic[key[type]].value = result.length;
                state.isFetching = false;
                return state;
            });
        }).catch(err => {
            alert(err.message);
            this.setState({isFetching: false});
        });
    };

    render() {
        return (
            <Dimmer.Dimmable as="div">
                <Dimmer active={this.state.isFetching}>
                    <Loader size='massive'>Loading</Loader>
                </Dimmer>
                <Segment>
                    <Header>총 사용량</Header>
                    <TotalUseStatisticGroup items={this.state.statistic}/>
                </Segment>
                <Segment attached={true}>
                    <TableVariationItem header={<Header>{`자산 ID:${this.state.asset.asset_num}`}</Header>}
                                        description={<AssetTable data={this.state.asset}/>}/>
                    <Header>자산:{this.state.asset.asset_num}에 등록된 장비 목록</Header>
                    <ItemGroup.Server
                        items={this.state.server.list}
                        onDelete={this.handleDeviceDelete.bind(this, "server")}/>
                    <ItemGroup.Storage
                        items={this.state.storage.list}
                        onDelete={this.handleDeviceDelete.bind(this, "storage")}/>
                    <ItemGroup.Switch
                        items={this.state.network.list}
                        onDelete={this.handleDeviceDelete.bind(this, "network")}/>
                    <ItemGroup.Rack
                        items={this.state.rack.list}
                        onDelete={this.handleDeviceDelete.bind(this, "rack")}/>
                    <Confirm
                        open={this.state.isDeleteConfirmOpen}
                        header={<Header><Icon name="warning sign"/> 되돌리기 불가능한 작업</Header>}
                        content="정말로 이 자산을 삭제 하시겠습니까??"
                        cancelButton='취소하기'
                        confirmButton="삭제하기"
                        onCancel={this.handleDeleteCancel}
                        onConfirm={this.handleDeleteConfirm}
                    />
                </Segment>
                <Button.Group attached={"bottom"}>
                    <Button
                        negative={true} content={"삭제하기"} icon='trash' labelPosition='left'
                        onClick={this.handleDelete}
                    />
                    <Button
                        positive={true} content={"목록으로"} icon='list' labelPosition='right'
                        onClick={this.handleDone}
                    />
                </Button.Group>
            </Dimmer.Dimmable>
        );
    }
}

export default AssetConfirm;
