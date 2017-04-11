import React from "react";
import {Accordion, Divider, Header, Item, Segment} from "semantic-ui-react";
import RackUseStatisticGroup from "../component/RackUseStatisticGroup";
import RackSummaryTable from "../component/RackSummaryTable";
import MountAsset from "../component/MountAsset";
import UnmountAsset from "../component/UnmountAsset";
import AssetModal from "../component/AssetModal";

class Rack extends React.Component {

    constructor(props){
        super(props);
        this.state={
            rack:[{
                assetId: 'R00000',
                size: 46,
                servers: 3,
                networks: 7,
                emptys: 24,
                mounted: [{
                    assetId: 'S00000',
                    size: 2,
                    mount_lv: 2,
                    ip: '0.0.0.0',
                    service: 'Admin',
                }, {
                    assetId: 'N00000',
                    size: 2,
                    mount_lv: 5,
                    ip: '0.0.0.1',
                    service: 'Admin',
                }],
            }, {
                assetId: 'R00001',
                size: 24,
                servers: 5,
                networks: 1,
                emptys: 2,
                mounted: [{
                    assetId: 'S00001',
                    size: 3,
                    mount_lv: 1,
                    ip: '0.0.1.0',
                    service: 'Admin',
                }, {
                    assetId: 'N00001',
                    size: 2,
                    mount_lv: 7,
                    ip: '0.0.1.1',
                    service: 'Alice',
                }],
            }]
        }
    }

    componentDidMount(){
        this.getRackSummarys();
    }

    getRackSummarys() {
        var reqHeaders= new Headers();
        reqHeaders.append('Content-Type', 'application/json');

        (() => fetch('/api/rack', reqHeaders)
            .then((r) => r.json())
        )()
    }

    render() {
        const {rack:rackSummarys} = this.state;
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
                                        <Item.Header><AssetModal assetId={summary.assetId}/></Item.Header>
                                        <Item.Meta>rough descriptions</Item.Meta>
                                        <Item.Description>
                                            <RackUseStatisticGroup data={{
                                                servers: summary.servers,
                                                networks: summary.networks,
                                                emptys: summary.emptys,
                                            }}/>
                                        </Item.Description>
                                    </Item.Content>
                                </Item>
                                <Item>
                                    <Item.Content>
                                        <Item.Header><MountAsset/><UnmountAsset/></Item.Header>
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
