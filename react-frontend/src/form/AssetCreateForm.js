/**
 * Created by rino0 on 2017-03-28.
 */
import React from "react";
import {Field, reduxForm} from "redux-form";
import {Button, FormGroup, Segment} from "semantic-ui-react";
import {FieldDateInput, FieldDropDown, FieldLazyInput, InteractiveForm, validateExist} from "./common";

class AssetCreateForm extends React.Component {
    static propTypes = {
        onSubmit: React.PropTypes.func.isRequired,
    };
    // static defaultProps = {};
    // static  childContextTypes = {};
    // static contextTypes = {};

    static formName = "assetCreate";
    static fieldNames = {
        name: "name",
        buy: "buy",
        get_date: "get_date",
        price: "price",
        years: "years",
        standard: "standard",
    };
    handleAddName = (e, {value}) => {
        this.setState((state, props) => {
            state.names.push({value: value, text: value});
            return state;
        });
    };
    handleAddStandard = (e, {value}) => {
        this.setState((state, props) => {
            state.standards.push({value: value, text: value});
            return state;
        });
    };
    handleAddBuy = (e, {value}) => {
        this.setState((state, props) => {
            state.buys.push({value: value, text: value});
            return state;
        });
    };

    static validate(values) {
        const errors = {};
        validateExist(values, errors, AssetCreateForm.fieldNames);
        if (!/^\d+$/.test(values[AssetCreateForm.fieldNames.price])) {
            errors[AssetCreateForm.fieldNames.price] = "숫자만 입력 가능합니다.";
        }
        if (!/^\d+$/.test(values[AssetCreateForm.fieldNames.years])) {
            errors[AssetCreateForm.fieldNames.years] = "숫자만 입력 가능합니다.";
        }
        return errors;
    }

    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            names: [],
            standards: [],
            buys: [],
        }
    }

    // getChildContext() {}
    componentDidMount() {
        this.setState({isFetching: true});
        Promise.delay(1400).then(() => Promise.all([
            fetch("/api/asset_name").then(res => res.ok ? res.json() : Promise.reject(new Error("서버에서 요청을 거절 했습니다."))),
            fetch("/api/standard").then(res => res.ok ? res.json() : Promise.reject(new Error("서버에서 요청을 거절 했습니다."))),
            fetch("/api/buy").then(res => res.ok ? res.json() : Promise.reject(new Error("서버에서 요청을 거절 했습니다."))),
        ]).then(([name, standard, buy]) => {
            this.setState((state, props) => {
                state.names = name.objects.map(item => {
                    return {
                        text: item.asset_name,
                        value: item.id
                    };
                });
                state.standards = standard.objects.map(item => {
                    return {
                        text: item.standard_name,
                        value: item.id
                    };
                });
                state.buys = buy.objects.map(item => {
                    return {
                        text: item.buy_name,
                        value: item.id
                    };
                });
                state.isFetching = false;
            });
        })).catch(err => {
            alert(err.message);
            this.setState({isFetching: false});
        });
    }

    // componentWillUnmount(){}
    render() {
        const {get_date, price, years, name, standard, buy} = AssetCreateForm.fieldNames;
        return (
            <InteractiveForm reduxFormProps={this.props}
                             loading={this.state.isFetching}
            >
                <Segment attached={true}>
                    <FormGroup widths={"equal"}>
                        <Field name={get_date} component={FieldDateInput} label="취득일"/>
                        <Field name={price} component={FieldLazyInput} label="취득원가"/>
                        <Field name={years} component={FieldLazyInput} label="내용연수"/>
                    </FormGroup>
                    <Field name={name} component={FieldDropDown} label="자산명" options={this.state.names}
                           onAddItem={this.handleAddName}/>
                    <Field name={standard} component={FieldDropDown} label="규격" options={this.state.standards}
                           onAddItem={this.handleAddStandard}/>
                    <Field name={buy} component={FieldDropDown} label="구입처" options={this.state.buys}
                           onAddItem={this.handleAddBuy}/>
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