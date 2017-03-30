import React from 'react'
import { Header, Modal } from 'semantic-ui-react'

class AssetModal extends React.Component {
    static propTypes= {
        assetId: React.PropTypes.string,
    }
    constructor(props) {
        super(props);
        this.state = {
            assetData: {
                assetId: 'N00000',
                assetKind: 'Switch',
            }
        };
    }
    getData(assetId){
        ((assetId)=> {
            this.setState({
                assetData: {
                    assetId: assetId,
                    assetKind: 'Server',
                }
            })
        })(assetId)
    }
    render(){
        const {assetId} = this.props;
        const {assetData} = this.state;
        return(
            <Modal trigger={<a style={{cursor:'pointer'}} onClick={ (ev) => ev.stopPropagation() }>{assetId}</a>} onOpen={(ev, data) => this.getData(assetId)} closeIcon='close'>
                <Header icon='info' content='Asset Description' />
                <Modal.Content>
                    {Object.keys(assetData).map( (key) => <p key={key}>{key}: {assetData[key]}</p>)}
                </Modal.Content>
            </Modal>
        );
    }
}

export default AssetModal
