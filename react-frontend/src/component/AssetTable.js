/**
 * Created by rino0 on 2017-04-07.
 */
import React from "react";
import { Icon, Table } from 'semantic-ui-react'

class AssetTable extends React.Component {
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
        return (
            <Table   celled definition>
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
                        <Table.Cell>2010-07-08</Table.Cell>
                        <Table.Cell textAlign='right'> 224,000,000 </Table.Cell>
                        <Table.Cell textAlign='right'>5</Table.Cell>
                        <Table.Cell textAlign='right'>5</Table.Cell>
                        <Table.Cell textAlign='right'>5</Table.Cell>
                        <Table.Cell textAlign='right'>5</Table.Cell>
                        <Table.Cell textAlign='right'>5</Table.Cell>
                        <Table.Cell textAlign='right'>5</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>자산명</Table.Cell>
                        <Table.Cell colSpan='8'>서버</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>규격</Table.Cell>
                        <Table.Cell colSpan='8'>블레이드 서버</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        );
    }
}

export default AssetTable;