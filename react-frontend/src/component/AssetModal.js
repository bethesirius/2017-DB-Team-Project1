import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

class AssetModal extends React.Component {
    static propTypes= {
        assetId: React.PropTypes.string,
    }
    constructor(props) {
        super(props);
        this.state = {};
    }
    getData(assetId){
        console.log(assetId);
    }
    render(){
        const {assetId} = this.props;
        return(
            <Modal trigger={<a style={{cursor:'pointer'}}>{assetId}</a>} onOpen={(ev, data) => this.getData(assetId)} closeIcon='close'>
                <Header icon='archive' content='Archive Old Messages' />
                <Modal.Content>
                    <p>Your inbox is getting full, would you like us to enable automatic archiving of old messages?</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='red'>
                        <Icon name='remove' /> No
                    </Button>
                    <Button color='green'>
                        <Icon name='checkmark' /> Yes
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default AssetModal
