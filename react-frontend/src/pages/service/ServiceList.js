/**
 * Created by rino0 on 2017-03-27.
 */
import React from "react";
import {Button, Dimmer, Header, Loader, Segment} from "semantic-ui-react";
import {Link} from "react-router";
import ItemGroup from "../../component/ItemGroup";
import TotalUseStatisticGroup from "../../component/TotalUseStatisticGroup";

const items = [
    {icon: "computer", label: 'CPU(core)', value: '22'},
    {icon: "database", label: 'DISK_SAN(TB)', value: '22'},
    {icon: "database", label: 'DISK_NAS(TB)', value: '22'},
    {icon: "database", label: 'DISK_Total', value: '22'},
    {icon: "disk outline", label: 'TAPE(TB)', value: '22'},
];

const temp = {
    id: "test_id",
    service: {
        cpu: -1,
        san: -1,
        nas: -1,
        total: -1,
        tape: -1,
    },
    not: {
        cpu: -1,
        san: -1,
        nas: -1,
        total: -1,
        tape: -1,
    }
};

const tempF = () => {
    return fetch("/json/asset.json")
        .then(res => res.json())
        .then(json => Promise.all([
            json,
            fetch("/json/asset_name.json").then(res => res.json()),
            fetch("/json/standard.json").then(res => res.json()),
            fetch("/json/buy.json").then(res => res.json())
        ]))
        .then(([asset, name, std, buy]) => {
            return {
                id: asset.asset_num,
                get_date: asset.get_date,
                name: name.asset_name,
                standard: std.standard_name,
                years: asset.years,
                price: asset.price,
                buy: buy.buy_name,
            };
        });
};

class ServerList extends React.Component {
    static propTypes = {};
    // static defaultProps = {};
    // static  childContextTypes = {};
    // static contextTypes = {};

    constructor(props) {
        super(props);
        this.state = {
            items: [],
        };
    }

    // getChildContext() {}
    componentDidMount() {
        this.setState({isFetching: true});
        fetch("/json/asset_list.json").then(res => res.json()).then(json => {
            const {objects} = json;
            const assetF = tempF.bind(this);
            Promise.all(objects.map(i => assetF())).then(lists => this.setState({
                isFetching: false,
                items: lists,
            }));
        })
    }

    // componentWillUnmount(){}
    render() {
        return (
            <Dimmer.Dimmable as="div">
                <Dimmer active={this.state.isFetching}>
                    <Loader size='massive'>Loading</Loader>
                </Dimmer>
                <Segment attached={true}>
                    <Header>총 사용량</Header>
                    <TotalUseStatisticGroup items={items}/>
                    <Header>잔여 자원</Header>
                    <TotalUseStatisticGroup items={items}/>
                </Segment>
                <Button.Group attached='bottom'>
                    <Button as={Link} to="/service/form" primary={true} icon="add" labelPosition='left'
                            content={"새 서비스 등록 하기"}/>
                </Button.Group>
                <ItemGroup.Service items={[temp, temp, temp]}/>
            </Dimmer.Dimmable>
        );
    }
}



export default ServerList;