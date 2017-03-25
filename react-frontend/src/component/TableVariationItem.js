/**
 * Created by rino0 on 2017-03-25.
 */
import React from "react";
import {Link} from "react-router";
import {Button, Icon, Item} from "semantic-ui-react";

class TableVariationItem extends React.Component {
    static propTypes = {
        header: React.PropTypes.string,
        description: React.PropTypes.node,
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
        const {
            to,
            header,
            description,
        } = this.props;
        return (
            <Item>
                <Item.Content>
                    <Item.Header as='a'>{header}</Item.Header>
                    <Item.Description>
                        {description}
                    </Item.Description>
                    {to && <Item.Extra>
                        <Button as={Link} primary floated='right' to={to}>
                            Show Detail
                            <Icon name='right chevron'/>
                        </Button>
                    </Item.Extra>}
                </Item.Content>
            </Item>
        );
    }
}

export default TableVariationItem;
