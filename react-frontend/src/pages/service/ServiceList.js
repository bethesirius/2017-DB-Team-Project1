/**
 * Created by rino0 on 2017-03-27.
 */
import React from "react";
import {Button, Dimmer, Header, Loader, Segment} from "semantic-ui-react";
import {Link} from "react-router";
import ItemGroup from "../../component/ItemGroup";
import TotalUseStatisticGroup from "../../component/TotalUseStatisticGroup";

class ServiceList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            data: [],
            statistic_use: [
                {icon: "computer", label: 'CPU(core)', value: 0},
                {icon: "database", label: 'DISK_SAN(TB)', value: 0},
                {icon: "database", label: 'DISK_NAS(TB)', value: 0},
                {icon: "database", label: 'DISK_Total', value: 0},
                {icon: "disk outline", label: 'TAPE(TB)', value: 0},
            ],
            statistic_not: [
                {icon: "computer", label: 'CPU(core)', value: 0},
                {icon: "database", label: 'DISK_SAN(TB)', value: 0},
                {icon: "database", label: 'DISK_NAS(TB)', value: 0},
                {icon: "database", label: 'DISK_Total', value: 0},
                {icon: "disk outline", label: 'TAPE(TB)', value: 0},
            ],
        };
    }

    // getChildContext() {}
    componentDidMount() {
        this.setState({isFetching: true});
        Promise.all([
            fetch("/api/service_name").then(res => res.ok ? res.json() : Promise.reject(new Error("서버에서 요청을 거절 했습니다."))),
            fetch("/api/storage").then(res => res.ok ? res.json() : Promise.reject(new Error("서버에서 요청을 거절 했습니다."))),
            fetch("/api/rack_location_for_server").then(res => res.ok ? res.json() : Promise.reject(new Error("서버에서 요청을 거절 했습니다."))),
            fetch("/api/storage_spec_type").then(res => res.ok ? res.json() : Promise.reject(new Error("서버에서 요청을 거절 했습니다."))),
        ]).then(([name, storage, server, type]) => {
            let data = name.objects.map((item, nindex, src) => {
                let service_name = item.service_name;
                let service_name_id = item.id;
                let services = item.service;
                let use = {core_num: 0, san: 0, nas: 0, total: 0, tape: 0,};
                let not = {core_num: 0, san: 0, nas: 0, total: 0, tape: 0,};
                server.objects.forEach((item, index, src) => {
                    let s_name_id = item.service_name.id;
                    if (s_name_id === service_name_id) {
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
                return {
                    id: item.id,
                    service_name,
                    service: use,
                    not,
                }
            });
            let total_use = data.reduce((prev, current) => {
                prev.core_num += current.service.core_num;
                prev.san += current.service.san;
                prev.nas += current.service.nas;
                prev.total += current.service.total;
                prev.tape += current.service.tape;
                return prev;
            }, {core_num: 0, san: 0, nas: 0, total: 0, tape: 0,});
            let total_not = data.reduce((prev, current) => {
                prev.core_num += current.not.core_num;
                prev.san += current.not.san;
                prev.nas += current.not.nas;
                prev.total += current.not.total;
                prev.tape += current.not.tape;
                return prev;
            }, {core_num: 0, san: 0, nas: 0, total: 0, tape: 0,});
            this.setState((state, props) => {
                state.statistic_use[0].value = Math.ceil(total_use.core_num);
                state.statistic_use[1].value = Math.ceil(total_use.san);
                state.statistic_use[2].value = Math.ceil(total_use.nas);
                state.statistic_use[3].value = Math.ceil(total_use.total);
                state.statistic_use[4].value = Math.ceil(total_use.tape);

                state.statistic_not[0].value = Math.ceil(total_not.core_num);
                state.statistic_not[1].value = Math.ceil(total_not.san);
                state.statistic_not[2].value = Math.ceil(total_not.nas);
                state.statistic_not[3].value = Math.ceil(total_not.total);
                state.statistic_not[4].value = Math.ceil(total_not.tape);

                state.data = data;
                state.isFetching = false;
                return state;
            });
        }).catch(err => {
            alert(err.message);
            this.setState({isFetching: false});
        });
    }

    // componentWillUnmount(){}
    render() {
        return (
            <Dimmer.Dimmable as="div">
                <Dimmer active={this.state.isFetching}>
                    <Loader size='massive'>Loading</Loader>
                </Dimmer>
                <Segment attached={true}>
                    <Header>사용중인 자원</Header>
                    <TotalUseStatisticGroup items={this.state.statistic_use}/>
                    <Header>미사용중인 자원</Header>
                    <TotalUseStatisticGroup items={this.state.statistic_not}/>
                </Segment>
                <Button.Group attached='bottom'>
                    <Button as={Link} to="/service/form" primary={true} icon="add" labelPosition='left'
                            content={"새 서비스 등록 하기"}/>
                </Button.Group>
                <ItemGroup.Service items={this.state.data}/>
            </Dimmer.Dimmable>
        );
    }
}


export default ServiceList;