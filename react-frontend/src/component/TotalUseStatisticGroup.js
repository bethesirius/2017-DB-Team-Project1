/**
 * Created by rino0 on 2017-03-25.
 */
import React from "react";
import {Icon, Statistic} from "semantic-ui-react";

class TotalUseStatisticGroup extends React.Component {
    static propTypes = {
        items: React.PropTypes.array
    };
    static defaultProps = {
        items: []
    };
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
        const {items} = this.props;
        return (
            <Statistic.Group widths={items.length}>
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