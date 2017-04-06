/**
 * Created by rino0 on 2017-03-27.
 */
import React from "react";
import {SubmissionError} from "redux-form";
import {Button, Form, Header, Segment} from "semantic-ui-react";
import ServerCreateForm from "../../form/ServerCreateForm";
import SwitchCreateForm from "../../form/SwitchCreateForm";
import StorageCreateForm from "../../form/StorageCreateForm";
import RackCreateForm from "../../form/RackCreateForm";
import ServerItemGroup from "../../component/ServerItemGroup";


class AssetDetail extends React.Component {
    static propTypes = {};
    // static defaultProps = {};
    // static  childContextTypes = {};
    // static contextTypes = {};

    constructor(props) {
        super(props);
        this.state = {
            type: null,
            options: [
                {text: '서버', value: 'server', form: ServerCreateForm, submit: this.handleServerSubmit},
                {text: '스위치', value: 'switch', form: SwitchCreateForm, submit: this.handleSwitchSubmit},
                {text: '스토리지', value: 'storage', form: StorageCreateForm, submit: this.handleStorageSubmit},
                {text: '랙', value: 'rack', form: RackCreateForm, submit: this.handleRackSubmit},
            ],
            servers: [],
        };
    }

    // getChildContext() {}
    // componentDidMount(){}
    // componentWillUnmount(){}


    handleServerSubmit = (values, dispatch) => {
        return fetch(
            "/dummy_ok.json",
        ).then(res => {
            if (!res.ok) {
                throw SubmissionError({_error: "Failed Fetch"});
            }
            return res.json();
        }).then(json => {
            this.setState((state, props) => {
                state.type = null;
                state.servers.push({
                    id: Math.random(),
                    cpu: Math.random(),
                });
                return state;
            });
        }).catch(err => {
            return Promise.reject(new SubmissionError({_error: `Failed Fetch by:${err}`}));
        });
    };

    handleSwitchSubmit = (values, dispatch) => {

    };
    handleStorageSubmit = (values, dispatch) => {

    };
    handleRackSubmit = (values, dispatch) => {

    };

    handleTypeChange = (e, {value}) => {
        this.setState({type: value,});
    };

    render() {
        const {params: {id},} = this.props;
        const type = this.state.options.find((opt) => opt.value === this.state.type);
        const DeviceForm = type && type.form;
        return (
            <div>
                <Segment>
                    <Form>
                        <Form.Select label='장비 타입' placeholder='추가 등록할 장비를 선택하세요.' fluid={true}
                                     onChange={this.handleTypeChange}
                                     value={this.state.type}
                                     options={this.state.options}
                        />
                    </Form>
                    {type && <DeviceForm onSubmit={type.submit}/>}
                </Segment>
                <Segment attached={true}>
                    <Header>자산:{id}에 등록된 장비 목록</Header>
                    <ServerItemGroup items={this.state.servers}/>
                </Segment>
                <Button.Group attached={"bottom"}>
                    <Button primary={true} content={"다음으로"} icon='right arrow' labelPosition='right'/>
                </Button.Group>
            </div>
        );
    }
}

export default AssetDetail;