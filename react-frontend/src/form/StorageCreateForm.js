/**
 * Created by rino0 on 2017-03-28.
 */
import React from "react";
import {Field, reduxForm} from "redux-form";
import {Button, Divider, FormGroup, Segment} from "semantic-ui-react";
import {FieldDropDown, FieldLazyInput, InteractiveForm, validateExist} from "./common";

class StorageCreateForm extends React.Component {
    static propTypes = {
        onSubmit: React.PropTypes.func.isRequired,
    };
    // static defaultProps = {};
    // static  childContextTypes = {};
    // static contextTypes = {};

    static formName = "storage";
    static fieldNames = {
        manage_num: "manage_num",
        spec: "spec",
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
        validateExist(values,errors,StorageCreateForm.fieldNames);
        return errors;
    }

    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            locations: [],
            specs: [],
            spec_names: [],
            spec_types: [],
        };
    }

    // getChildContext() {}
    componentDidMount() {
        this.setState({isFetching: true});
        Promise.all([
            fetch("/api/storage_spec").then(res => res.ok ? res.json() : Promise.reject(new Error("서버에서 요청을 거절 했습니다."))),
            fetch("/api/detail_location").then(res => res.ok ? res.json() : Promise.reject(new Error("서버에서 요청을 거절 했습니다."))),
            fetch("/api/storage_spec_type").then(res => res.ok ? res.json() : Promise.reject(new Error("서버에서 요청을 거절 했습니다."))),
            fetch("/api/storage_spec_name").then(res => res.ok ? res.json() : Promise.reject(new Error("서버에서 요청을 거절 했습니다."))),
        ]).then(([spec, location, spec_type, spec_name]) => {
            this.setState((state, props) => {
                state.specs = spec.objects.map(item => {
                    let spec_type = item.disk_type ? item.disk_type.spec_type : 'unknown';
                    let spec_name = item.spec ? item.spec.spec_name : 'unknown';
                    return {
                        text: `[${spec_type}]${spec_name}/${item.disk_spec}`,
                        value: item.id
                    };
                });
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
        const {manage_num, spec, new_spec, location} = StorageCreateForm.fieldNames;
        return (
            <InteractiveForm reduxFormProps={this.props} loading={this.state.isFetching}>
                <Segment attached={true}>
                    <FormGroup widths={"equal"}>
                        <Field name={manage_num} component={FieldLazyInput} label="관리번호"/>
                    </FormGroup>
                    <Field name={location} component={FieldDropDown} label="현재 위치" options={this.state.locations}
                           onAddItem={this.handleAddLocation}/>
                    <Field name={spec} component={FieldDropDown} label="규격" options={this.state.specs}
                           allowAdditions={false}/>
                    <Divider/>
                    <p>원하는 규격이 없을 경우 아래를 채워 새로 만들 수 있습니다.</p>
                    <p>새 규격을 만들려면, 기존 규격을 선택하지 말아주세요. 선택시 기존 규격을 우선합니다.</p>
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