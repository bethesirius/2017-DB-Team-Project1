import React from 'react'
import { Header, Confirm, Icon, Dropdown, Modal, Input } from 'semantic-ui-react'

class MountAsset extends React.Component {
    static propTypes= {
        assetId: React.PropTypes.string,
    }
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            unmounted_switches: [],
            unmounted_servers: [],
            selected_asset: {},
            empty_lv: [],
            valid_lv: [],
            mount_lv: 0,
            IP: '',
        };
    }
    show(ev){
        this.getUnmountedAssets();
        this.setState({
            open: true,
            empty_lv: this.getEmptyLv(),
        });
        ev.stopPropagation()
    }
    handleCancel(ev){
        this.close();
    }
    handleConfirm(ev){
        
        this.close();
    }
    close(){
        this.setState({
            open: false,
            unmounted_switches: [],
            unmounted_servers: [],
            selected_asset: {},
            empty_lv: [],
            valid_lv: [],
            mount_lv: 0,
            IP: '',
        });
    }
    getUnmountedAssets(){//TODO
        var reqHeaders= new Headers();
        reqHeaders.append('Content-Type', 'application/json');

        (() => fetch('/api/rack_location_for_switch', reqHeaders)
            .then((r) => r.json())
            .then((r) => r.objects.map( (obj) => obj.device_info_id ))
            .then((r) => {
                let filters={
                    filters:[{
                       name:"switch_id",
                       op:"not_in",
                       val:r,
                    }]
                }
                return fetch('/api/device_info_for_switch?q='+JSON.stringify(filters), reqHeaders);
            })
            .then((r) => r.json())
            .then((r) => r.objects.map( (obj) => obj.switch_id ))
            .then((r) => {
                let filters={
                    filters:[{
                        name:"id",
                        op:"in",
                        val:r,
                    }]
                }
                return fetch('/api/switch?q='+JSON.stringify(filters), reqHeaders);
            })
            .then((r) => r.json())
            .then((r) => {
                this.setState({
                    unmounted_switches: r.objects.map( (obj) => { return {
                        key: obj.id,
                        value: obj.id,
                        text: obj.id,
                        asset_size: obj.size,
                    }})
                })
            })
        ).bind(this)();

        (() => fetch('/api/rack_location_for_server', reqHeaders)
            .then((r) => r.json())
            .then((r) => r.objects.map( (obj) => obj.device_info_id ))
            .then((r) => {
                let filters={
                    filters:[{
                       name:"server_id",
                       op:"not_in",
                       val:r,
                    }]
                }
                return fetch('/api/device_info_for_server?q='+JSON.stringify(filters), reqHeaders);
            })
            .then((r) => r.json())
            .then((r) => r.objects.map( (obj) => obj.server_id ))
            .then((r) => {
                let filters={
                    filters:[{
                        name:"id",
                        op:"in",
                        val:r,
                    }]
                }
                return fetch('/api/server?q='+JSON.stringify(filters), reqHeaders);
            })
            .then((r) => r.json())
            .then((r) => {
                this.setState({
                    unmounted_servers: r.objects.map( (obj) => { return {
                        key: obj.id,
                        value: obj.id,
                        text: obj.id,
                        asset_size: obj.size,
                    }})
                })
            })
        ).bind(this)();
    }
    getEmptyLv(){//TODO
        return [
            { key: 'lv1', value: 1, text: 1 },
            { key: 'lv2', value: 2, text: 2 },
            { key: 'lv3', value: 3, text: 3 },
            { key: 'lv4', value: 4, text: 4 },
            { key: 'lv7', value: 7, text: 7 },
            { key: 'lv8', value: 8, text: 8 },
        ]
    }
    handleAssetSelect(ev, data){
        const {unmounted_switches, unmounted_servers, empty_lv}= this.state;
        const unmounted_assets= unmounted_switches.concat(unmounted_servers);
        const selected_asset= unmounted_assets.find( (asset) => asset.key===data.value );
        const candidate_lv= empty_lv.map( (lv) => lv.value ).sort();
        var valid_lv= [];
        candidate_lv.forEach( (e) => {
            var cur_lv= e;
            var valid= true;
            for(var i=0; i< selected_asset.asset_size; i++){
                if(!candidate_lv.find( (lv) => lv===cur_lv+i )){
                    valid= false;
                    break;
                }
            }
            if(valid) valid_lv.push({key:"lv"+e, value:e, text:e});
        })
        this.setState({
            selected_asset: selected_asset,
            valid_lv: valid_lv,
        });
    }
    handleLvSelect(ev, data){
        this.setState({mount_lv:data.value});
    }
    handleIPInput(ev, data){
        this.setState({IP:data.value});
    }

    render(){
        const {unmounted_switches, unmounted_servers, empty_lv}= this.state;
        const unmounted_assets= unmounted_switches.concat(unmounted_servers);
        const content=(
            <Modal.Content>
                <span>
                    Management ID:
                    <Dropdown onChange={ (ev, data) => this.handleAssetSelect(ev, data) } placeholder="Input Management ID" search selection fluid options={unmounted_assets}/>
                </span>
                <span>
                    Mount Lv:
                    <Dropdown onChange={ (ev, data) => this.handleLvSelect(ev, data) } options={this.state.valid_lv} disabled={!this.state.selected_asset.value} selection fluid/>
                </span>
                <span>
                    IP:
                    <Input onChange={ (ev, data) => this.handleIPInput(ev, data) } placeholder="IP" fluid/>
                </span>
            </Modal.Content>
        );

        return(
            <div>
                <a style={{cursor:'pointer'}} onClick={ (ev) => this.show(ev) }><Icon name="add square"/> Mount Asset</a>
                <Confirm open={this.state.open}
                    header={<Header><Icon name="cubes"/>Mount Asset</Header>}
                    content={content}
                    onCancel={ (ev) => this.handleCancel(ev) }
                    onConfirm={ (ev) => this.handleConfirm(ev) }
                />
            </div>
        );
    }
}

export default MountAsset 
