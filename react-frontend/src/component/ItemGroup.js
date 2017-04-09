/**
 * Created by rino0 on 2017-04-06.
 */
import React from "react";
import TableVariationItem from "./TableVariationItem";
import {Header, Item, Message, Segment} from "semantic-ui-react";
import ServerTable from "./ServerTable";
import AssetTable from "./AssetTable";
import RackUseStatisticGroup from "./RackUseStatisticGroup";
import ServiceSummaryTable from "./ServiceSummaryTable";

class ItemGroup extends React.Component {
    static propTypes = {
        type: React.PropTypes.string.isRequired,
        items: React.PropTypes.array.isRequired,
        header: React.PropTypes.func,
        description: React.PropTypes.any,
        to: React.PropTypes.string,
    };

    render() {
        const {type, items, description, header, to} = this.props;
        return (
            <Item.Group as={Segment} divided={true}>
                <Header>{`등록된 ${type}` }</Header>
                {items.length > 0
                    ? items.map((item, index) => (
                        <TableVariationItem
                            key={index} header={header ? header(item) : null}
                            description={React.createElement(description, {data: item})}
                            to={`${to}/${item.id}`}
                        />
                    ))
                    : <Message
                        header={`등록된 ${type}가 없습니다!` }
                        content={`자산 메뉴에서 새 자산을 추가하여, ${type}를 등록해 주세요!`}
                    />
                }
            </Item.Group>
        );
    }
}

ItemGroup.Asset = ({items}) => (
    <ItemGroup
        type={"자산"} items={items} description={AssetTable}
        header={item => `자산 ID:${item.id}`} to="/asset"
    />
);
ItemGroup.Server = ({items}) => (
    <ItemGroup
        type={"서버"} items={items} description={ServerTable}
        header={item => item.id}
    />
);
ItemGroup.Switch = ({items}) => (
    <ItemGroup
        type={"스위치"} items={items} description={ServerTable}
        header={item => item.id}
    />
);
ItemGroup.Storage = ({items}) => (
    <ItemGroup
        type={"스토리지"} items={items} description={ServerTable}
        header={item => item.id}
    />
);
ItemGroup.Rack = ({items}) => (
    <ItemGroup
        type={"Rack"} items={items} description={RackUseStatisticGroup}
        header={item => item.id}
    />
);
ItemGroup.Service = ({items}) => (
    <ItemGroup
        type={"서비스"} items={items} description={ServiceSummaryTable}
        header={item => item.id} to="/service"
    />
);
export default ItemGroup;