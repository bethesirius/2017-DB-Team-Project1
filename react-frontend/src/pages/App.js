import React from "react";
import {Link} from "react-router";
import {Container, Dimmer, Divider, Header, Icon, Menu} from "semantic-ui-react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import "./App.css";

const flagDim = false;

const LinkMenuItem = ({to, pathname, ...rest}) => (
    <Menu.Item as={Link} to={to} active={pathname.startsWith(to)} {...rest}/>
);
LinkMenuItem.propTypes = {to: React.PropTypes.string.isRequired, pathname: React.PropTypes.string.isRequired};

class App extends React.Component {
    static propTypes = {
        children: React.PropTypes.node,
    };

    render() {
        const {children, location: {pathname}} = this.props;
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
                        <LinkMenuItem name='service' to="/service" pathname={pathname}/>
                        <LinkMenuItem name='asset' to="/asset" pathname={pathname}/>
                        <LinkMenuItem name='rack' to="/rack" pathname={pathname}/>
                        <LinkMenuItem name='switch' to="/switch" pathname={pathname}/>
                        <LinkMenuItem name='server' to="/server" pathname={pathname}/>
                        <LinkMenuItem name='storage' to="/storage" pathname={pathname}/>
                        <Menu.Menu position='right'>
                            <LinkMenuItem name='aboutUs' to="/bar" pathname={pathname}/>
                        </Menu.Menu>
                    </Container>
                </Menu>
                <Divider hidden={true}/> {/* margin trick. do not delete these*/}
                <Divider hidden={true}/> {/* margin trick. do not delete these*/}
                <Container as={Dimmer.Dimmable} blurring={flagDim} dimmed={flagDim}>
                    <Dimmer active={flagDim} inverted={flagDim}/>
                    <ReactCSSTransitionGroup
                        component="div"
                        transitionName="example"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={500}
                    >
                        {React.cloneElement(children, {
                            key: location.pathname
                        })}
                    </ReactCSSTransitionGroup>
                </Container>
                <Container>
                    footer will be here.
                </Container>
            </Dimmer.Dimmable>
        );
    }
}

export default App;
