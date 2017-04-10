/**
 * Created by rino0 on 2017-03-27.
 */
import React from "react";
import {Dimmer, Header, Loader, Segment} from "semantic-ui-react";
import TotalUseStatisticGroup from "../component/TotalUseStatisticGroup";
import ItemGroup from "../component/ItemGroup";

class Server extends React.Component {
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
                {icon: "server", label: '서버 수', value: 0},
                {icon: "microchip", label: 'CPU(core)', value: 0},
            ]
        };
    }

    // getChildContext() {}
    componentDidMount() {
        this.setState({isFetching: true});
        fetch("/api/server").then(res => res.json()).then(message => {
            this._updateState(message.objects);
        }).catch(err => {
            alert(err.message);
            this.setState({isFetching: false});
        });
    }

    _updateState(items) {
        let serverCount = items.length;
        let cpuCount = items.reduce((prev, current) => {
            return prev + current.core_num;
        }, 0);
        this.setState((state, props) => {
            state.statistic[0].value = serverCount;
            state.statistic[1].value = cpuCount;
            state.items = items;
            state.isFetching = false;
            return state;
        });
    }

    handleDelete = (e, {value}) => {
        this.setState({isFetching: true});
        fetch(`/api/server/${value}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"}
        }).then(res => {
            this._updateState(this.state.items.filter(item => item.id !== value));
        }).catch(err => {
            alert(err.message);
            this.setState({isFetching: false});
        });
    };

    // componentWillUnmount(){}
    render() {
        const {items} = this.state;
        return (
            <Dimmer.Dimmable as="div">
                <Dimmer active={this.state.isFetching}>
                    <Loader size='massive'>Loading</Loader>
                </Dimmer>
                <Segment>
                    <Header>총 사용량</Header>
                    <TotalUseStatisticGroup items={this.state.statistic}/>
                </Segment>
                <ItemGroup.Server items={items} onDelete={this.handleDelete}/>
            </Dimmer.Dimmable>
        );
    }
}

export default Server;
