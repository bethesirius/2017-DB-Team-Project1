import React from "react";
import {Accordion, Divider, Header, Item, Segment, Input, Container, Dimmer, Loader} from "semantic-ui-react";
import RackUseStatisticGroup from "../component/RackUseStatisticGroup";
import RackSummaryTable from "../component/RackSummaryTable";
import MountAsset from "../component/MountAsset";
import UnmountAsset from "../component/UnmountAsset";
import AssetModal from "../component/AssetModal";

class Rack extends React.Component {

    constructor(props){
        super(props);
        this.state={
            search_query:"",
            rack:[],
            isFetching: true,
        }
    }

    componentDidMount(){
        this.getRackSummarys();
    }

    getRackSummarys() {
        var reqHeaders= new Headers();
        reqHeaders.append('Content-Type', 'application/json');

        (() => fetch('/cheat/rack_info', reqHeaders)
            .then((r) => r.json())
            .then((r) => {
                let result= r.server.concat(r['switch']);
                let rack= Array.from( new Set(result.map( (obj) => obj[0] ))).map( (rack_num) => {
                    let devices= result.filter( (obj) => obj[0]=== rack_num)
                    let mounted_devices= devices.map( (device) => {
                        return {assetId: device[3],
                            ip: device[2],
                            size: device[4],
                            mount_lv: device[5],
                            service: device[6],}
                    })
                    return {
                        assetId: rack_num,
                        size: devices[0][1],
                        servers: devices.filter( (device) => device[3][0]==='S').length,
                        networks: devices.filter( (device) => device[3][0]==='N').length,
                        emptys: devices[0][1]- devices.length,
                        mounted: mounted_devices,
                    }
                });
                this.setState({
                    rack:rack,
                    isFetching:false,
                });
            })
        )()
    }

    handleSearchQuery(data){
        this.setState({
            search_query:data.value
        })
    }

    render() {
        const {rack:rackSummarys, search_query, isFetching} = this.state;
        return (
            <Dimmer.Dimmable as="div">
                    <Dimmer active= {isFetching}>
                        <Loader />
                    </Dimmer>
                <Accordion as={Segment} exclusive={false}>
                    <Header>
                        <Container textAlign='left'>등록된 Rack</Container>
                        <Container textAlign='right'>
                            <Input placeholder='Search...' onChange={ (ev, data) => this.handleSearchQuery(data) }/>
                        </Container>
                    </Header>
                    {rackSummarys.filter( (summary) => summary.assetId.search(search_query)>-1 ).map((summary) => ([
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
                                        <Item.Header><MountAsset summary={summary} /><UnmountAsset/></Item.Header>
                                    </Item.Content>
                                </Item>
                            </Item.Group>
                        </Accordion.Title>,
                        <Accordion.Content>
                            <RackSummaryTable data={summary}/>
                        </Accordion.Content>
                    ]))}{/* React JSX에서 map 쓸때 key 사용 필수. */}
                </Accordion>
            </Dimmer.Dimmable>
        );
    }
}

export default Rack;
