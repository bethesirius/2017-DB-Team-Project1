import React from 'react'
import { Header, Confirm, Icon } from 'semantic-ui-react'

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
    show(ev){
        this.setState({open:true});
        ev.stopPropagation()
    }
    handleCancel(ev){
        this.setState({open:false});
    }
    handleConfirm(ev){
        this.setState({open:false});
    }

    render(){
        const content=(<div>test</div>)
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
