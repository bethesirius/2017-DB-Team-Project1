/**
 * Created by rino0 on 2017-03-27.
 */
import React from "react";
import {Item} from "semantic-ui-react";

class Server extends React.Component {
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
            <Item.Group divided={true}>

            </Item.Group>
        );
    }
}

export default Server;