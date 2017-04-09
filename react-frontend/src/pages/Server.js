/**
 * Created by rino0 on 2017-03-27.
 */
import React from "react";
import {Header, Segment} from "semantic-ui-react";
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
            items: [
                {asset_id:'00000001', management_id:'S00001', get_date:'2010-01-01', core_num:16, standard:'블레이드 서버', year:5, spec:'IBM BladeCenter HS22 Chassis3', location:'본관 1층 공동서버실-C08'},
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
                <ItemGroup.Server items={items}/>
            </div>
        );
    }
}

export default Server;
