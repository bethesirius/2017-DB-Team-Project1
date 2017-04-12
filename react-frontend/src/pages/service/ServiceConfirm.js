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
    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            service_name: "",
            isDeleteConfirmOpen: false,
            service: {
                service: {core_num: 0, san: 0, nas: 0, total: 0, tape: 0,},
                not: {core_num: 0, san: 0, nas: 0, total: 0, tape: 0,},
            },
            server: {list: [],},
            volume: {list: [],},
        };
    }

    // getChildContext() {}
    componentDidMount() {
        this.setState({isFetching: true});
        const service_name_id = parseInt(this.props.params.id, 10);
        Promise.all([
            fetch(`/api/service_name/${service_name_id}`).then(res => res.ok ? res.json() : Promise.reject(new Error("서버에서 요청을 거절 했습니다."))),
            fetch("/api/storage").then(res => res.ok ? res.json() : Promise.reject(new Error("서버에서 요청을 거절 했습니다."))),
            fetch("/api/rack_location_for_server").then(res => res.ok ? res.json() : Promise.reject(new Error("서버에서 요청을 거절 했습니다."))),
            fetch("/api/storage_spec_type").then(res => res.ok ? res.json() : Promise.reject(new Error("서버에서 요청을 거절 했습니다."))),
        ]).then(([{service_name, service}, storage, server, type]) => {
            this.setState((state, props) => {
                let services = service;
                let use = {core_num: 0, san: 0, nas: 0, total: 0, tape: 0,};
                let not = {core_num: 0, san: 0, nas: 0, total: 0, tape: 0,};
                server.objects.forEach((item, index, src) => {
                    let s_name_id = item.service_name.id;
                    if (s_name_id === service_name_id) {
                        state.server.list.push(item.server);
                        if (item.server.on) {
                            use.core_num += item.server.core_num;
                        } else {
                            not.core_num += item.server.core_num;
                        }
                    }
                });
                storage.objects.forEach((item, index, src) => {
                    services.forEach((service, i, src) => {
                        if (service.storage_spec_id === item.spec_id) {
                            type.objects.forEach((t) => {
                                if (item.spec.disk_type_id === t.id) {
                                    state.volume.list.push(item);
                                    if (item.on) {
                                        use[t.spec_type.toLowerCase()] += service.used_size;
                                    } else {
                                        not[t.spec_type.toLowerCase()] += service.used_size;
                                    }
                                }
                            });
                        }
                    });
                });
                use.total = use.san + use.nas;
                not.total = not.san + not.nas;

                state.service_name = service_name;
                state.service.service = use;
                state.service.not = not;
                state.isFetching = false;
                return state;
            });

        }).catch(err => {
            alert(err.message);
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
        this.setState({isDeleteConfirmOpen: false, isFetching: true});
        fetch(`/api/service_name/${this.props.params.id}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"}
        }).then(res => {
            this.setState({isFetching: false});
            browserHistory.push(`/service`);
        }).catch(err => {
            alert(err.message);
            this.setState({isFetching: false});
        });
    };

    render() {
        return (
            <Dimmer.Dimmable as="div">
                <Dimmer active={this.state.isFetching}>
                    <Loader size='massive'>Loading</Loader>
                </Dimmer>
                <Segment attached={true}>
                    <TableVariationItem header={this.state.service_name}
                                        description={<ServiceSummaryTable data={this.state.service}/>}/>
                    <Header>서비스:{this.state.service_name}에 등록된 장비 목록</Header>
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
