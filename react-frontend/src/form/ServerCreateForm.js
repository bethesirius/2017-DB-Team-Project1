/**
 * Created by rino0 on 2017-03-28.
 */
import React from "react";
import {Field, reduxForm} from "redux-form";
import {Button, FormGroup, Segment} from "semantic-ui-react";
import {FieldLazyInput, InteractiveForm} from "./common";

class ServerCreateForm extends React.Component {
    static propTypes = {
        onSubmit: React.PropTypes.func.isRequired,
    };
    // static defaultProps = {};
    // static  childContextTypes = {};
    // static contextTypes = {};

    static formName = "server";
    static fieldNames = {
        deviceId: "deviceId",
        location: "location",
        spec: "spec",
        cpu: "cpu",
    };

    static validate(values) {
        const errors = {};
        return errors;
    }

    // getChildContext() {}
    // componentDidMount(){}
    // componentWillUnmount(){}
    render() {
        const {deviceId, location, spec,cpu} = ServerCreateForm.fieldNames;
        return (
            <InteractiveForm reduxFormProps={this.props}>
                <Segment attached={true}>
                    <FormGroup widths={"equal"}>
                        <Field name={deviceId} component={FieldLazyInput} label="자산번호"/>
                        <Field name={cpu} component={FieldLazyInput} label="CPU(core)"/>
                    </FormGroup>
                    <Field name={location} component={FieldLazyInput} label="현재 위치"/>
                    <Field name={spec} component={FieldLazyInput} label="규격"/>
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
} = ServerCreateForm;
export default reduxForm({
    form: ServerCreateForm.formName,
    validate: ServerCreateForm.validate,
})(ServerCreateForm);