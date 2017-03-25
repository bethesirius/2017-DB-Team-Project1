import React from "react";
import {Item} from "semantic-ui-react";
import TableVariationItem from "../component/TableVariationItem";
import TotalUseStatisticGroup from "../component/TotalUseStatisticGroup";
import RackSummaryTable from "../component/RackSummaryTable";

class Rack extends React.Component {
    getRackSummaryTable(serviceSummary){
        return <RackSummaryTable data={serviceSummary}/>
    }

    getRackSummarys(){
        return [{
            id:'R00000',
            size:46,
            mounted:[{
                id:'S00000',
                size:2,
                mount_lv:1,
                ip:'0.0.0.0',
            },{
                id:'N00000',
                size:2,
                mount_lv:5,
                ip:'0.0.0.1',
            }],
        },{
            id:'R00001',
            size:24,
            mounted:[{
                id:'S00001',
                size:2,
                mount_lv:3,
                ip:'0.0.1.0',
            },{
                id:'N00001',
                size:2,
                mount_lv:7,
                ip:'0.0.1.1',
            }],
        }];
    }

    render() {
        let rackSummarys= this.getRackSummarys();
        return (
            <div>
                <Item.Group divided={true}>
                    <TotalUseStatisticGroup />
                    {rackSummarys.map( (summary) => <TableVariationItem header={summary.id} view={this.getRackSummaryTable(summary)} /> )}
                </Item.Group>
            </div>
        );
    }
}

export default Rack;
