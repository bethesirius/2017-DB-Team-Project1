import React from 'react'
import { Header, Confirm, Icon, Dropdown, Modal, Input } from 'semantic-ui-react'
class MountAsset extends React.Component {
    static propTypes = {
        assetId: React.PropTypes.string,
        summary: React.PropTypes.any,
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

    handleCancel(ev) {
        this.close();
    }
    handleConfirm(ev){
        this.close();
    }

    close() {
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
    getUnmountedAssets(){
        var reqHeaders= new Headers();
        reqHeaders.append('Content-Type', 'application/json');

        (() => fetch('/api/rack_location_for_switch', reqHeaders)
            .then((r) => r.json())
            .then((r) => r.objects.map( (obj) => obj['switch'].id))
            .then((r) => {
                let filters={
                    filters:[{
                       name:"id",
                       op:"not_in",
                       val:r,
                    }]
                }
                return fetch('/api/switch?q='+JSON.stringify(filters), reqHeaders);
            })
            .then((r) => r.json())
            .then((r) => {
                this.setState({
                    unmounted_switches: r.objects.map( (obj) => { return {
                        key: obj.device.manage_num,
                        value: obj.device.manage_num,
                        text: obj.device.manage_num,
                        asset_size: obj.size,
                    }})
                })
            })
        )();

        (() => fetch('/api/rack_location_for_server', reqHeaders)
            .then((r) => r.json())
            .then((r) => r.objects.map( (obj) => obj.server.id ))
            .then((r) => {
                let filters={
                    filters:[{
                       name:"id",
                       op:"not_in",
                       val:r,
                    }]
                }
                return fetch('/api/server?q='+JSON.stringify(filters), reqHeaders);
            })
            .then((r) => r.json())
            .then((r) => {
                this.setState({
                    unmounted_servers: r.objects.map( (obj) => { return {
                        key: obj.device.manage_num,
                        value: obj.device.manage_num,
                        text: obj.device.manage_num,
                        asset_size: obj.size,
                    }})
                })
            })
        )();
    }

    getEmptyLv() {
        return this.props.summary.mounted.map( (device) => device.mount_lv ).map( (lv) => {
            return {
                key: 'lv'+lv,
                value: lv,
                test: lv,
            }
        }).sort( (a, b) => a.value-b.value );
    }
    handleAssetSelect(ev, data){
        const {unmounted_switches, unmounted_servers, empty_lv}= this.state;
        const unmounted_assets= unmounted_switches.concat(unmounted_servers);
        const selected_asset= unmounted_assets.find( (asset) => asset.key===data.value );
        const candidate_lv= empty_lv.map( (lv) => lv.value );
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
            if (valid) valid_lv.push({key: "lv" + e, value: e, text: e});
        });
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

        return (
            <div>
                <a style={{cursor: 'pointer'}} onClick={ (ev) => this.show(ev) }><Icon name="add square"/> Mount
                    Asset</a>
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
