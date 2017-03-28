/**
 * Created by rino0 on 2017-03-28.
 */
import React from "react";
import {Field, reduxForm} from "redux-form";
import {Button, FormGroup, Segment} from "semantic-ui-react";
import {FieldLazyInput, InteractiveForm} from "./common";

class AssetCreateForm extends React.Component {
    static propTypes = {
        onSubmit: React.PropTypes.func.isRequired,
    };
    // static defaultProps = {};
    // static  childContextTypes = {};
    // static contextTypes = {};

    static formName = "assetCreate";
    static fieldNames = {
        assetId: "assetId",
        date: "date",
        price: "price",
        grantee: "grantee",
        name: "name",
        spec: "spec",
        company: "company",
    };

    static validate(values) {
        const errors = {};
        return errors;
    }

    // getChildContext() {}
    // componentDidMount(){}
    // componentWillUnmount(){}
    render() {
        const {assetId, date, price, grantee, name, spec, company} = AssetCreateForm.fieldNames;
        return (
            <InteractiveForm reduxFormProps={this.props}>
                <Segment attached={true}>
                    <FormGroup widths={"equal"}>
                        <Field name={assetId} component={FieldLazyInput} label="자산번호"/>
                        <Field name={date} component={FieldLazyInput} label="취득일"/>
                        <Field name={price} component={FieldLazyInput} label="취득원가"/>
                        <Field name={grantee} component={FieldLazyInput} label="내용연수"/>
                    </FormGroup>
                    <Field name={name} component={FieldLazyInput} label="자산명"/>
                    <Field name={spec} component={FieldLazyInput} label="규격"/>
                    <Field name={company} component={FieldLazyInput} label="구입처"/>
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
} = AssetCreateForm;
export default reduxForm({
    form: AssetCreateForm.formName,
    validate: AssetCreateForm.validate,
})(AssetCreateForm);