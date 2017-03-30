/**
 * Created by rino0 on 2017-03-27.
 */
import React from "react";
import {Button, Form, Header, Segment} from "semantic-ui-react";
import ServerCreateForm from "../../form/ServerCreateForm";
import SwitchCreateForm from "../../form/SwitchCreateForm";
import StorageCreateForm from "../../form/StorageCreateForm";
import RackCreateForm from "../../form/RackCreateForm";
const options = [
    {text: '서버', value: 'server', form: ServerCreateForm},
    {text: '스위치', value: 'switch', form: SwitchCreateForm},
    {text: '스토리지', value: 'storage', form: StorageCreateForm},
    {text: '랙', value: 'rack', form: RackCreateForm},
];

class AssetDetail extends React.Component {
    static propTypes = {};
    // static defaultProps = {};
    // static  childContextTypes = {};
    // static contextTypes = {};

    constructor(props) {
        super(props);
        this.state = {
            type: null,
        };
    }

    // getChildContext() {}
    // componentDidMount(){}
    // componentWillUnmount(){}

    handleTypeChange = (e, {value}) => {
        e.preventDefault();
        this.setState({
            type: value,
        })
    };

    render() {
        const {params: {id},} = this.props;
        const type = options.find((opt) => opt.value === this.state.type);
        const DeviceForm = type && type.form;
        return (
            <div>
                <Segment>
                    <Form>
                        <Form.Select label='장비 타입' placeholder='추가 등록할 장비를 선택하세요.' fluid={true}
                                     onChange={this.handleTypeChange}
                                     options={options}
                        />
                    </Form>
                    {type && <DeviceForm onSubmit={(values, dispatch) => {

                    }}/>}
                </Segment>
                <Segment attached={true}>
                    <Header>자산:{id}에 등록된 장비 목록</Header>

                </Segment>
                <Button.Group attached={"bottom"}>
                    <Button primary={true} content={"다음으로"} icon='right arrow' labelPosition='right'/>
                </Button.Group>
            </div>
        );
    }
}

export default AssetDetail;