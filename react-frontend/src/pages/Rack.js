import React from "react";
import {Accordion, Button, Header, Item, Segment, Divider} from "semantic-ui-react";
import RackUseStatisticGroup from "../component/RackUseStatisticGroup";
import RackSummaryTable from "../component/RackSummaryTable";
import AssetModal from "../component/AssetModal";
import {Link} from "react-router";

class Rack extends React.Component {

    getRackSummarys() {
        return [{
            assetId: 'R00000',
            size: 46,
            servers: 3,
            storages: 5,
            networks: 7,
            emptys: 24,
            mounted: [{
                assetId: 'S00000',
                size: 2,
                mount_lv: 2,
                ip: '0.0.0.0',
            }, {
                assetId: 'N00000',
                size: 2,
                mount_lv: 5,
                ip: '0.0.0.1',
            }],
        }, {
            assetId: 'R00001',
            size: 24,
            servers: 5,
            storages: 10,
            networks: 1,
            emptys: 2,
            mounted: [{
                assetId: 'S00001',
                size: 2,
                mount_lv: 3,
                ip: '0.0.1.0',
            }, {
                assetId: 'N00001',
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
                <Accordion as={Segment} exclusive={false}>
                    <Header>등록된 Rack</Header>
                    {rackSummarys.map((summary) => ([
                        <Divider/>,
                        <Accordion.Title key={summary.assetId}>
                            <Item.Group>
                                <Item>
                                    <Item.Content>
                                        <Item.Header><AssetModal assetId={summary.assetId} /></Item.Header>
                                        <Item.Meta>rough descriptions</Item.Meta>
                                        <Item.Description>
                                            <RackUseStatisticGroup data={{
                                                servers: summary.servers,
                                                storages: summary.storages,
                                                networks: summary.networks,
                                                emptys: summary.emptys,
                                            }}/>
                                        </Item.Description>
                                    </Item.Content>
                                </Item>
                            </Item.Group>
                        </Accordion.Title>,
                        <Accordion.Content>
                            <RackSummaryTable data={summary}/>
                        </Accordion.Content>
                    ]))}{/* React JSX에서 map 쓸때 key 사용 필수. */}
                </Accordion>
            </div>
        );
    }
}

export default Rack;
