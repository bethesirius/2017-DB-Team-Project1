/**
 * Created by rino0 on 2017-03-28.
 */
import React from "react";
import {Field, reduxForm} from "redux-form";
import {Button, FormGroup, Segment} from "semantic-ui-react";
import {FieldDropDown, FieldLazyInput, InteractiveForm, validateExist} from "./common";

class StorageSelectForm extends React.Component {
    static propTypes = {
        onSubmit: React.PropTypes.func.isRequired,
    };
    // static defaultProps = {};
    // static  childContextTypes = {};
    // static contextTypes = {};

    static formName = "storage";
    static fieldNames = {
        storage_spec_id: "storage_spec_id",
        used_size: "used_size",
        usage: "usage",
    };

    static validate(values) {
        const errors = {};
        validateExist(values, errors, StorageSelectForm.fieldNames);
        return errors;
    }

    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            specs: []
        };
    }

    componentDidMount() {
        this.setState({isFetching: true});
        Promise.all([
            fetch("/api/storage_spec").then(res => res.ok ? res.json() : Promise.reject(new Error("서버에서 요청을 거절 했습니다."))),
        ]).then(([names]) => {
            this.setState((state, props) => {
                state.specs = names.objects.map(item => {
                    let name = item.spec ? item.spec.spec_name : 'unknown';
                    let type = item.disk_type ? item.disk_type.spec_type : 'unknown';
                    let spec = item.disk_spec;
                    let volume = item.volume;
                    let sumUsage = item.service ? item.service : [];
                    sumUsage = sumUsage.reduce((prev, current) => {
                        return prev + current.used_size;
                    }, 0);
                    let leftTB = (volume - sumUsage).toFixed(3);
                    return {
                        text: `${name} / ${type} / ${spec} \t 잔여: ${leftTB}TB`,
                        value: item.id,
                    };
                });
                state.isFetching = false;
                return state;
            });
        }).catch(err => {
            alert(err.message);
            this.setState({isFetching: false});
        });
    }

    // componentWillUnmount(){}
    render() {
        const {storage_spec_id, used_size, usage} = StorageSelectForm.fieldNames;
        return (
            <InteractiveForm reduxFormProps={this.props} loading={this.state.isFetching}>
                <Segment attached={true}>
                    <Field name={storage_spec_id} component={FieldDropDown} label="스토리지 선택" options={this.state.specs}/>
                    <FormGroup widths={"equal"}>
                        <Field name={used_size} component={FieldLazyInput} label="할당량 (TB)"/>
                        <Field name={usage} component={FieldLazyInput} label="용도"/>
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
} = StorageSelectForm;
export default reduxForm({
    form: StorageSelectForm.formName,
    validate: StorageSelectForm.validate,
})(StorageSelectForm);