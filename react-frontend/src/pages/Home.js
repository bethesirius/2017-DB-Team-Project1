import React from "react";
import {Item} from "semantic-ui-react";
import TableVariationItem from "../component/TableVariationItem";
import TotalUseStatisticGroup from "../component/TotalUseStatisticGroup";
import ServiceSummaryTable from "../component/ServiceSummaryTable";
class Home extends React.Component {
    render() {
        return (
            <div>
                <Item.Group divided={true}>
                    <TotalUseStatisticGroup />
                    <TableVariationItem header="Service00" description={<ServiceSummaryTable />} to="/"/>
                    <TableVariationItem header="Service00" description={<ServiceSummaryTable />} to="/rack"/>
                    <TableVariationItem header="Service00" description={<ServiceSummaryTable />}/>
                    <TableVariationItem header="Service00" description={<ServiceSummaryTable />}/>
                    <TableVariationItem header="Service00" description={<ServiceSummaryTable />}/>
                </Item.Group>
            </div>
        );
    }
}

export default Home;
