/**
 * Created by rino0 on 2017-03-27.
 */
import React from "react";
import {Dimmer, Header, Loader, Segment} from "semantic-ui-react";
import TotalUseStatisticGroup from "../component/TotalUseStatisticGroup";
import ItemGroup from "../component/ItemGroup";

class Storage extends React.Component {
    static propTypes = {};

    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            items: [],
            statistic: [
                {icon: "server", label: '스토리지 수', value: 0},
            ]
        };
    }

    componentDidMount() {
        this.setState({isFetching: true});
        Promise.delay(1400).then(() => fetch("/api/storage").then(res => res.ok ? res.json() : Promise.reject(new Error("서버에서 요청을 거절 했습니다.")))
            .then(message => {
                this._updateState(message.objects);
            })).catch(err => {
            alert(err.message);
            this.setState({isFetching: false});
        });
    }

    _updateState(items) {
        let storageCount = items.length;
        this.setState((state, props) => {
            state.statistic[0].value = storageCount;
            state.items = items;
            state.isFetching = false;
            return state;
        });
    }

    handleDelete = (e, {value}) => {
        this.setState({isFetching: true});
        fetch(`/api/storage/${value}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"}
        }).then(res => {
            this._updateState(this.state.items.filter(item => item.id !== value));
        }).catch(err => {
            alert(err.message);
            this.setState({isFetching: false});
        });
    };

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
                <ItemGroup.Storage items={items} onDelete={this.handleDelete}/>
            </Dimmer.Dimmable>
        );
    }
}

export default Storage;