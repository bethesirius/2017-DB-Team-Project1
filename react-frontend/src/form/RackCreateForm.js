/**
 * Created by rino0 on 2017-03-28.
 */
import React from "react";
import {Field, reduxForm} from "redux-form";
import {Button, FormGroup, Segment} from "semantic-ui-react";
import {FieldDropDown, FieldLazyInput, InteractiveForm, validateExist} from "./common";

class RackCreateForm extends React.Component {
    static propTypes = {
        onSubmit: React.PropTypes.func.isRequired,
    };
    // static defaultProps = {};
    // static  childContextTypes = {};
    // static contextTypes = {};

    static formName = "rack";
    static fieldNames = {
        deviceId: "deviceId",
        location: "location",
        spec: "spec",
        detail: "detail",
        size: "size",
    };

    static validate(values) {
        const errors = {};
        validateExist(values,errors,RackCreateForm.fieldNames);
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

    componentDidMount() {
        this.setState({isFetching: true});
        Promise.all([
            fetch("/api/location").then(res => res.ok ? res.json() : Promise.reject(new Error("서버에서 요청을 거절 했습니다."))),
            fetch("/api/rack_spec").then(res => res.ok ? res.json() : Promise.reject(new Error("서버에서 요청을 거절 했습니다."))),
        ]).then(([location, spec]) => {
            this.setState((state, props) => {
                state.locations = location.objects.map(item => {
                    let location = item.location;
                    return {
                        text: location,
                        value: item.id,
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

    handleAddLocation = (e, {value}) => {
        this.setState((state, props) => {
            state.locations.push({value: value, text: value});
            return state;
        });
    };

    handleAddSpec = (e, {value}) => {
        this.setState((state, props) => {
            state.specs.push({value: value, text: value});
            return state;
        });
    };

    render() {
        const {deviceId, location, spec, detail, size} = RackCreateForm.fieldNames;
        return (
            <InteractiveForm reduxFormProps={this.props} loading={this.state.isFetching}>
                <Segment attached={true}>
                    <FormGroup widths={"equal"}>
                        <Field name={deviceId} component={FieldLazyInput} label="관리 번호"/>
                        <Field name={detail} component={FieldLazyInput} label="Rack Code"/>
                        <Field name={size} component={FieldLazyInput} label="Rack Size"/>
                    </FormGroup>
                    <Field name={location} component={FieldDropDown} label="현재 위치" options={this.state.locations}
                           onAddItem={this.handleAddLocation}/>
                    <Field name={spec} component={FieldDropDown} label="규격" options={this.state.specs}
                           onAddItem={this.handleAddSpec}/>
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
} = RackCreateForm;
export default reduxForm({
    form: RackCreateForm.formName,
    validate: RackCreateForm.validate,
})(RackCreateForm);