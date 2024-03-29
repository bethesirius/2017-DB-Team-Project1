/**
 * Created by rino0 on 2017-03-25.
 */
import React from "react";
import {Table} from "semantic-ui-react";

class ServerTable extends React.Component {
    static propTypes = {
        data: React.PropTypes.shape({
            "asset": React.PropTypes.shape({
                "asset_name_id": React.PropTypes.any,
                "asset_num": React.PropTypes.any,
                "buy": React.PropTypes.any,
                "get_date": React.PropTypes.any,
                "id": React.PropTypes.any,
                "price": React.PropTypes.any,
                "standard_id": React.PropTypes.any,
                "years": React.PropTypes.any,
            }),
            "asset_id": React.PropTypes.any,
            "device": React.PropTypes.shape({
                "asset_id": React.PropTypes.any,
                "id": React.PropTypes.any,
                "manage_num": React.PropTypes.any,
            }),
            "id": React.PropTypes.any,
            "manage_num": React.PropTypes.any,
            "spec": React.PropTypes.shape({
                "spec": React.PropTypes.any,
            }),
            "spec_id": React.PropTypes.any,
            "rack_size": React.PropTypes.any,
        })
    };

    render() {
        let {
            data: {asset, manage_num, spec, rack_size},
        } = this.props;
        let asset_num = asset && asset.asset_num;
        let get_date = asset && asset.get_date;
        let years = asset && asset.years;
        spec = spec && spec.spec;
        return (
            <Table definition>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell />
                        <Table.HeaderCell>자산번호</Table.HeaderCell>
                        <Table.HeaderCell>관리번호</Table.HeaderCell>
                        <Table.HeaderCell>사이즈</Table.HeaderCell>
                        <Table.HeaderCell>내용연수</Table.HeaderCell>
                        <Table.HeaderCell>취득일</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row>
                        <Table.Cell>기본 정보</Table.Cell>
                        <Table.Cell>{asset_num}</Table.Cell>
                        <Table.Cell>{manage_num}</Table.Cell>
                        <Table.Cell>{rack_size}</Table.Cell>
                        <Table.Cell>{years}</Table.Cell>
                        <Table.Cell>{get_date}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>규격</Table.Cell>
                        <Table.Cell colSpan='5'>{spec}</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        );
    }
}

export default ServerTable;
