import datetime
import time

from app import db
from app.table_model.device.device_model import DeviceModel
from app.table_model.device.rack_model import RackModel
from app.table_model.device.server_model import ServerModel
from app.table_model.device.spec.rack_spec_model import RackSpecModel
from app.table_model.device.spec.server_spec_model import ServerSpecModel
from app.table_model.device.spec.switch_spec_model import SwitchSpecModel
from app.table_model.device.switch_model import SwitchModel
from app.table_model.location.detail_location_model import DetailLocationModel
from app.table_model.number.asset_model import AssetModel
from app.table_model.rack_location.for_server_model import DeviceInfoForServerModel
from app.table_model.rack_location.for_switch_model import DeviceInfoForSwitchModel
from app.table_model.rack_location.rack_location_for_server_model import RackLocationForServerModel
from app.table_model.rack_location.rack_location_for_switch_model import RackLocationForSwitchModel
from app.table_model.rack_location.rack_location_model import RackLocationModel
from app.table_model.service.service_name_model import ServiceNameModel

b = datetime.datetime.now()
print(b)

#
rack_id = 2
detail_location = db.session.query(DetailLocationModel).filter_by(rack_id=rack_id).first()
rack = db.session.query(RackModel).filter_by(id=rack_id).first()
# rack_device = db.session.query(DeviceModel).filter_by(id=rack_id).first()
server_list = db.session.query(RackLocationForServerModel).filter_by(location_id=detail_location.id).all()
switch_list = db.session.query(RackLocationForSwitchModel).filter_by(location_id=detail_location.id).all()

print(detail_location.detail+"-"+rack.manage_num)

print("server count : "+str(len(server_list)))
print("switch count : "+str(len(switch_list)))

for rack_lc in server_list:
    s_id1 = rack_lc.service_id

    s_name1 = db.session.query(ServiceNameModel).filter_by(id=s_id1).first()
    s_011 = rack_lc.service_on_off
    index1 = rack_lc.start_index
    # s_device_name = db.session.query(ServerModel).filter_by(id=rack_lc.)
    s_server_id = rack_lc.server_id
    server = db.session.query(ServerModel).filter_by(id=s_server_id).first()
    server_spec = db.session.query(ServerSpecModel).filter_by(id=server.spec_id).first()
    ip1 = db.session.query(DeviceInfoForServerModel).filter_by(server_id=s_server_id).first()
    if ip1 is None:
        ip1_temp = ""
    else:
        ip1_temp = ip1.ip_v4

    print("ip : " + ip1_temp + " / index : " + str(index1)
          + " / size : " + str(server.size)
          + " / 관리번호 : " + server.manage_num
          + " / spec : " + server_spec.spec
          + " / service name : "+s_name1.service_name)

for rack_lc in switch_list:
    s_id2 = rack_lc.service_id
    s_name2 = db.session.query(ServiceNameModel).filter_by(id=s_id2).first()
    s_012 = rack_lc.service_on_off
    index2 = rack_lc.start_index
    s_switch_id = rack_lc.switch_id
    switch = db.session.query(SwitchModel).filter_by(id=s_switch_id).first()
    switch_spec = db.session.query(SwitchSpecModel).filter_by(id=switch.spec_id).first()
    ip2 = db.session.query(DeviceInfoForSwitchModel).filter_by(switch_id=s_switch_id).first()
    if ip2 is None:
        ip2_temp = ""
    else:
        ip2_temp = ip2.ip_v4

    print("ip : " + ip2_temp + " / index : " + str(index2)
          + " / size : " + str(switch.size) + " / 관리번호 : " + switch.manage_num
          + " / spec : " + switch_spec.spec
          + " / service name : "+s_name2.service_name)

a = datetime.datetime.now()
print(a-b)
