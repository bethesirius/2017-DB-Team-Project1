import React from "react";
import {Confirm, Dropdown, Header, Icon, Modal} from "semantic-ui-react";

class UnmountAsset extends React.Component {
    static propTypes = {
        assetId: React.PropTypes.string,
    }

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            mounted_assets: [],
            selected_asset: {},
        };
    }

    show(ev) {
        this.setState({
            open: true,
            mounted_assets: this.getMountedAssets(),
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
            mounted_assets: [],
            selected_asset: {},
        });
    }

    getMountedAssets() {//TODO
        return [
            {key: 'N0000000', value: 'N0000000', text: 'N0000000', asset_size: 3},
            {key: 'S0000000', value: 'S0000000', text: 'S0000000', asset_size: 2},
        ]
    }

    handleAssetSelect(ev, data) {
        const {mounted_assets} = this.state;
        const selected_asset = mounted_assets.find((asset) => asset.key === data.value);
        this.setState({
            selected_asset: selected_asset,
        });
    }

    render() {
        const content = (
            <Modal.Content>
                <span>
                    Management ID:
                    <Dropdown onChange={ (ev, data) => this.handleAssetSelect(ev, data) }
                              placeholder="Input Management ID" search selection fluid
                              options={this.state.mounted_assets}/>
                </span>
            </Modal.Content>
        );

        return (
            <div>
                <a style={{cursor: 'pointer'}} onClick={ (ev) => this.show(ev) }><Icon name="minus square"/> Unmount
                    Asset</a>
                <Confirm open={this.state.open}
                         header={<Header><Icon name="cubes"/>Unmount Asset</Header>}
                         content={content}
                         onCancel={ (ev) => this.handleCancel(ev) }
                         onConfirm={ (ev) => this.handleConfirm(ev) }
                />
            </div>
        );
    }
}

export default UnmountAsset 
