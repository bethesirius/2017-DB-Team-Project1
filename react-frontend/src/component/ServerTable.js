/**
 * Created by rino0 on 2017-03-25.
 */
import React from "react";
import {Table} from "semantic-ui-react";

class ServerTable extends React.Component {
    static propTypes = {
        data: React.PropTypes.shape({
            asset_id: React.PropTypes.string,
            management_id: React.PropTypes.string,
            get_date: React.PropTypes.string,
            core_num: React.PropTypes.number,
            standard: React.PropTypes.string,
            year: React.PropTypes.number,
            spec: React.PropTypes.string,
            location: React.PropTypes.string,
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
            data: {asset_id, management_id, get_date, core_num, standard, year, spec, location},
        } = this.props;
        return (
            <Table definition>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell />
                        <Table.HeaderCell>자산번호</Table.HeaderCell>
                        <Table.HeaderCell>관리번호</Table.HeaderCell>
                        <Table.HeaderCell>취득일</Table.HeaderCell>
                        <Table.HeaderCell>Core</Table.HeaderCell>
                        <Table.HeaderCell>규격</Table.HeaderCell>
                        <Table.HeaderCell>내용연수</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row>
                        <Table.Cell>기본 정보</Table.Cell>
                        <Table.Cell>{asset_id}</Table.Cell>
                        <Table.Cell>{management_id}</Table.Cell>
                        <Table.Cell>{get_date}</Table.Cell>
                        <Table.Cell>{core_num}</Table.Cell>
                        <Table.Cell>{standard}</Table.Cell>
                        <Table.Cell>{year}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>관리스펙</Table.Cell>
                        <Table.Cell colSpan='6'>{spec}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>현재위치</Table.Cell>
                        <Table.Cell colSpan='6'>{location}</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        );
    }
}

export default ServerTable;
