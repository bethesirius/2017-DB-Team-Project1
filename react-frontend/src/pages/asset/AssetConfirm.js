/**
 * Created by rino0 on 2017-03-27.
 */
import React from "react";
import {browserHistory} from "react-router";
import {Button, Dimmer, Header, Loader, Segment} from "semantic-ui-react";
import ItemGroup from "../../component/ItemGroup";
import TableVariationItem from "../../component/TableVariationItem";
import AssetTable from "../../component/AssetTable";

class AssetDetail extends React.Component {
    static propTypes = {};
    handleDone = (event) => {
        event.preventDefault();
        browserHistory.push(`/asset/`);
    };
    // static defaultProps = {};
    // static  childContextTypes = {};
    // static contextTypes = {};

    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
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
                </Segment>
                <Button.Group attached={"bottom"}>
                    <Button
                        negative={true} content={"삭제하기"} icon='trash' labelPosition='left'
                        onClick={this.handleDone}
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

export default AssetDetail;
