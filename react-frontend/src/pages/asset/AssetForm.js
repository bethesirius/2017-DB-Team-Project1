/**
 * Created by rino0 on 2017-03-27.
 */
import React from "react";
import {Step} from "semantic-ui-react";
import {Link} from "react-router";

const steps = [
    {icon: 'truck', title: 'Shipping', description: 'Choose your shipping options', as: Link, to: "/rack"},
    {active: true, icon: 'payment', title: 'Billing', description: 'Enter billing information'},
    {disabled: true, icon: 'info', title: 'Confirm Order'},
];
class AssetForm extends React.Component {
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
        const {children} = this.props;
        return (
            <div >
                <Step.Group items={steps} fluid={true}/>
                {children}
            </div>
        );
    }
}

export default AssetForm;