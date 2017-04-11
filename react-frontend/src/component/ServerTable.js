/**
 * Created by rino0 on 2017-03-25.
 */
import React from "react";
import {Radio, Table} from "semantic-ui-react";

class ServerTable extends React.Component {
    // const {id, device, core_num, spec_id, spec, location_id, location,} = message;
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
            "core_num": React.PropTypes.any,
            "device": React.PropTypes.shape({
                "asset_id": React.PropTypes.any,
                "id": React.PropTypes.any,
                "manage_num": React.PropTypes.any,
            }),
            "id": React.PropTypes.any,
            "location": React.PropTypes.any,
            "location_id": React.PropTypes.any,
            "manage_num": React.PropTypes.any,
            "size": React.PropTypes.any,
            "spec": React.PropTypes.any,
            "spec_id": React.PropTypes.any,
            "on": React.PropTypes.any,
        })
    };
    handlePower = (e) => {
        let path = "server";
        fetch(`/api/${path}/${this.props.data.id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({on: !this.state.checked}),
        }).then(res => res.ok ? res.json() : Promise.reject(new Error("서버에서 요청을 거절 했습니다."))
        ).then(json => {
            this.setState({
                checked: json.on
            });
        });
    };
    // static defaultProps = {};
    // static  childContextTypes = {};
    // static contextTypes = {};

    constructor(props) {
        super(props);
        this.state = {
            checked: props.data.on,
        };
    }

    // getChildContext() {}
    // componentDidMount(){}
    // componentWillUnmount(){}

    render() {
        let {
            data: {asset, manage_num, core_num, spec,},
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
                        <Table.HeaderCell>Core</Table.HeaderCell>
                        <Table.HeaderCell>내용연수</Table.HeaderCell>
                        <Table.HeaderCell>취득일</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row>
                        <Table.Cell>기본 정보</Table.Cell>
                        <Table.Cell>{asset_num}</Table.Cell>
                        <Table.Cell>{manage_num}</Table.Cell>
                        <Table.Cell>{core_num}</Table.Cell>
                        <Table.Cell>{years}</Table.Cell>
                        <Table.Cell>{get_date}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>관리스펙</Table.Cell>
                        <Table.Cell colSpan='5'>{spec}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>장치 전원</Table.Cell>
                        <Table.Cell colSpan='5'>
                            <Radio toggle={true} checked={this.state.checked} onClick={this.handlePower}/>
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        );
    }
}

export default ServerTable;
