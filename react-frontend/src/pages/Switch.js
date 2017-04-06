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
                {id: 1, cpu: 16},
                {id: 2, cpu: 8},
                {id: 3, cpu: 4},
                {id: 4, cpu: 2},
                {id: 5, cpu: 1},
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