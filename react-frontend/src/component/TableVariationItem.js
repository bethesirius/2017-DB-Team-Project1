/**
 * Created by rino0 on 2017-03-25.
 */
import React from "react";
import {Link} from "react-router";
import {Button, Icon, Item, Label} from "semantic-ui-react";

class TableVariationItem extends React.Component {
    static propTypes = {
        header: React.PropTypes.node,
        description: React.PropTypes.node,
        to: React.PropTypes.string,
        meta: React.PropTypes.array,
        onDelete: React.PropTypes.func,
        iid: React.PropTypes.any,
    };

    render() {
        const {
            to,
            header,
            description,
            meta,
            onDelete, iid,
        } = this.props;
        return (
            <Item>
                <Item.Content>
                    <Item.Header as='a'>{header}</Item.Header>
                    <Item.Description>
                        {description}
                    </Item.Description>
                    <Item.Extra>
                        {meta && meta.map((item, index) => <Label key={index}>{item}</Label>)}
                        {to && <Button as={Link} primary floated='right' to={to}>
                            상세 보기
                            <Icon name='right chevron'/>
                        </Button>}
                        {onDelete &&
                        <Button animated='vertical' negative floated='right' value={iid} onClick={onDelete}>
                            <Button.Content hidden>삭제</Button.Content>
                            <Button.Content visible>
                                <Icon name='trash'/>
                            </Button.Content>
                        </Button>}
                    </Item.Extra>
                </Item.Content>
            </Item>
        );
    }
}

export default TableVariationItem;
