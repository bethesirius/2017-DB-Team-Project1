import React from "react";
import {Item} from "semantic-ui-react";
import TableVariationItem from "../component/TableVariationItem";
import TotalUseStatisticGroup from "../component/TotalUseStatisticGroup";
class Home extends React.Component {
    render() {
        return (
            <div>
                <Item.Group divided={true}>
                <TotalUseStatisticGroup />
                    <TableVariationItem/>
                    <TableVariationItem/>
                    <TableVariationItem/>
                    <TableVariationItem/>
                    <TableVariationItem/>
                    THIS IS HOME
                </Item.Group>
            </div>
        );
    }
}

export default Home;
