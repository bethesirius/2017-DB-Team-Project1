/**
 * Created by rino0 on 2017-03-25.
 */
import React from "react";
import {Icon, Statistic} from "semantic-ui-react";

class RackUseStatisticGroup extends React.Component {
    static propTypes = {
        data: React.PropTypes.shape({
            servers: React.PropTypes.number,
            storages: React.PropTypes.number,
            networks: React.PropTypes.number,
            emptys: React.PropTypes.number,
        }),
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    // getChildContext() {}
    // componentDidMount(){}
    // componentWillUnmount(){}
    render() {
        const {data:{servers, storages, networks, emptys}} = this.props;
        return (
            <Statistic.Group>
                <Statistic>
                    <Statistic.Value>
                        <Icon name='server'/>
                        {servers}
                    </Statistic.Value>
                </Statistic>
                <Statistic>
                    <Statistic.Value>
                        <Icon name='database'/>
                        {storages}
                    </Statistic.Value>
                </Statistic>
                <Statistic>
                    <Statistic.Value>
                        <Icon name='move'/>
                        {networks}
                    </Statistic.Value>
                </Statistic>
                <Statistic>
                    <Statistic.Value>
                        <Icon name='add'/>
                        {emptys}
                    </Statistic.Value>
                </Statistic>
            </Statistic.Group>
        );
    }
}

export default RackUseStatisticGroup;
