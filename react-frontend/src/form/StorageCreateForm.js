/**
 * Created by rino0 on 2017-03-28.
 */
import React from "react";
import {Field, reduxForm} from "redux-form";
import {Button, Divider, FormGroup, Segment} from "semantic-ui-react";
import {FieldDropDown, FieldLazyInput, InteractiveForm} from "./common";

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
    };

    static validate(values) {
        const errors = {};
        return errors;
    }

    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            specs: [],
        };
    }

    // getChildContext() {}
    componentDidMount() {
        this.setState({isFetching: true});
        Promise.all([
            fetch("/api/storage_spec").then(res => res.json()),
        ]).then(([spec]) => {
            this.setState((state, props) => {
                state.specs = spec.objects.map(item => {
                    let spec_type = item.disk_type ? item.disk_type.spec_type : 'unknown';
                    let spec_name = item.spec ? item.spec.spec_name : 'unknown';
                    return {
                        text: `[${spec_type}]${spec_name}/${item.disk_spec}`,
                        value: item.id
                    };
                });
                state.isFetching = false;
            });
        });
    }

    handleAddSpec = (e, {value}) => {
        this.setState((state, props) => {
            state.specs.push({value: value, text: value});
            return state;
        });
    };

    render() {
        const {manage_num, spec} = StorageCreateForm.fieldNames;
        return (
            <InteractiveForm reduxFormProps={this.props} loading={this.state.isFetching}>
                <Segment attached={true}>
                    <FormGroup widths={"equal"}>
                        <Field name={manage_num} component={FieldLazyInput} label="관리번호"/>
                    </FormGroup>
                    <Field name={spec} component={FieldDropDown} label="규격" options={this.state.specs}
                           allowAdditions={false}/>
                    <Divider/>
                    <p>원하는 규격이 없을 경우 아래를 채워 새로 만들 수 있습니다.</p>
                    <p>새 규격을 만들려면, 기존 규격을 선택하지 말아주세요. 선택시 선택을 우선합니다.</p>
                    <FormGroup widths={"equal"}>
                        <Field name={manage_num} component={FieldLazyInput} label="디스크 사양"/>
                        <Field name={manage_num} component={FieldLazyInput} label="할당단위크기 (GB)"/>
                    </FormGroup>
                    <FormGroup widths={"equal"}>
                        <Field name={spec} component={FieldDropDown} label="형식" options={this.state.specs}
                               onAddItem={this.handleAddSpec}/>
                        <Field name={spec} component={FieldDropDown} label="제품명" options={this.state.specs}
                               onAddItem={this.handleAddSpec}/>
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