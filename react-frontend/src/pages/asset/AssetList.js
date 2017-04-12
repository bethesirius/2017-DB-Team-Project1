/**
 * Created by rino0 on 2017-03-27.
 */
import React from "react";
import {Button, Dimmer, Header, Loader, Segment} from "semantic-ui-react";
import {Link} from "react-router";
import ItemGroup from "../../component/ItemGroup";
import TotalUseStatisticGroup from "../../component/TotalUseStatisticGroup";
import {format} from "currency-formatter";

class AssetList extends React.Component {
    static propTypes = {};
    // static defaultProps = {};
    // static  childContextTypes = {};
    // static contextTypes = {};

    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            items: [],
            statistic: [
                {icon: "server", label: '자산 종류 수', value: 0},
                {icon: "won", label: '총 금액', value: 0},
            ]
        };
    }

    // getChildContext() {}
    componentDidMount() {
        this.setState({isFetching: true});
        Promise.delay(1400).then(() => fetch("/api/asset").then(res => res.ok ? res.json() : Promise.reject(new Error("서버에서 요청을 거절 했습니다.")))
            .then(message => {
                this._updateState(message.objects);
            })).catch(err => {
            alert(err.message);
            this.setState({isFetching: false});
        });
    }

    _updateState(items) {
        let assetCount = items.length;
        let totalPriceSum = items.reduce((prev, current) => {
            return prev + current.price;
        }, 0);
        this.setState((state, props) => {
            state.statistic[0].value = assetCount;
            state.statistic[1].value = format(totalPriceSum, {code: "WON", precision: 0}).substring(1);
            state.items = items;
            state.isFetching = false;
            return state;
        });
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
                    <TotalUseStatisticGroup items={this.state.statistic}/>
                </Segment>
                <Button.Group attached='bottom'>
                    <Button as={Link} to="/asset/form" primary={true} icon="add" labelPosition='left'
                            content={"새 자산 등록 하기"}/>
                </Button.Group>
                <ItemGroup.Asset items={this.state.items}/>
            </Dimmer.Dimmable>
        );
    }
}

export default AssetList;