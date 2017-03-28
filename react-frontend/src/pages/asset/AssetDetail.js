/**
 * Created by rino0 on 2017-03-27.
 */
import React from "react";
import {Button, Dropdown, Header, Segment, Form} from "semantic-ui-react";

const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
]

class AssetDetail extends React.Component {
    static propTypes = {};
    // static defaultProps = {};
    // static  childContextTypes = {};
    // static contextTypes = {};

    constructor(props) {
        super(props);
        this.state = {
            type: null,
        };
    }

    // getChildContext() {}
    // componentDidMount(){}
    // componentWillUnmount(){}

    handleTypeChange = (value) => {
        this.setState({
            type: value,
        })
    };

    render() {
        const {params: {id},} = this.props;
        return (
            <div>
                <Segment>
                    <Form>
                        <Form.Select label='장비 타입' placeholder='추가 등록할 장비를 선택하세요.' fluid={true}
                                     onChange={this.handleTypeChange}
                                     options={options}
                        />
                    </Form>
                </Segment>
                <Segment attached={true}>
                    <Header>자산:{id}에 등록된 장비 목록</Header>

                </Segment>
                <Button.Group attached={"bottom"}>
                    <Button primary={true} content={"다음으로"} icon='right arrow' labelPosition='right'/>
                </Button.Group>
            </div>
        );
    }
}

export default AssetDetail;