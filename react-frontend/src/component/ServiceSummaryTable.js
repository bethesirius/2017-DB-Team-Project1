/**
 * Created by rino0 on 2017-03-25.
 */
import React from "react";
import {Table} from "semantic-ui-react";

const statisticShape = React.PropTypes.shape({
    cpu: React.PropTypes.number,
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
                        <Table.Cell>{service.cpu}</Table.Cell>
                        <Table.Cell>{service.san}</Table.Cell>
                        <Table.Cell>{service.nas}</Table.Cell>
                        <Table.Cell>{service.total}</Table.Cell>
                        <Table.Cell>{service.tape}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Not Service</Table.Cell>
                        <Table.Cell>{not.cpu}</Table.Cell>
                        <Table.Cell>{not.san}</Table.Cell>
                        <Table.Cell>{not.nas}</Table.Cell>
                        <Table.Cell>{not.total}</Table.Cell>
                        <Table.Cell>{not.tape}</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        );
    }
}

export default ServiceSummaryTable;
