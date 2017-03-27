/**
 * Created by rino0 on 2017-03-27.
 */
import React from "react";

class AssetCreate extends React.Component {
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
        const {
            ...others,
        } = this.props;
        return (
            <div {...others}/>
        );
    }
}

export default AssetCreate;