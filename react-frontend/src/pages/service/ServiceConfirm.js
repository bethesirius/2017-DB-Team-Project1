/**
 * Created by rino0 on 2017-03-27.
 */
import React from "react";
import {browserHistory} from "react-router";
import {Button, Confirm, Dimmer, Header, Icon, Loader, Segment} from "semantic-ui-react";
import ItemGroup from "../../component/ItemGroup";
import TableVariationItem from "../../component/TableVariationItem";
import AssetTable from "../../component/AssetTable";

class ServiceConfirm extends React.Component {
    static propTypes = {};


    // static defaultProps = {};
    // static  childContextTypes = {};
    // static contextTypes = {};

    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            isDeleteConfirmOpen: false,
            asset: {},
            server: {list: [],},
            network: {list: [],},
            storage: {list: [],},
            rack: {list: [],}
        };
    }

    // getChildContext() {}
    componentDidMount() {
        this.setState({isFetching: true});
        fetch("/json/asset.json")
            .then(res => res.json())
            .then(json => Promise.all([
                json,
                fetch("/json/asset_name.json").then(res => res.json()),
                fetch("/json/standard.json").then(res => res.json()),
                fetch("/json/buy.json").then(res => res.json())
            ]))
            .then(([asset, name, std, buy]) => {
                const data = {
                    id: asset.asset_num,
                    get_date: asset.get_date,
                    name: name.asset_name,
                    standard: std.standard_name,
                    years: asset.years,
                    price: asset.price,
                    buy: buy.buy_name,
                };
                this.setState({
                    isFetching: false,
                    asset: data,
                });
            })
            .catch(err => {
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

    render() {
        const {params: {id},} = this.props;
        return (
            <Dimmer.Dimmable as="div">
                <Dimmer active={this.state.isFetching}>
                    <Loader size='massive'>Loading</Loader>
                </Dimmer>
                <Segment attached={true}>
                    <TableVariationItem header={id} description={<AssetTable data={this.state.asset}/>}/>
                    <Header>자산:{id}에 등록된 장비 목록</Header>
                    <ItemGroup.Server items={this.state.server.list}/>
                    <ItemGroup.Storage items={this.state.storage.list}/>
                    <ItemGroup.Switch items={this.state.network.list}/>
                    <ItemGroup.Rack items={this.state.rack.list}/>
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

export default ServiceConfirm;
