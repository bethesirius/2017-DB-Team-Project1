/**
 * Created by rino0 on 2017-03-27.
 */
import React from "react";
import {Step} from "semantic-ui-react";
import {Link} from "react-router";

const stepPaths = [
    "/asset/form/create",
    "/asset/form/edit",
    "/asset/form/confirm",
];

const conditionalProps = (to, pathname) => { // redux 연결로 바꿀까 고민 중...
    const targetIndex = stepPaths.findIndex(str => str.startsWith(to));
    const currentIndex = stepPaths.findIndex(str => str.startsWith(pathname));
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
class AssetForm extends React.Component {
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
                    <LinkStep to={stepPaths[0]} pathname={pathname} title="자산 생성"/>
                    <LinkStep to={stepPaths[1]} pathname={pathname} title="장비 등록"/>
                    <LinkStep to={stepPaths[2]} pathname={pathname} title="결과 확인"/>
                </Step.Group>
                {children}
            </div>
        );
    }
}

export default AssetForm;