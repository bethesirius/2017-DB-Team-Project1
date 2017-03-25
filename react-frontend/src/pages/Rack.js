import React from "react";
import {Item} from "semantic-ui-react";
import TableVariationItem from "../component/TableVariationItem";
import TotalUseStatisticGroup from "../component/TotalUseStatisticGroup";
import RackSummaryTable from "../component/RackSummaryTable";

class Rack extends React.Component {

    getRackSummarys() {
        return [{
            id: 'R00000',
            size: 46,
            mounted: [{
                id: 'S00000',
                size: 2,
                mount_lv: 1,
                ip: '0.0.0.0',
            }, {
                id: 'N00000',
                size: 2,
                mount_lv: 5,
                ip: '0.0.0.1',
            }],
        }, {
            id: 'R00001',
            size: 24,
            mounted: [{
                id: 'S00001',
                size: 2,
                mount_lv: 3,
                ip: '0.0.1.0',
            }, {
                id: 'N00001',
                size: 2,
                mount_lv: 7,
                ip: '0.0.1.1',
            }],
        }];
    }

    render() {
        const rackSummarys = this.getRackSummarys();
        return (
            <div>
                <Item.Group divided={true}>
                    <TotalUseStatisticGroup />{/* Rack 페이지에도 이게 굳이 필요 한가??? 잘 모르겠음. */}
                    {rackSummarys.map((summary) => (
                        <TableVariationItem key={summary.id}
                                            header={summary.id}
                                            description={<RackSummaryTable data={summary}/>}
                        />)
                    )}{/* React JSX에서 map 쓸때 key 사용 필수. */}
                </Item.Group>
            </div>
        );
    }
}

export default Rack;
