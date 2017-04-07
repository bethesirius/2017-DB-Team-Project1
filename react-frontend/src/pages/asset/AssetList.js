/**
 * Created by rino0 on 2017-03-27.
 */
import React from "react";
import {Button, Dimmer, Loader, Segment} from "semantic-ui-react";
import {Link} from "react-router";
import ItemGroup from "../../component/ItemGroup";


const tempF = () => {
    return fetch("/json/asset.json")
        .then(res => res.json())
        .then(json => Promise.all([
            json,
            fetch("/json/asset_name.json").then(res => res.json()),
            fetch("/json/standard.json").then(res => res.json()),
            fetch("/json/buy.json").then(res => res.json())
        ]))
        .then(([asset, name, std, buy]) => {
            return {
                id: asset.asset_num,
                get_date: asset.get_date,
                name: name.asset_name,
                standard: std.standard_name,
                years: asset.years,
                price: asset.price,
                buy: buy.buy_name,
            };
        });
};

class AssetList extends React.Component {
    static propTypes = {};
    // static defaultProps = {};
    // static  childContextTypes = {};
    // static contextTypes = {};

    constructor(props) {
        super(props);
        this.state = {
            items: [],
        };
    }

    // getChildContext() {}
    componentDidMount() {
        this.setState({isFetching: true});
        fetch("/json/asset_list.json").then(res => res.json()).then(json => {
            const {objects} = json;
            const assetF = tempF.bind(this);
            Promise.all(objects.map(i => assetF())).then(lists => this.setState({
                isFetching: false,
                items: lists,
            }));
        })
    }

    // componentWillUnmount(){}
    render() {
        return (
            <Dimmer.Dimmable as="div">
                <Dimmer active={this.state.isFetching}>
                    <Loader size='massive'>Loading</Loader>
                </Dimmer>
                <Segment attached={true}>

                </Segment>
                <Button.Group attached='bottom'>
                    <Button as={Link} to="/asset/form" primary={true} icon="add" labelPosition='left'
                            content={"새 자산 등록 하기"}/>
                </Button.Group>
                <ItemGroup.Asset items={this.state.items}/>
            </Dimmer.Dimmable>
        );
    }
}

export default AssetList;