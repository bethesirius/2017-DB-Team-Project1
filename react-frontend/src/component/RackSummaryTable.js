/**
 * Created by rino0 on 2017-03-25.
 */
import React from "react";
import {Table} from "semantic-ui-react";

const statisticShape = React.PropTypes.shape({
    id: React.PropTypes.string,
    size: React.PropTypes.number,
    mounted: React.PropTypes.arrayOf(React.PropTypes.shape({
        id: React.PropTypes.string,
        size: React.PropTypes.number,
        mount_lv: React.PropTypes.number,
        ip: React.PropTypes.string,
    })),
});

class RackSummaryTable extends React.Component {
    static propTypes = {
        data: statisticShape,
    };
    static defaultProps = {
        data: {
            id: 'R00000',
            size: 46,
            mounted: [{
                id: 'S00000',
                size: 2,
                mount_lv: 1,
                ip: '0.0.0.0',
            }],
        },
    };
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
        const {data} = this.props;
        return (
            <Table definition>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={2}>Lv</Table.HeaderCell>
                        <Table.HeaderCell>IP</Table.HeaderCell>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                    </Table.Row>
                    {Array.from(new Array(data.size).keys()).map((i) => (
                        <Table.Row key={i}>
                            <Table.Cell>{i + 1}</Table.Cell>
                            <Table.Cell></Table.Cell>
                            <Table.Cell></Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Header>
            </Table>
        );
    }
}

export default RackSummaryTable;
