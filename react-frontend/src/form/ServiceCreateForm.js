/**
 * Created by rino0 on 2017-03-28.
 */
import React from "react";
import {Field, reduxForm} from "redux-form";
import {Button, FormGroup, Segment} from "semantic-ui-react";
import {FieldLazyInput, InteractiveForm, validateExist} from "./common";

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
        validateExist(values,errors,ServiceCreateForm.fieldNames);
        return errors;
    }

    // getChildContext() {}
    // componentDidMount(){}
    // componentWillUnmount(){}
    render() {
        const {name,} = ServiceCreateForm.fieldNames;
        return (
            <InteractiveForm reduxFormProps={this.props}>
                <Segment attached={true}>
                    <FormGroup widths={"equal"}>
                    </FormGroup>
                    <Field name={name} component={FieldLazyInput} label="서비스명"/>
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