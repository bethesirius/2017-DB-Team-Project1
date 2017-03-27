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
        const items = [
            {icon: "server", label: 'SERVER', value: servers},
            {icon: "database", label: 'STORAGE', value: storages},
            {icon: "move", label: 'NETWORK', value: networks},
            {icon: "add", label: 'EMPTY', value: emptys},
        ];
        return (
            <Statistic.Group>
                {items.map((item, index) => (
                    <Statistic key={item.label}>
                        <Statistic.Value>
                            <Icon name={item.icon}/>
                            {item.value}
                        </Statistic.Value>
                        <Statistic.Label>{item.label}</Statistic.Label>
                    </Statistic>
                ))}
            </Statistic.Group>
        );
    }
}

export default RackUseStatisticGroup;
