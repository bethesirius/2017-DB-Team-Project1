/**
 * Created by rino0 on 2017-03-25.
 */
import React from "react";
import {Table} from "semantic-ui-react";

class ServerTable extends React.Component {
    // const {id, device, core_num, spec_id, spec, location_id, location,} = message;
    static propTypes = {
        temp: {
            "rack_size": 42,
            "spec": {
                "id": 2,
                "spec": "DELL"
            },
            "spec_id": 2
        },
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
            "location": React.PropTypes.shape({
                "id": React.PropTypes.any,
                "location": React.PropTypes.any,
            }),
            "location_id": React.PropTypes.any,
            "manage_num": React.PropTypes.any,
            "spec": React.PropTypes.shape({
                "disk_spec": React.PropTypes.any,
                "disk_type_id": React.PropTypes.any,
                "id": React.PropTypes.any,
                "spec_id": React.PropTypes.any,
                "volume": React.PropTypes.any,
            }),
            "spec_id": React.PropTypes.any,
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
        let {
            data: {asset, manage_num, location, spec},
        } = this.props;
        let asset_num = asset && asset.asset_num;
        let get_date = asset && asset.get_date;
        let years = asset && asset.years;
        let volume = spec && spec.volume;
        let disk_spec = spec && spec.disk_spec;
        location = location && location.location;
        return (
            <Table definition>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell />
                        <Table.HeaderCell>자산번호</Table.HeaderCell>
                        <Table.HeaderCell>관리번호</Table.HeaderCell>
                        <Table.HeaderCell>할당 단위(GB)</Table.HeaderCell>
                        <Table.HeaderCell>내용연수</Table.HeaderCell>
                        <Table.HeaderCell>취득일</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row>
                        <Table.Cell>기본 정보</Table.Cell>
                        <Table.Cell>{asset_num}</Table.Cell>
                        <Table.Cell>{manage_num}</Table.Cell>
                        <Table.Cell>{volume}</Table.Cell>
                        <Table.Cell>{years}</Table.Cell>
                        <Table.Cell>{get_date}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>디스크 사양</Table.Cell>
                        <Table.Cell colSpan='5'>{disk_spec}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>위치</Table.Cell>
                        <Table.Cell colSpan='5'>{location}</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        );
    }
}

export default ServerTable;
