/**
 * Created by rino0 on 2017-03-27.
 */
import React from "react";
import {Step} from "semantic-ui-react";
import {Link} from "react-router";

const stepPaths = [
    "/service/form/create",
    "/service/form/storage",
    "/service/form/server",
    "/service/form/confirm",
];

const conditionalProps = (to, pathname) => { // redux 연결로 바꿀까 고민 중... // 바꿔야 할 수 있는 기능이 있음;
    const targetIndex = stepPaths.findIndex(str => to.match(str));
    const currentIndex = stepPaths.findIndex(str => pathname.match(str));
    return {
        completed: currentIndex > targetIndex,
        disabled: currentIndex < targetIndex,
        active: targetIndex === currentIndex,
    }
};
const LinkStep = ({to, pathname, ...rest}) => (
    <Step as={Link} to={to} {...conditionalProps(to, pathname)} {...rest}/>
);
LinkStep.propTypes = {to: React.PropTypes.string.isRequired, pathname: React.PropTypes.string.isRequired};

class ServiceForm extends React.Component {
    static propTypes = {
        children: React.PropTypes.node,

    };
    // static defaultProps = {};
    // static  childContextTypes = {};
    // static contextTypes = {};

    constructor(props) {
        super(props);
        this.state = {};
    }

    // getChildContext() {}
    // componentDidMount(){}
    // componentWillUnmount(){}
    render() {
        const {children, location: {pathname}} = this.props;
        return (
            <div >
                <Step.Group fluid={true} ordered={true}>
                    <LinkStep to={stepPaths[0]} pathname={pathname} title="서비스 선택/생성"/>
                    <LinkStep to={stepPaths[1]} pathname={pathname} title="스토리지 선택"/>
                    <LinkStep to={stepPaths[2]} pathname={pathname} title="서버 선택"/>
                    <LinkStep to={stepPaths[3]} pathname={pathname} title="결과 확인"/>
                </Step.Group>
                {children}
            </div>
        );
    }
}

export default ServiceForm;