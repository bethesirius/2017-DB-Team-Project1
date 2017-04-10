/**
 * Created by rino0 on 2017-04-07.
 */
import React from "react";
import {Table} from "semantic-ui-react";

class AssetTable extends React.Component {
    static propTypes = {
        data: React.PropTypes.shape({
            id: React.PropTypes.any,
            get_date: React.PropTypes.any,
            name: React.PropTypes.any,
            standard: React.PropTypes.any,
            years: React.PropTypes.any,
            price: React.PropTypes.any,
            buy: React.PropTypes.any,
        }),
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
            data: {get_date, name, standard, years, price, buy,}
        } = this.props;
        return (
            <Table celled definition>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell />
                        <Table.HeaderCell>취득일</Table.HeaderCell>
                        <Table.HeaderCell>취득원가</Table.HeaderCell>
                        <Table.HeaderCell>내용연수</Table.HeaderCell>
                        <Table.HeaderCell width="1">Server</Table.HeaderCell>
                        <Table.HeaderCell width="1">Switch</Table.HeaderCell>
                        <Table.HeaderCell width="1">Storage</Table.HeaderCell>
                        <Table.HeaderCell width="1">Rack</Table.HeaderCell>
                        <Table.HeaderCell width="1">Total</Table.HeaderCell>
                    </Table.Row>
                    <Table.Row>

                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row>
                        <Table.Cell>기본 정보</Table.Cell>
                        <Table.Cell>{get_date}</Table.Cell>
                        <Table.Cell textAlign='right'> {price} </Table.Cell>
                        <Table.Cell textAlign='right'>{years}</Table.Cell>
                        <Table.Cell textAlign='right'>5</Table.Cell>
                        <Table.Cell textAlign='right'>5</Table.Cell>
                        <Table.Cell textAlign='right'>5</Table.Cell>
                        <Table.Cell textAlign='right'>5</Table.Cell>
                        <Table.Cell textAlign='right'>5</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>자산명</Table.Cell>
                        <Table.Cell colSpan='8'>{name}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>규격</Table.Cell>
                        <Table.Cell colSpan='8'>{standard}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>구입처</Table.Cell>
                        <Table.Cell colSpan='8'>{buy}</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        );
    }
}

export default AssetTable;