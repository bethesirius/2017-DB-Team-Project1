/**
 * Created by rino0 on 2017-04-06.
 */
import React from "react";
import TableVariationItem from "./TableVariationItem";
import {Header, Item, Message, Segment} from "semantic-ui-react";
import ServerTable from "./ServerTable";

class ServerItemGroup extends React.Component {
    static propTypes = {
        items: React.PropTypes.arrayOf(React.PropTypes.shape({
            id: React.PropTypes.string,
            cpu: React.PropTypes.number,
        })).isRequired,
    };
    // static defaultProps = {};
    // static  childContextTypes = {};
    // static contextTypes = {};

    constructor(props) {
        super(props);
        this.state = {};
    }

    // getChildContext() {}
    // componentDidMount(){}
    // componentWillUnmount(){}
    render() {
        const {items} = this.props;
        return (
            <Item.Group as={Segment} divided={true}>
                <Header>등록된 서버</Header>
                {items.length > 0
                    ? items.map(item => (
                        <TableVariationItem key={item.id} header={item.id} description={<ServerTable data={item}/>}/>
                    ))
                    : <Message
                        header='등록된 서버가 없습니다!'
                        content='자산 메뉴에서 새 자산을 추가하여, 서버를 등록해 주세요!'
                    />
                }
            </Item.Group>
        );
    }
}

export default ServerItemGroup;