import React from "react";
import {Item} from "semantic-ui-react";
import TableVariationItem from "../component/TableVariationItem";
import TotalUseStatisticGroup from "../component/TotalUseStatisticGroup";
import ServiceSummaryTable from "../component/ServiceSummaryTable";
class Home extends React.Component {
    getServiceSummaryTable(serviceSummary){
        return <ServiceSummaryTable serviceSummary={serviceSummary}/>
    }
    getServiceSummarys(){
        return [null, null, null];
    }
    render() {
        let serviceSummaryTables= this.getServiceSummarys().map( (summary)=> this.getServiceSummaryTable(summary) );
        return (
            <div>
                <Item.Group divided={true}>
                    <TotalUseStatisticGroup />
                    {serviceSummaryTables.map( (summaryTable)=> <TableVariationItem view={summaryTable} />)}
                    THIS IS HOME
                </Item.Group>
            </div>
        );
    }
}

export default Home;
