import React from "react";
import {Item, Accordion} from "semantic-ui-react";
import RackUseStatisticGroup from "../component/RackUseStatisticGroup";
import RackSummaryTable from "../component/RackSummaryTable";

class Rack extends React.Component {

    getRackSummarys() {
        return [{
            id: 'R00000',
            size: 46,
            servers: 3,
            storages: 5,
            networks: 7,
            emptys: 24,
            mounted: [{
                id: 'S00000',
                size: 2,
                mount_lv: 2,
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
            servers: 5,
            storages: 10,
            networks: 1,
            emptys: 2,
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
            <Accordion exclusive={false}>
                {rackSummarys.map((summary) => ([
                    <Accordion.Title key={summary.id}>
                        <Item.Group>
                        <Item>
                            <Item.Content>
                                <Item.Header as='a'>{summary.id}</Item.Header>
                                <RackUseStatisticGroup data={{servers:summary.servers,
                                    storages:summary.storages,
                                    networks:summary.networks,
                                    emptys:summary.emptys,
                                }}/>
                            </Item.Content>
                        </Item>
                        </Item.Group>
                    </Accordion.Title>,
                    <Accordion.Content>
                        <RackSummaryTable data={summary}/>
                    </Accordion.Content>
                ]))}{/* React JSX에서 map 쓸때 key 사용 필수. */}
            </Accordion>
        );
    }
}

export default Rack;
