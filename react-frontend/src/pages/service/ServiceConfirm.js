/**
 * Created by rino0 on 2017-03-27.
 */
import React from "react";
import {browserHistory} from "react-router";
import {Button, Confirm, Dimmer, Header, Icon, Loader, Segment} from "semantic-ui-react";
import ItemGroup from "../../component/ItemGroup";
import TableVariationItem from "../../component/TableVariationItem";
import ServiceSummaryTable from "../../component/ServiceSummaryTable";

class ServiceConfirm extends React.Component {
    static propTypes = {};


    // static defaultProps = {};
    // static  childContextTypes = {};
    // static contextTypes = {};

    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            isDeleteConfirmOpen: false,
            service: {service: {}, not: {}}, //todo modify this.
            server: {list: [],},
            volume: {list: [],},
        };
    }

    // getChildContext() {}
    componentDidMount() {
        this.setState({isFetching: true});
        fetch("/json/asset.json")
            .then(res => res.ok ? res.json() : Promise.reject(new Error("서버에서 요청을 거절 했습니다.")))
            .then(() => {
                this.setState({isFetching: false,});
            })
            .catch(err => {
                this.setState({isFetching: false});
            });
    }

    // componentWillUnmount(){}

    handleDone = (event) => {
        event.preventDefault();
        browserHistory.push(`/service/`);
    };
    handleDelete = (event) => {
        event.preventDefault();
        this.setState({isDeleteConfirmOpen: true});
    };
    handleDeleteCancel = (event) => {
        event.preventDefault();
        this.setState({isDeleteConfirmOpen: false});
    };
    handleDeleteConfirm = (event) => {
        event.preventDefault();
        this.setState({isDeleteConfirmOpen: false});
        // todo do fetch API DELTE.
    };

    render() {
        const {params: {id},} = this.props;
        return (
            <Dimmer.Dimmable as="div">
                <Dimmer active={this.state.isFetching}>
                    <Loader size='massive'>Loading</Loader>
                </Dimmer>
                <Segment attached={true}>
                    <TableVariationItem header={id} description={<ServiceSummaryTable data={this.state.service}/>}/>
                    <Header>서비스:{id}에 등록된 장비 목록</Header>
                    <ItemGroup.Server items={this.state.server.list}/>
                    <ItemGroup.Storage items={this.state.volume.list}/>
                    <Confirm
                        open={this.state.isDeleteConfirmOpen}
                        header={<Header><Icon name="warning sign"/> 되돌리기 불가능한 작업</Header>}
                        content="정말로 이 서비스를 삭제 하시겠습니까??"
                        cancelButton='취소하기'
                        confirmButton="삭제하기"
                        onCancel={this.handleDeleteCancel}
                        onConfirm={this.handleDeleteConfirm}
                    />
                </Segment>
                <Button.Group attached={"bottom"}>
                    <Button
                        negative={true} content={"삭제하기"} icon='trash' labelPosition='left'
                        onClick={this.handleDelete}
                    />
                    <Button
                        positive={true} content={"목록으로"} icon='list' labelPosition='right'
                        onClick={this.handleDone}
                    />
                </Button.Group>
            </Dimmer.Dimmable>
        );
    }
}

export default ServiceConfirm;
