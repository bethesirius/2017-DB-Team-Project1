/**
 * Created by rino0 on 2017-03-28.
 */
import React from "react";
import {Field, reduxForm} from "redux-form";
import {Button, FormGroup, Segment} from "semantic-ui-react";
import {FieldDropDown, InteractiveForm, validateExist} from "./common";

class ServerSelectForm extends React.Component {
    static propTypes = {
        onSubmit: React.PropTypes.func.isRequired,
    };

    static formName = "server";
    static fieldNames = {
        server_id: "server_id",
    };

    static validate(values) {
        const errors = {};
        validateExist(values, errors, ServerSelectForm.fieldNames);
        return errors;
    }

    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            servers: [],
        }
    }

    componentDidMount() {
        this.setState({isFetching: true});
        fetch(`/api/rack_location_for_server?q={"filters":[{"name":"service_name","op":"is_null"}]}`)
            .then(res => res.ok ? res.json() : Promise.reject(new Error("서버에서 요청을 거절 했습니다.")))
            .then(message => {
                this.setState((state, props) => {
                    state.servers = message.objects.map(item => {
                        item = item.server;
                        return {
                            text: `${item.manage_num} / ${item.core_num} Core`,
                            value: item.id,
                        };
                    });
                    state.isFetching = false;
                    return state;
                })
            }).catch(err => {
            alert(err.message);
            this.setState({isFetching: false});
        });
    }

    // componentWillUnmount(){}
    render() {
        const {server_id,} = ServerSelectForm.fieldNames;
        return (
            <InteractiveForm reduxFormProps={this.props} loading={this.state.isFetching}>
                <Segment attached={true}>
                    <Field name={server_id} component={FieldDropDown} label="서버 선택" options={this.state.servers}/>
                    <FormGroup widths={"equal"}>
                        {this.state.servers.length === 0 && <p>서비스에 배정 가능한 조건의 서버가 없습니다!</p>}
                    </FormGroup>
                </Segment>
                <Button.Group attached={"bottom"}>
                    <Button primary={true} content={"다음으로"} icon='right arrow' labelPosition='right'/>
                </Button.Group>
            </InteractiveForm>
        );
    }
}
export const {
    formName, fieldNames
} = ServerSelectForm;
export default reduxForm({
    form: ServerSelectForm.formName,
    validate: ServerSelectForm.validate,
})(ServerSelectForm);