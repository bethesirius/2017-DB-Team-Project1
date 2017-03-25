/**
 * Created by rino0 on 2017-03-25.
 */
import React from "react";
import {Icon, Statistic} from "semantic-ui-react";

const items = [
    {icon: "computer", label: 'CPU(core)', value: '22'},
    {icon: "database", label: 'DISK_SAN(TB)', value: '22'},
    {icon: "database", label: 'DISK_NAS(TB)', value: '22'},
    {icon: "database", label: 'DISK_Total', value: '22'},
    {icon: "disk outline", label: 'TAPE(TB)', value: '22'},
];

class TotalUseStatisticGroup extends React.Component {
    static propTypes = {};
    // static defaultProps = {};
    // static  childContextTypes = {};
    // static contextTypes = {};

    constructor(props) {
        super(props);
        this.state = {};
    }

    // getChildContext() {}
    // componentDidMount(){}
    // componentWillUnmount(){}
    render() {
        const {} = this.props;
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

export default TotalUseStatisticGroup;