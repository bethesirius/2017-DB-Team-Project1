/**
 * Created by rino0 on 2017-03-25.
 */
import React from "react";
import {Button, Icon, Item, Label} from "semantic-ui-react";
import ServiceSummaryTable from "../component/ServiceSummaryTable";

class TableVariationItem extends React.Component {
    static propTypes = {};
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
            ...others,
        } = this.props;
        return (
            <Item>

                <Item.Content>
                    <Item.Header as='a'>12 Years a Slave</Item.Header>
                    <Item.Meta>
                        <span className='cinema'>Union Square 14</span>
                    </Item.Meta>
                    <Item.Description>
                        <ServiceSummaryTable />
                    </Item.Description>
                    <Item.Extra>
                        <Label>IMAX</Label>
                        <Button primary floated='right'>
                            Buy tickets
                            <Icon name='right chevron'/>
                        </Button>
                        <Label icon='globe' content='Additional Languages'/>
                    </Item.Extra>
                </Item.Content>
            </Item>
        );
    }
}

export default TableVariationItem;