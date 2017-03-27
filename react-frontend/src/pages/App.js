import React from "react";
import {Link} from "react-router";
import {Container, Dimmer, Divider, Header, Icon, Menu} from "semantic-ui-react";

const flagDim = false;

class App extends React.Component {
    static propTypes = {
        children: React.PropTypes.node,
    };

    state = {};

    handleItemClick = (e, {name}) => this.setState({activeItem: name});

    render() {
        const {activeItem} = this.state;
        const {children} = this.props;
        return (
            <Dimmer.Dimmable blurring={flagDim} dimmed={flagDim}>
                <Dimmer active={flagDim} inverted={flagDim}>
                    <Header as='h1' icon={true} inverted={!flagDim}>
                        <Icon name='wait'/>
                        아직 보여 드릴 수 없어요!!!
                    </Header>
                </Dimmer>
                <Menu fixed="top" inverted={true}>
                    <Container>
                        <Menu.Header as={Menu.Item}>IT Assets MS</Menu.Header>
                        <Menu.Item as={Link} name='service' to="/service" active={activeItem === 'service'}
                                   onClick={this.handleItemClick}/>
                        <Menu.Item as={Link} name='asset' to="/asset" active={activeItem === 'asset'}
                                   onClick={this.handleItemClick}/>
                        <Menu.Item as={Link} name='rack' to="/rack" active={activeItem === 'rack'}
                                   onClick={this.handleItemClick}/>
                        <Menu.Item as={Link} name='switch' to="/switch" active={activeItem === 'switch'}
                                   onClick={this.handleItemClick}/>
                        <Menu.Item as={Link} name='server' to="/server" active={activeItem === 'server'}
                                   onClick={this.handleItemClick}/>
                        <Menu.Item as={Link} name='storage' to="/storage" active={activeItem === 'storage'}
                                   onClick={this.handleItemClick}/>
                        <Menu.Menu position='right'>
                            <Menu.Item as={Link} name='aboutUs' to="/bar" active={activeItem === 'aboutUs'}
                                       onClick={this.handleItemClick}/>
                        </Menu.Menu>
                    </Container>
                </Menu>
                <Divider hidden={true}/> {/* margin trick. do not delete these*/}
                <Divider hidden={true}/> {/* margin trick. do not delete these*/}
                <Container as={Dimmer.Dimmable} blurring={flagDim} dimmed={flagDim}>
                    <Dimmer active={flagDim} inverted={flagDim}/>
                    {children}
                </Container>
                <Container >
                    footer will be here.
                </Container>
            </Dimmer.Dimmable>
        );
    }
}

export default App;
