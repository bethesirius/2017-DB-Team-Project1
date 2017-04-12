/**
 * Created by rino0 on 2017-03-25.
 */
import React from "react";
import {Table} from "semantic-ui-react";

const statisticShape = React.PropTypes.shape({
    core_num: React.PropTypes.number,
    san: React.PropTypes.number,
    nas: React.PropTypes.number,
    total: React.PropTypes.number,
    tape: React.PropTypes.number,
});

class ServiceSummaryTable extends React.Component {
    static propTypes = {
        data: React.PropTypes.shape({
            service: statisticShape,
            not: statisticShape,
        })
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
        const {
            data: {service, not},
        } = this.props;
        return (
            <Table definition>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell />
                        <Table.HeaderCell>CPU(Core)</Table.HeaderCell>
                        <Table.HeaderCell>DISK_SAN(TB)</Table.HeaderCell>
                        <Table.HeaderCell>DISK_NAS(TB)</Table.HeaderCell>
                        <Table.HeaderCell>DISK_Total(TB)</Table.HeaderCell>
                        <Table.HeaderCell>TAPE(TB)</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row>
                        <Table.Cell>On Service</Table.Cell>
                        <Table.Cell>{service.core_num}</Table.Cell>
                        <Table.Cell>{service.san.toFixed(3)}</Table.Cell>
                        <Table.Cell>{service.nas.toFixed(3)}</Table.Cell>
                        <Table.Cell>{service.total.toFixed(3)}</Table.Cell>
                        <Table.Cell>{service.tape.toFixed(3)}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Not Service</Table.Cell>
                        <Table.Cell>{not.core_num}</Table.Cell>
                        <Table.Cell>{not.san.toFixed(3)}</Table.Cell>
                        <Table.Cell>{not.nas.toFixed(3)}</Table.Cell>
                        <Table.Cell>{not.total.toFixed(3)}</Table.Cell>
                        <Table.Cell>{not.tape.toFixed(3)}</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        );
    }
}

export default ServiceSummaryTable;
