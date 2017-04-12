import React from "react";
import {Link} from "react-router";
import {Container, Divider, Menu} from "semantic-ui-react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import "./App.css";

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
            <div>
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
                <Container>
                    <ReactCSSTransitionGroup
                        component="div"
                        className="trans-content"
                        transitionName="example"
                        transitionAppear={true}
                        transitionAppearTimeout={1400}
                        transitionEnterTimeout={1400}
                        transitionLeaveTimeout={1400}
                        transitionEnter={true}
                        transitionLeave={true}
                    >
                        {React.cloneElement(children, {
                            key: location.pathname,
                        })}
                    </ReactCSSTransitionGroup>
                </Container>
            </div>
        );
    }
}
// note
// https://www.npmjs.com/package/react-router-page-transition
export default App;
