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
        };
    }

    // getChildContext() {}
    componentDidMount() {
        this.setState({isFetching: true});
        fetch("/api/server").then(res => res.json()).then(message => {
            this.setState({
                isFetching: false,
                items: message.objects,
            });
        });
    }

    handleDelete = (e, {value}) => {
        this.setState({isFetching: true});
        fetch(`/api/server/${value}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"}
        }).then(res => {
            this.setState({
                isFetching: false,
                items: this.state.items.filter(item => item.id !== value),
            });
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
                    <TotalUseStatisticGroup />
                </Segment>
                <ItemGroup.Server items={items} onDelete={this.handleDelete}/>
            </Dimmer.Dimmable>
        );
    }
}

export default Server;
