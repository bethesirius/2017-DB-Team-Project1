/**
 * Created by rino0 on 2017-03-27.
 */
import React from "react";
import {browserHistory} from "react-router";
import {Button, Header, Segment} from "semantic-ui-react";
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
            server: {list: [],},
            network: {list: [],},
            storage: {list: [],},
            rack: {list: [],}
        };
    }

    // getChildContext() {}
    // componentDidMount(){}
    // componentWillUnmount(){}

    render() {
        const {params: {id},} = this.props;
        return (
            <div>
                <Segment attached={true}>
                    <TableVariationItem header={id} description={<AssetTable />}/>
                    <Header>자산:{id}에 등록된 장비 목록</Header>
                    <ItemGroup.Server items={this.state.server.list}/>
                    <ItemGroup.Storage items={this.state.storage.list}/>
                    <ItemGroup.Switch items={this.state.network.list}/>
                    <ItemGroup.Rack items={this.state.rack.list}/>
                </Segment>
                <Button.Group attached={"bottom"}>
                    <Button
                        secondary={true} content={"취소하기"} icon='right arrow' labelPosition='right'
                        onClick={this.handleDone}
                    />
                    <Button
                        primary={true} content={"다음으로"} icon='right arrow' labelPosition='right'
                        onClick={this.handleDone}
                    />
                </Button.Group>
            </div>
        );
    }
}

export default AssetDetail;
