/**
 * Created by rino0 on 2017-03-28.
 */
import React from "react";
import {Field, reduxForm} from "redux-form";
import {Button, FormGroup, Segment} from "semantic-ui-react";
import {FieldDropDown, FieldLazyInput, InteractiveForm} from "./common";

class ServerCreateForm extends React.Component {
    static propTypes = {
        onSubmit: React.PropTypes.func.isRequired,
    };
    // static defaultProps = {};
    // static  childContextTypes = {};
    // static contextTypes = {};

    static formName = "server";
    static fieldNames = {
        manage_num: "manage_num",
        location: "location",
        spec: "spec",
        core_num: "core_num",
    };
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
// {
//     "asset_id": null,
//     "core_num": null,
//     "id": 618,
//     "location_id": null,
//     "manage_num": null,
//     "spec_id": null
// }

    static validate(values) {
        const errors = {};
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

    // getChildContext() {}
    componentDidMount() {
        this.setState({isFetching: true});
        Promise.all([
            fetch("/api/detail_location").then(res => res.json()),
            fetch("/api/server_spec").then(res => res.json()),
        ]).then(([location, spec]) => {
            this.setState((state, props) => {
                state.locations = location.objects.map(item => {
                    let detail = item.location.detail ? item.location.detail : '';
                    return {
                        text: `${item.location.location}-${detail}`,
                        value: item.id
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
        });
    }

    // componentWillUnmount(){}
    render() {
        const {manage_num, location, spec, core_num} = ServerCreateForm.fieldNames;
        return (
            <InteractiveForm reduxFormProps={this.props}>
                <Segment attached={true}>
                    <FormGroup widths={"equal"}>
                        <Field name={manage_num} component={FieldLazyInput} label="관리번호"/>
                        <Field name={core_num} component={FieldLazyInput} label="CPU(core)"/>
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
} = ServerCreateForm;
export default reduxForm({
    form: ServerCreateForm.formName,
    validate: ServerCreateForm.validate,
})(ServerCreateForm);