/**
 * Created by rino0 on 2017-03-28.
 */
import React from "react";
import {Field, reduxForm} from "redux-form";
import {Button, FormGroup, Segment} from "semantic-ui-react";
import {FieldDropDown, FieldLazyInput, InteractiveForm, validateExist} from "./common";

class StorageCreateForm extends React.Component {
    static propTypes = {
        onSubmit: React.PropTypes.func.isRequired,
    };

    static formName = "storage";
    static fieldNames = {
        manage_num: "manage_num",
        location: "location",
        new_spec: {
            disk_spec: "disk_spec",
            disk_type: "disk_type",
            spec: "spec2",
            volume: "volume",
        },
    };

    static validate(values) {
        const errors = {};
        validateExist(values, errors, StorageCreateForm.fieldNames);
        validateExist(values, errors, StorageCreateForm.fieldNames.new_spec);
        return errors;
    }

    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            locations: [],
            spec_names: [],
            spec_types: [],
        };
    }

    // getChildContext() {}
    componentDidMount() {
        this.setState({isFetching: true});
        Promise.all([
            fetch("/api/detail_location").then(res => res.ok ? res.json() : Promise.reject(new Error("서버에서 요청을 거절 했습니다."))),
            fetch("/api/storage_spec_type").then(res => res.ok ? res.json() : Promise.reject(new Error("서버에서 요청을 거절 했습니다."))),
            fetch("/api/storage_spec_name").then(res => res.ok ? res.json() : Promise.reject(new Error("서버에서 요청을 거절 했습니다."))),
        ]).then(([location, spec_type, spec_name]) => {
            this.setState((state, props) => {
                state.locations = location.objects.map(item => {
                    let location = item.location ? item.location.location : 'unknown';
                    return {
                        text: `${location}`,
                        value: item.id
                    };
                });
                state.spec_types = spec_type.objects.map(item => {
                    return {
                        text: item.spec_type,
                        value: item.id
                    };
                });
                state.spec_names = spec_name.objects.map(item => {
                    return {
                        text: item.spec_name,
                        value: item.id,
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
    handleAddSpecType = (e, {value}) => {
        this.setState((state, props) => {
            state.spec_types.push({value: value, text: value});
            return state;
        });
    };
    handleAddSpecName = (e, {value}) => {
        this.setState((state, props) => {
            state.spec_names.push({value: value, text: value});
            return state;
        });
    };

    render() {
        const {manage_num, new_spec, location} = StorageCreateForm.fieldNames;
        return (
            <InteractiveForm reduxFormProps={this.props} loading={this.state.isFetching}>
                <Segment attached={true}>
                    <FormGroup widths={"equal"}>
                        <Field name={manage_num} component={FieldLazyInput} label="관리번호"/>
                    </FormGroup>
                    <Field name={location} component={FieldDropDown} label="현재 위치" options={this.state.locations}
                           onAddItem={this.handleAddLocation}/>
                    <FormGroup widths={"equal"}>
                        <Field name={new_spec.disk_spec} component={FieldLazyInput} label="디스크 사양"/>
                        <Field name={new_spec.volume} component={FieldLazyInput} label="할당단위크기 (GB)"/>
                    </FormGroup>
                    <FormGroup widths={"equal"}>
                        <Field name={new_spec.disk_type} component={FieldDropDown} label="형식"
                               options={this.state.spec_types}
                               onAddItem={this.handleAddSpecType}/>
                        <Field name={new_spec.spec} component={FieldDropDown} label="제품명"
                               options={this.state.spec_names}
                               onAddItem={this.handleAddSpecName}/>
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
} = StorageCreateForm;
export default reduxForm({
    form: StorageCreateForm.formName,
    validate: StorageCreateForm.validate,
})(StorageCreateForm);