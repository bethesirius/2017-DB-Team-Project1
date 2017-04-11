/**
 * Created by rino0 on 2017-03-27.
 */
import React from "react";
import {Segment} from "semantic-ui-react";
import {browserHistory} from "react-router";
import AssetCreateForm, {fieldNames} from "../../form/AssetCreateForm";
import moment from "moment";

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
    handleSubmit = (values, dispatch) => {
        let name = values[fieldNames.name];
        let standard = values[fieldNames.standard];
        let buy = values[fieldNames.buy];
        name = Number.isInteger(name) ? {asset_name_id: name} : {asset_name: {asset_name: name}};
        standard = Number.isInteger(standard) ? {standard_id: standard} : {standard: {standard_name: standard}};
        buy = Number.isInteger(buy) ? {buy: buy} : {buy_: {buy_name: buy}};

        const body = {};
        Object.assign(body, {
            get_date: values[fieldNames.get_date],
            price: parseInt(values[fieldNames.price], 10),
            years: parseInt(values[fieldNames.years], 10),
        }, name, standard, buy);
        return fetch("/api/asset", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        }).then(res => res.json()).then(message => {
            let asset_num = `${moment(message.get_date).year() % 100}130${message.id % 1000}`;
            return fetch(`/api/asset/${message.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({asset_num,}),
            });
        }).then(res => res.json()).then(message => {
            browserHistory.push(`/asset/form/rack/${message.id}/${message.asset_num}`);
        });
    };

    render() {
        return (
            <Segment>
                <AssetCreateForm onSubmit={this.handleSubmit}/>
            </Segment>
        );
    }
}

export default AssetCreate;