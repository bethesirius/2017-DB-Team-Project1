/**
 * Created by rino0 on 2017-03-25.
 */
import React from "react";
import {Table} from "semantic-ui-react";

class ServerTable extends React.Component {
    static propTypes = {
        data: React.PropTypes.shape({
            id: React.PropTypes.node,
            ip: React.PropTypes.node,
        })
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
            data: {id, ip},
        } = this.props;
        return (
            <Table definition>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell />
                        <Table.HeaderCell>ManagementID</Table.HeaderCell>
                        <Table.HeaderCell>IP</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row>
                        <Table.Cell>VALUE</Table.Cell>
                        <Table.Cell>{id}</Table.Cell>
                        <Table.Cell>{ip}</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        );
    }
}

export default ServerTable;
