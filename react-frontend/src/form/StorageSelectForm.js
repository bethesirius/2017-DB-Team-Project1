/**
 * Created by rino0 on 2017-03-28.
 */
import React from "react";
import {Field, reduxForm} from "redux-form";
import {Button, FormGroup, Segment} from "semantic-ui-react";
import {FieldDropDown, FieldLazyInput, InteractiveForm} from "./common";

class StorageSelectForm extends React.Component {
    static propTypes = {
        onSubmit: React.PropTypes.func.isRequired,
    };
    // static defaultProps = {};
    // static  childContextTypes = {};
    // static contextTypes = {};

    static formName = "storage";
    static fieldNames = {
        deviceId: "deviceId",
        amount: "amount",
        usage: "usage",
    };

    static validate(values) {
        const errors = {};
        return errors;
    }

    // getChildContext() {}
    // componentDidMount(){}
    // componentWillUnmount(){}
    render() {
        const {deviceId, amount, usage} = StorageSelectForm.fieldNames;
        return (
            <InteractiveForm reduxFormProps={this.props}>
                <Segment attached={true}>
                    <Field name={deviceId} component={FieldDropDown} label="스토리지 선택"/>
                    <FormGroup widths={"equal"}>
                        <Field name={amount} component={FieldLazyInput} label="할당량 (TB)"/>
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