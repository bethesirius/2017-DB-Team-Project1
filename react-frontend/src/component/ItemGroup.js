/**
 * Created by rino0 on 2017-04-06.
 */
import React from "react";
import TableVariationItem from "./TableVariationItem";
import {Header, Item, Message, Segment} from "semantic-ui-react";
import ServerTable from "./ServerTable";
import ServiceSummaryTable from "./ServiceSummaryTable";

class ItemGroup extends React.Component {
    static propTypes = {
        type: React.PropTypes.string.isRequired,
        header: React.PropTypes.func,
        items: React.PropTypes.array.isRequired,
        description: React.PropTypes.any,
    };

    render() {
        const {type, items, description, header} = this.props;
        return (
            <Item.Group as={Segment} divided={true}>
                <Header>{`등록된 ${type}` }</Header>
                {items.length > 0
                    ? items.map((item, index) => (
                        <TableVariationItem
                            key={index} header={header ? header(item) : null}
                            description={React.createElement(description, {data: item})}
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

ItemGroup.Server = ({items}) => (
    <ItemGroup
        type={"서버"} items={items} description={ServerTable}
        header={item => item.id}
    />
);
ItemGroup.Service = ({items}) => (
    <ItemGroup
        type={"서비스"} items={items} description={ServiceSummaryTable}
        header={item => item.id}
    />
);
export default ItemGroup;