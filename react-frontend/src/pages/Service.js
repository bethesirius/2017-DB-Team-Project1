import React from "react";
import {Button, Header, Segment} from "semantic-ui-react";
import ItemGroup from "../component/ItemGroup";
import TotalUseStatisticGroup from "../component/TotalUseStatisticGroup";
import {Link} from "react-router";

const temp = {
    id:"test_id",
    service: {
        cpu: -1,
        san: -1,
        nas: -1,
        total: -1,
        tape: -1,
    },
    not: {
        cpu: -1,
        san: -1,
        nas: -1,
        total: -1,
        tape: -1,
    }
}

class Service extends React.Component {
    render() {
        return (
            <div>
                <Segment attached={true}>
                    <Header>총 사용량</Header>
                    <TotalUseStatisticGroup />
                    <Header>잔여 자원</Header>
                    <TotalUseStatisticGroup />
                </Segment>
                <Button.Group attached='bottom'>
                    <Button as={Link} to="/service/form" primary={true} icon="add" labelPosition='left'
                            content={"새 서비스 등록 하기"}/>
                </Button.Group>
                <ItemGroup.Service items={[temp, temp, temp]}/>
            </div>
        );
    }
}

export default Service;
