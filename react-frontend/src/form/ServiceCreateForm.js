/**
 * Created by rino0 on 2017-03-28.
 */
import React from "react";
import {Field, reduxForm} from "redux-form";
import {Button, FormGroup, Segment} from "semantic-ui-react";
import {FieldDropDown, InteractiveForm, validateExist} from "./common";

class ServiceCreateForm extends React.Component {
    static propTypes = {
        onSubmit: React.PropTypes.func.isRequired,
    };
    // static defaultProps = {};
    // static  childContextTypes = {};
    // static contextTypes = {};

    static formName = "assetCreate";
    static fieldNames = {
        name: "name",
    };

    static validate(values) {
        const errors = {};
        validateExist(values, errors, ServiceCreateForm.fieldNames);
        return errors;
    }

    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            names: []
        };
    }

    // getChildContext() {}
    componentDidMount() {
        this.setState({isFetching: true});
        Promise.all([
            fetch("/api/service_name").then(res => res.ok ? res.json() : Promise.reject(new Error("서버에서 요청을 거절 했습니다."))),
        ]).then(([names]) => {
            this.setState((state, props) => {
                state.names = names.objects.map(item => {
                    return {
                        text: item.service_name,
                        value: item.id
                    };
                });
                state.isFetching = false;
            });
        });
    }

    // componentWillUnmount(){}

    handleAddName = (e, {value}) => {
        this.setState((state, props) => {
            state.names.push({value: value, text: value});
            return state;
        });
    };

    render() {
        const {name,} = ServiceCreateForm.fieldNames;
        return (
            <InteractiveForm reduxFormProps={this.props}>
                <Segment attached={true}>
                    <FormGroup widths={"equal"}>
                    </FormGroup>
                    <Field name={name} component={FieldDropDown} label="서비스명" options={this.state.names}
                           onAddItem={this.handleAddName}/>
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
} = ServiceCreateForm;
export default reduxForm({
    form: ServiceCreateForm.formName,
    validate: ServiceCreateForm.validate,
})(ServiceCreateForm);