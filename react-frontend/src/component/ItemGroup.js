/**
 * Created by rino0 on 2017-04-06.
 */
import React from "react";
import TableVariationItem from "./TableVariationItem";
import {Header, Item, Message, Segment} from "semantic-ui-react";
import ServerTable from "./ServerTable";

class ItemGroup extends React.Component {
    static propTypes = {
        type: React.PropTypes.string.isRequired,
        items: React.PropTypes.array.isRequired,
        description: React.PropTypes.node.isRequired,
    };

    render() {
        const {type, items, description} = this.props;
        return (
            <Item.Group as={Segment} divided={true}>
                <Header>{`등록된 ${type}` }</Header>
                {items.length > 0
                    ? items.map(item => (
                        <TableVariationItem key={item.id} header={item.id}
                                            description={React.createElement(description, {data: item})}/>
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

ItemGroup.Server = ({items}) => (<ItemGroup type={"서버"} items={items} description={ServerTable}/>);
export default ItemGroup;