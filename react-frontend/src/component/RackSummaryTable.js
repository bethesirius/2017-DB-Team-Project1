/**
 * Created by rino0 on 2017-03-25.
 */
import React from "react";
import {Table} from "semantic-ui-react";

const statisticShape = React.PropTypes.shape({
    id: React.PropTypes.string,
    size: React.PropTypes.number,
    servers: React.PropTypes.number,
    storages: React.PropTypes.number,
    networks: React.PropTypes.number,
    emptys: React.PropTypes.number,
    mounted: React.PropTypes.arrayOf(React.PropTypes.shape({
        assetId: React.PropTypes.string,
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
            servers: 5,
            storages: 10,
            networks: 1,
            emptys: 20,
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
        const {data: {size, mounted}} = this.props;
        let no_row=0;
        return (
            <Table definition>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={2}>Lv</Table.HeaderCell>
                        <Table.HeaderCell>IP</Table.HeaderCell>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                    </Table.Row>
                    {Array.from(new Array(size).keys()).reverse().map((i) => {
                        const unit= mounted.filter( (x) => x.mount_lv=== i+1)[0];
                        if(unit){
                            no_row= unit.size;
                        }
                        no_row--;
                        return (<Table.Row key={i}>
                            <Table.Cell>{i + 1}</Table.Cell>
                            { (unit||no_row<0) && <Table.Cell rowSpan={unit?unit.size:1}>{unit?unit.assetId:null}</Table.Cell>}
                            { (unit||no_row<0) && <Table.Cell rowSpan={unit?unit.size:1}>{unit?unit.ip:null}</Table.Cell>}
                        </Table.Row>)
                    })}
                </Table.Header>
            </Table>
        );
    }
}

export default RackSummaryTable;
