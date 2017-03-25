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
                    <Item.Header as='a'>{this.props.header}</Item.Header>
                    <Item.Meta>
                        <span className='cinema'>{this.props.description}</span>
                    </Item.Meta>
                    <Item.Description>
                        {this.props.view}
                    </Item.Description>
                    <Item.Extra>
                    </Item.Extra>
                </Item.Content>
            </Item>
        );
    }
}

export default TableVariationItem;
