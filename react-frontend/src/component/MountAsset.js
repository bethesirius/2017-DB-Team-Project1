import React from "react";
import {Confirm, Dropdown, Header, Icon, Modal} from "semantic-ui-react";

class MountAsset extends React.Component {
    static propTypes = {
        assetId: React.PropTypes.string,
    }

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            unmounted_assets: [],
            selected_asset: {},
            empty_lv: [],
            mount_lv: 0,
        };
    }

    show(ev) {
        this.setState({
            open: true,
            unmounted_assets: this.getUnmountedAssets(),
            empty_lv: this.getEmptyLv(),
        });
        ev.stopPropagation()
    }

    handleCancel(ev) {
        this.close();
    }

    handleConfirm(ev) {
        this.close();
    }

    close() {
        this.setState({
            open: false,
            unmounted_assets: [],
            selected_asset: {},
            empty_lv: [],
            valid_lv: [],
            mount_lv: 0,
        });
    }

    getUnmountedAssets() {//TODO
        return [
            {key: 'N0000000', value: 'N0000000', text: 'N0000000', asset_size: 3},
            {key: 'S0000000', value: 'S0000000', text: 'S0000000', asset_size: 2},
        ]
    }

    getEmptyLv() {//TODO
        return [
            {key: 'lv1', value: 1, text: 1},
            {key: 'lv2', value: 2, text: 2},
            {key: 'lv3', value: 3, text: 3},
            {key: 'lv4', value: 4, text: 4},
            {key: 'lv7', value: 7, text: 7},
            {key: 'lv8', value: 8, text: 8},
        ]
    }

    handleAssetSelect(ev, data) {
        const {unmounted_assets, empty_lv} = this.state;
        const selected_asset = unmounted_assets.find((asset) => asset.key === data.value);
        const candidate_lv = empty_lv.map((lv) => lv.value).sort();
        let valid_lv = [];
        candidate_lv.forEach((e) => {
            let cur_lv = e;
            let valid = true;
            for (let i = 0; i < selected_asset.asset_size; i++) {
                if (!candidate_lv.find((lv) => lv === cur_lv + i)) {
                    valid = false;
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

    render() {
        const content = (
            <Modal.Content>
                <span>
                    Management ID:
                    <Dropdown onChange={ (ev, data) => this.handleAssetSelect(ev, data) }
                              placeholder="Input Management ID" search selection fluid
                              options={this.state.unmounted_assets}/>
                </span>
                <span>
                    Mount Lv:
                    <Dropdown options={this.state.valid_lv} disabled={!this.state.selected_asset.value} selection
                              fluid/>
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
