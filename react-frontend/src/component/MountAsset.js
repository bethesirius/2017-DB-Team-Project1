import React from 'react'
import { Header, Modal, Icon, Button } from 'semantic-ui-react'

class MountAsset extends React.Component {
    static propTypes= {
        assetId: React.PropTypes.string,
    }
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }
    mount(){
        this.setState({open:false});
    }
    show(ev){
        this.setState({open:true});
        ev.stopPropagation()
    }
    close(ev){
        this.setState({open:false});
    }

    render(){
        return(
            <div>
                <a style={{cursor:'pointer'}} onClick={ (ev) => this.show(ev) }><Icon name="add square"/> Mount Asset</a>
                <Modal open={this.state.open}>
                    <Header icon='cubes' content='Mount Asset on Rack' />
                    <Modal.Content>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='red' onClick={ (ev) => this.close(ev) }>Cancel</Button>
                        <Button color='green' onClick={(ev) => this.mount()}>Confirm</Button>
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}

export default MountAsset 
