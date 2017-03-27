import React from "react";
import {Button, Header, Item, Segment} from "semantic-ui-react";
import TableVariationItem from "../component/TableVariationItem";
import TotalUseStatisticGroup from "../component/TotalUseStatisticGroup";
import ServiceSummaryTable from "../component/ServiceSummaryTable";
import {Link} from "react-router";
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
                <Item.Group as={Segment} divided={true}>
                    <Header>등록된 서비스</Header>
                    <TableVariationItem header="Service00" description={<ServiceSummaryTable />} to="/"/>
                    <TableVariationItem header="Service00" description={<ServiceSummaryTable />} to="/rack"/>
                    <TableVariationItem header="Service00" description={<ServiceSummaryTable />}/>
                    <TableVariationItem header="Service00" description={<ServiceSummaryTable />}/>
                    <TableVariationItem header="Service00" description={<ServiceSummaryTable />}/>
                </Item.Group>
            </div>
        );
    }
}

export default Service;
