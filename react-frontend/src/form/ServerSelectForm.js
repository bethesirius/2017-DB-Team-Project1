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
    // static defaultProps = {};
    // static  childContextTypes = {};
    // static contextTypes = {};

    static formName = "server";
    static fieldNames = {
        deviceId: "deviceId",
    };

    static validate(values) {
        const errors = {};
        validateExist(values,errors,ServerSelectForm.fieldNames);
        return errors;
    }

    // getChildContext() {}
    // componentDidMount(){}
    // componentWillUnmount(){}
    render() {
        const {deviceId,} = ServerSelectForm.fieldNames;
        return (
            <InteractiveForm reduxFormProps={this.props}>
                <Segment attached={true}>
                    <FormGroup widths={"equal"}>
                    </FormGroup>
                    <Field name={deviceId} component={FieldDropDown} label="서버 선택"/>
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