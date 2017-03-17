import React from "react";
import {Link} from "react-router";
import {Container, Menu} from "semantic-ui-react";

class App extends React.Component {

    state = {};

    handleItemClick = (e, {name}) => this.setState({activeItem: name});

    render() {
        const {activeItem} = this.state;
        const {children} = this.props;
        return (
            <div>
                <Menu fixed={true} inverted={true}>
                    <Container>
                        <Menu.Header as={Menu.Item}>IT Assets MS</Menu.Header>
                        <Menu.Item as={Link} name='home'  to="/" active={activeItem === 'home'} onClick={this.handleItemClick}  />
                        <Menu.Item as={Link} name='locations' to="foo" active={activeItem === 'locations'} onClick={this.handleItemClick}/>
                        <Menu.Menu position='right'>
                            <Menu.Item as={Link} name='aboutUs' to="bar" active={activeItem === 'aboutUs'} onClick={this.handleItemClick}/>
                        </Menu.Menu>
                    </Container>
                </Menu>
                <Container>
                    {children}
                </Container>
                <Container >
                    footer will be here.
                </Container>
            </div>
        );
    }
}

export default App;
