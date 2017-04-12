import React from "react";
import {Header, Modal, Dimmer, Loader} from "semantic-ui-react";

class AssetModal extends React.Component {
    static propTypes = {
        assetId: React.PropTypes.string,
    }

    constructor(props) {
        super(props);
        this.state = {
            assetData: {},
            isFetching: true,
        };
    }

    getData(assetId) {
        var reqHeaders= new Headers();
        reqHeaders.append('Content-Type', 'application/json');
        ((manage_num) => {
            const filters={
                filters:[{
                    name:'manage_num',
                    op:'eq',
                    val:manage_num,
                }]
            }
            fetch(`/api/device?q=${JSON.stringify(filters)}`, reqHeaders)
            .then((r) => r.json())
            .then((r) => {
                const device= r.objects[0];
                return Promise.all([
                    device,
                    fetch(`/api/device/${device.id}/asset`,reqHeaders).then((r)=> r.json())
                ])
            })
            .then(([device, asset]) => {
                this.setState({
                    assetData: {
                        관리번호: device.manage_num,
                        구매처: asset.buy_.buy_name,
                        자산명: asset.asset_name.asset_name,
                        규격: asset.standard.standard_name,
                        구입일: asset.get_date,
                        내용연수: asset.years,
                    },
                    isFetching:false,
                })
            })
        })(assetId);
    }

    render() {
        const {assetId} = this.props;
        const {assetData} = this.state;
        return (
            <Modal trigger={<a style={{cursor: 'pointer'}} onClick={ (ev) => ev.stopPropagation() }>{assetId}</a>}
                   onOpen={(ev, data) => this.getData(assetId)} closeIcon='close'>
                <Header icon='info' content='Asset Description'/>
                <Modal.Content>
                    <Dimmer.Dimmable as="div">
                        <Dimmer active={this.state.isFetching} inverted>
                            <Loader />
                        </Dimmer>
                        {Object.keys(assetData).map((key) => <p key={key}>{key}: {assetData[key]}</p>)}
                    </Dimmer.Dimmable>
                </Modal.Content>
            </Modal>
        );
    }
}

export default AssetModal
