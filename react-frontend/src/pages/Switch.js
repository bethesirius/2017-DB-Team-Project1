/**
 * Created by rino0 on 2017-03-27.
 */
import React from "react";
import {Header, Segment} from "semantic-ui-react";
import TotalUseStatisticGroup from "../component/TotalUseStatisticGroup";
import ItemGroup from "../component/ItemGroup";

class Switch extends React.Component {
    static propTypes = {};
    // static defaultProps = {};
    // static  childContextTypes = {};
    // static contextTypes = {};

    constructor(props) {
        super(props);
        this.state = {
            items: [
                {id: 1, ip: "1.2.3.4"},
                {id: 2, ip: "2.3.4.5"},
                {id: 3, ip: "3.4.5.6"},
                {id: 4, ip: "4.5.6.7"},
                {id: 5, ip: "5.6.7.8"},
            ],
        };
    }

    // getChildContext() {}
    // componentDidMount(){}
    // componentWillUnmount(){}
    render() {
        const {items} = this.state;
        return (
            <div>
                <Segment>
                    <Header>총 사용량</Header>
                    <TotalUseStatisticGroup />
                </Segment>
                <ItemGroup.Switch items={items}/>
            </div>
        );
    }
}

export default Switch;
