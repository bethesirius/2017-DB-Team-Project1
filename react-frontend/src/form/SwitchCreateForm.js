/**
 * Created by rino0 on 2017-03-28.
 */
import React from "react";
import {Field, reduxForm} from "redux-form";
import {Button, FormGroup, Segment} from "semantic-ui-react";
import {FieldDropDown, FieldLazyInput, InteractiveForm, validateExist} from "./common";

class SwitchCreateForm extends React.Component {
    static propTypes = {
        onSubmit: React.PropTypes.func.isRequired,
    };

    static formName = "switch";
    static fieldNames = {
        manage_num: "manage_num",
        location: "location",
        spec: "spec",
        size: "size",
    };

    static validate(values) {
        const errors = {};
        validateExist(values, errors, SwitchCreateForm.fieldNames);
        return errors;
    }

    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            locations: [],
            specs: [],
        };
    }

    // getChildContext() {}
    componentDidMount() {
        this.setState({isFetching: true});
        Promise.all([
            fetch("/api/detail_location").then(res => res.ok ? res.json() : Promise.reject(new Error("서버에서 요청을 거절 했습니다."))),
            fetch("/api/switch_spec").then(res => res.ok ? res.json() : Promise.reject(new Error("서버에서 요청을 거절 했습니다."))),
        ]).then(([location, spec]) => {
            this.setState((state, props) => {
                state.locations = location.objects.map(item => {
                    let location = item.location ? item.location.location : 'unknown';
                    let detail = item.detail;
                    return {
                        text: `${location}-${detail}`,
                        value: item.id
                    };
                });
                state.specs = spec.objects.map(item => {
                    return {
                        text: item.spec,
                        value: item.id
                    };
                });
                state.isFetching = false;
            });
        }).catch(err => {
            alert(err.message);
            this.setState({isFetching: false});
        });
    }

    handleAddSpec = (e, {value}) => {
        this.setState((state, props) => {
            state.specs.push({value: value, text: value});
            return state;
        });
    };

    render() {
        const {manage_num, location, spec, size} = SwitchCreateForm.fieldNames;
        return (
            <InteractiveForm reduxFormProps={this.props} loading={this.state.isFetching}>
                <Segment attached={true}>
                    <FormGroup widths={"equal"}>
                        <Field name={manage_num} component={FieldLazyInput} label="관리번호"/>
                        <Field name={size} component={FieldLazyInput} label="크기(Rack unit)"/>
                    </FormGroup>
                    <Field name={location} component={FieldDropDown} label="현재 위치" options={this.state.locations}
                           allowAdditions={false}/>
                    <Field name={spec} component={FieldDropDown} label="규격" options={this.state.specs}
                           onAddItem={this.handleAddSpec}/>
                    <Button.Group attached={"bottom"}>
                        <Button primary={true} content={"다음으로"} icon='right arrow' labelPosition='right'/>
                    </Button.Group>
                </Segment>
            </InteractiveForm>
        );
    }
}
export const {
    formName, fieldNames
} = SwitchCreateForm;
export default reduxForm({
    form: SwitchCreateForm.formName,
    validate: SwitchCreateForm.validate,
})(SwitchCreateForm);