/**
 * Created by rino0 on 2017-03-16.
 */
import React from "react";
import {
    Button,
    Checkbox,
    Divider,
    Dropdown,
    Form,
    Icon,
    Input,
    Label,
    Message,
    Radio,
    Segment,
    TextArea
} from "semantic-ui-react";

export const FieldLazyInput = ({input: {onChange, onBlur,}, meta, label, ...custom}) => (
    <Form.Field error={meta.touched && meta.invalid}>
        <label>{label}</label>
        <Input type="text"
               loading={meta.asyncValidating}
               onBlur={(e, data) => {
                   //onChange(e);
                   onBlur(e);
               }}
               {...custom}
        />
        {(meta.touched && meta.invalid) && <label>{meta.error}</label>}
    </Form.Field>
);

export const FieldDropDown = ({input: {onChange, onBlur, ...left}, meta, label, onChanged, ...custom}) => (
    <Form.Field error={meta.touched && meta.invalid}>
        <label>{label}</label>
        <Dropdown
            selection={true}
            onChange={(e, {value}) => {
                onChange(value);
                onChanged && onChanged(value, meta.dispatch);
            }}
            onBlur={(e, {value}) => {
            }}
            {...left}
            {...custom}
        />
        {(meta.touched && meta.invalid) && <label>{meta.error}</label>}
    </Form.Field>
);

export const FieldAlternatively = ({
                                       input: {onChange, value}, meta,
                                       label, optionLabel1, optionLabel2, optionValue1, optionValue2, onChanged,
                                   }) => (
    <Form.Field error={meta.touched && meta.invalid}>
        <label>{label}</label>
        <Button.Group>
            <Button
                type="button"
                active={value === optionValue1}
                onClick={(e, {value}) => {
                    e.preventDefault();
                    onChange(value);
                    onChanged && onChanged(value, meta.dispatch);
                }}
                value={optionValue1}>{optionLabel1}</Button>
            <Button
                type="button"
                active={value === optionValue2}
                onClick={(e, {value}) => {
                    e.preventDefault();
                    onChange(value);
                    onChanged && onChanged(value, meta.dispatch);
                }}
                value={optionValue2}>{optionLabel2}</Button>
        </Button.Group>
        {(meta.touched && meta.invalid) && <label>{meta.error}</label>}
    </Form.Field>
);
FieldAlternatively.propTypes = {
    onChanged: React.PropTypes.func,
};

export const FieldCheckbox = ({input: {onChange, value, ...left}, meta, label, ...custom}) => (
    <Form.Field error={meta.invalid}>
        <Checkbox checked={typeof value === 'boolean' ? value : false}
                  onChange={(e, {checked}) => {
                      onChange(checked);
                  }}
                  label={label}
                  {...left}
                  {...custom}
        />
        {(meta.invalid) && <label>{meta.error}</label>}
    </Form.Field>
);

export class InteractiveForm extends React.PureComponent {
    static propTypes = {
        reduxFormProps: React.PropTypes.object.isRequired,
        children: React.PropTypes.node,
        header: React.PropTypes.node,
    };

    render() {
        const {error, submitFailed, handleSubmit, submitting} = this.props.reduxFormProps;
        return (
            <Form onSubmit={handleSubmit}
                  error={submitFailed}
            >
                {this.props.header}
                {(submitFailed && !submitting) && <Message
                    error={submitFailed}
                    header='어라? 뭔가 잘못 되었습니다!'
                    list={[
                        "일시적인 네트워크 문제이거나 다음과 같은 이유로 실패했습니다.",
                        error,
                    ]}
                />}
                {submitting && <Message icon={true}>
                    <Icon name='circle notched' loading/>
                    <Message.Content>
                        <Message.Header>Now Loading...</Message.Header>
                        잠시만 기다려 주세요...
                    </Message.Content>
                </Message>}
                {this.props.children}
            </Form>
        );
    }
}



//TODO 용준아 스크롤바지워줘
export const LRFieldLazyTextArea = ({input: {onChange, onBlur,}, meta, label, rows, hasTip, ...custom}) => (
    <Form.Field error={meta.touched && meta.invalid}>
        <div>
            <Divider hidden/>
            <Message attached={true}>
                <span style={{fontSize: 14, fontWeight: "bold"}}>{label}</span>
                {hasTip && <Button floated='right' color={"green"} style={{
                    marginTop: -14,
                    marginRight: -21,
                    paddingTop: 16,
                    paddingBottom: 16
                }}>작성TIP</Button>}
            </Message>
            <TextArea label={"test"} autoHeight={true} rows={rows} className="ui segment attached"
                      onBlur={(e, data) => {
                          onBlur(e);
                      }}
                      {...custom}
            />
            {(meta.invalid) && <label>{meta.error}</label>}
        </div>
    </Form.Field>

);
export const LRFieldLazyRadioTextArea = ({input: {onChange, onBlur,}, meta, ...custom}) => (
    <Form.Field error={meta.touched && meta.invalid}>
        <div {...custom}>
            <Divider hidden/>
            <Message attached={true}>
                <span style={{fontSize: 14, fontWeight: "bold"}}>예시 선택하기</span>
                <Radio label="A형 " style={{paddingLeft: 10, paddingRight: 5}}/>
                <Radio label="B형" style={{paddingLeft: 10, paddingRight: 5}}/>
                <Radio label="C형" style={{paddingLeft: 10, paddingRight: 5}}/>
                <Button floated='right' color={"green"} style={{
                    marginTop: -14,
                    marginRight: -21,
                    paddingTop: 16,
                    paddingBottom: 16
                }}>작성TIP</Button>
            </Message>
            <TextArea autoHeight={true} className="ui segment attached"/>
            {(meta.invalid) && <label>{meta.error}</label>}
        </div>
    </Form.Field>

);
export const LRFieldSubmit = ({input: {onChange, onBlur,}, meta, hasFileUpload, disabled,}) => {
    return (

        <Form.Field error={meta.touched && meta.invalid}>
            <Segment basic={true} style={{
                margin: 0,
                paddingLeft: 0,
                paddingRight: 0
            }}>
                <Button content='내려받기' icon='download' labelPosition='left' floated='right'
                        onClick={(e, {value}) => {
                            onChange("download");
                        }}
                        disabled={disabled}/>
                <Button content='저장하기' color="green" floated='right'
                        onClick={(e, {value}) => {
                            onChange("submit");
                        }}
                        disabled={disabled}/>
                <Button content='이미지 업로드' icon='upload' labelPosition='left'
                        style={{visibility: hasFileUpload || "hidden"}}
                        onClick={(e, {value}) => {
                            onChange("imgupload");
                        }}/>
            </Segment>
        </Form.Field>

    );
}
export const LRFieldRadioGroup = ({input: {onChange, value, ...left}, meta, label, options}) => {

    return (
        <Form.Field error={meta.invalid}>
            <Input className="labeled">
                <Label>{label}</Label>
                <Segment style={{margin: 0, paddingTop: 9, paddingBottom: 9, width: "100%"}}>
                    {options.map((item, index) =>
                        <Radio
                            key={index}
                            label={item}
                            name={name}
                            value={item}
                            checked={value === item  }
                            onChange={(e, {value}) => {
                                onChange(value)
                            }}
                            style={{marginRight: 16}}
                        />
                    )}
                </Segment>
            </Input>
            {(meta.invalid) && <label>{meta.error}</label>}
        </Form.Field>

    );
}