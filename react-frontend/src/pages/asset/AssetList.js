/**
 * Created by rino0 on 2017-03-27.
 */
import React from "react";
import {Button, Segment} from "semantic-ui-react";
import {Link} from "react-router";
import ItemGroup from "../../component/ItemGroup";
class AssetList extends React.Component {
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
        return (
            <div>
                <Segment attached={true}>

                </Segment>
                <Button.Group attached='bottom'>
                    <Button as={Link} to="/asset/form" primary={true} icon="add" labelPosition='left'
                            content={"새 자산 등록 하기"}/>
                </Button.Group>
                <ItemGroup.Asset items={[]}/>
            </div>
        );
    }
}

export default AssetList;