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
                {
                    asset_id: '00000001',
                    management_id: 'N00001',
                    get_date: '2010-01-01',
                    standard: '허브센터용 저장장치',
                    year: 5,
                    spec: 'NEXUS 5548P 2011년',
                    location: '본관 1층 제2전산실-R04'
                },
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
