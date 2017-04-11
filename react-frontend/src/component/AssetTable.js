/**
 * Created by rino0 on 2017-04-07.
 */
import React from "react";
import {Table} from "semantic-ui-react";

class AssetTable extends React.Component {
    static propTypes = {
        data: React.PropTypes.shape({
            "asset_name": React.PropTypes.shape({
                "asset_name": React.PropTypes.any,
                "id": React.PropTypes.any,
            }),
            "asset_name_id": React.PropTypes.any,
            "asset_num": React.PropTypes.any,
            "buy": React.PropTypes.any,
            "buy_": React.PropTypes.shape({
                "buy_name": React.PropTypes.any,
                "id": React.PropTypes.any,
            }),
            "get_date": React.PropTypes.any,
            "id": React.PropTypes.any,
            "price": React.PropTypes.any,
            "standard": React.PropTypes.shape({
                "id": React.PropTypes.any,
                "standard_name": React.PropTypes.any,
            }),
            "standard_id": React.PropTypes.any,
            "years": React.PropTypes.any,
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
        let {
            data: {asset_name, asset_num, buy_, get_date, price, standard, years}
        } = this.props;
        asset_name = asset_name && asset_name.asset_name;
        buy_ = buy_ && buy_.buy_name;
        standard = standard && standard.standard_name;
        return (
            <Table celled definition>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>{asset_num}</Table.HeaderCell>
                        <Table.HeaderCell>취득원가</Table.HeaderCell>
                        <Table.HeaderCell>내용연수</Table.HeaderCell>
                        <Table.HeaderCell>취득일</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row>
                        <Table.Cell>기본 정보</Table.Cell>
                        <Table.Cell textAlign='right'> {price} </Table.Cell>
                        <Table.Cell textAlign='right'>{years}</Table.Cell>
                        <Table.Cell>{get_date}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>자산명</Table.Cell>
                        <Table.Cell colSpan='3'>{asset_name}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>규격</Table.Cell>
                        <Table.Cell colSpan='3'>{standard}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>구입처</Table.Cell>
                        <Table.Cell colSpan='3'>{buy_}</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        );
    }
}

export default AssetTable;