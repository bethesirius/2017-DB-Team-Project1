from app import manager, app
from app.table_model.device.device_model import DeviceModel
from app.table_model.device.switch_model import SwitchModel
from app.table_model.device.rack_model import RackModel
from app.table_model.device.server_model import ServerModel
from app.table_model.device.spec.rack_spec_model import RackSpecModel
from app.table_model.device.spec.server_spec_model import ServerSpecModel
from app.table_model.device.spec.storage.storage_spec_model import StorageSpecModel
from app.table_model.device.spec.storage.storage_spec_name_model import StorageSpecNameModel
from app.table_model.device.spec.storage.storage_spec_type_model import StorageSpecTypeModel
from app.table_model.device.spec.switch_spec_model import SwitchSpecModel
from app.table_model.device.storage_model import StorageModel
from app.table_model.location.detail_location_model import DetailLocationModel
from app.table_model.location.location_model import LocationModel
from app.table_model.number.asset_model import AssetModel
from app.table_model.number.asset_name_model import AssetNameModel
from app.table_model.number.buy_model import BuyModel
from app.table_model.number.standard_model import StandardModel
from app.table_model.rack_location.device_info import DeviceInfo
from app.table_model.rack_location.for_server_model import DeviceInfoForServerModel
from app.table_model.rack_location.for_switch_model import DeviceInfoForSwitchModel
from app.table_model.rack_location.rack_location_for_server_model import RackLocationForServerModel
from app.table_model.rack_location.rack_location_for_switch_model import RackLocationForSwitchModel
from app.table_model.rack_location.rack_location_model import RackLocationModel
from app.table_model.service.service_model import ServiceModel
from app.table_model.service.service_name_model import ServiceNameModel

METHODS = ['GET', 'POST', 'DELETE', 'PUT']

manager.create_api(AssetModel, methods=METHODS, results_per_page=1000, max_results_per_page=1000)
manager.create_api(StorageSpecNameModel, methods=METHODS, results_per_page=1000, max_results_per_page=1000)
manager.create_api(StorageSpecTypeModel, methods=METHODS, results_per_page=1000, max_results_per_page=1000)
manager.create_api(StorageSpecModel, methods=METHODS, results_per_page=1000, max_results_per_page=1000)
manager.create_api(RackSpecModel, methods=METHODS, results_per_page=1000, max_results_per_page=1000)
manager.create_api(ServerSpecModel, methods=METHODS, results_per_page=1000, max_results_per_page=1000)
manager.create_api(SwitchSpecModel, methods=METHODS, results_per_page=1000, max_results_per_page=1000)
manager.create_api(DeviceModel, methods=METHODS, results_per_page=1000, max_results_per_page=1000)
manager.create_api(RackModel, methods=METHODS, results_per_page=1000, max_results_per_page=1000)
manager.create_api(ServerModel, methods=METHODS, results_per_page=1000, max_results_per_page=1000)
manager.create_api(StorageModel, methods=METHODS, results_per_page=1000, max_results_per_page=1000)
manager.create_api(SwitchModel, methods=METHODS, results_per_page=1000, max_results_per_page=1000)
manager.create_api(LocationModel, methods=METHODS, results_per_page=1000, max_results_per_page=1000)
manager.create_api(DetailLocationModel, methods=METHODS, results_per_page=1000, max_results_per_page=1000)
manager.create_api(AssetNameModel, methods=METHODS, results_per_page=1000, max_results_per_page=1000)
manager.create_api(BuyModel, methods=METHODS, results_per_page=1000, max_results_per_page=1000)
manager.create_api(StandardModel, methods=METHODS, results_per_page=1000, max_results_per_page=1000)
manager.create_api(DeviceInfoForServerModel, methods=METHODS, results_per_page=1000, max_results_per_page=1000)
manager.create_api(DeviceInfoForSwitchModel, methods=METHODS, results_per_page=1000, max_results_per_page=1000)
manager.create_api(DeviceInfo, methods=METHODS, results_per_page=1000, max_results_per_page=1000)
manager.create_api(RackLocationForServerModel, methods=METHODS, results_per_page=1000, max_results_per_page=1000)
manager.create_api(RackLocationForSwitchModel, methods=METHODS, results_per_page=1000, max_results_per_page=1000)
manager.create_api(RackLocationModel, methods=METHODS, results_per_page=1000, max_results_per_page=1000)
manager.create_api(ServiceModel, methods=METHODS, results_per_page=1000, max_results_per_page=1000)
manager.create_api(ServiceNameModel, methods=METHODS, results_per_page=1000, max_results_per_page=1000)

# @app.route('/')
# def hello_world():
#     return 'Hello World!'

from app.orm.session import engine
@app.route('/cheat/rack_info')
def rack_info():
    import json
    json_result={}

    result= engine.execute('select rack_device.manage_num as rack_num, rack_size, ip_v4, server_device.manage_num as server_num, size, start_index, service_name\
 from (select manage_num, rack.id as rack_id, rack.rack_size as rack_size\
 from rack, device\
 where rack.id= device.id) as rack_device,\
 (select ip_v4, server_id, size, detail_rack_id, start_index, service_name\
 from service_name,\
 (select ip_v4, server_ip.server_id, size, detail_rack_id, start_index, location_id, service_id\
 from (select ip_v4, device_info_for_server.server_id as server_id\
 from device_info, device_info_for_server\
 where device_info.id = device_info_for_server.id) as server_ip,\
 (select server_loc.server_id, server_detail_loc.size, detail_rack_id, start_index, location_id, service_id\
 from (select server.id as server_id, detail_location.id as detail_location_id, server.size as size, detail_location.rack_id as detail_rack_id\
 from server, detail_location \
 where server.location_id= detail_location.id) as server_detail_loc,\
 (select server.id as server_id, start_index, location_id, service_id\
 from server,\
 (select rack_location.location_id as rack_location_id, rack_location_for_server.server_id as rack_location_for_server_id, start_index, service_id\
 from rack_location, rack_location_for_server\
 where rack_location.id= rack_location_for_server.id) as rack_server\
 where rack_server.rack_location_for_server_id= server.id) as server_loc\
 where server_loc.server_id= server_detail_loc.server_id) as server_rack_index\
 where server_rack_index.server_id= server_ip.server_id) as server_rack_service\
 where service_id= service_name.id) as server_rack_service_name,\
 (select manage_num, server.id as server_id\
 from server, device\
 where server.id= device.id) as server_device\
 where server_rack_service_name.detail_rack_id= rack_device.rack_id and server_device.server_id= server_rack_service_name.server_id')
    server_result= result.fetchall()
    json_result['server']=list(map(lambda x: [x[0], x[1], x[2], x[3], x[4], x[5], x[6]], server_result))

    result= engine.execute('select rack_device.manage_num as rack_num, rack_size, ip_v4, switch_device.manage_num as switch_num, size, start_index\
 from (select manage_num, rack.id as rack_id, rack.rack_size as rack_size\
 from rack, device\
 where rack.id= device.id) as rack_device,\
 (select ip_v4, switch_ip.switch_id as switch_id, size, detail_rack_id, start_index, location_id\
 from (select ip_v4, device_info_for_switch.switch_id as switch_id\
 from device_info, device_info_for_switch\
 where device_info.id = device_info_for_switch.id) as switch_ip,\
 (select switch_loc.switch_id, switch_detail_loc.size, detail_rack_id, start_index, location_id\
 from (select switch.id as switch_id, detail_location.id as detail_location_id, switch.size as size, detail_location.rack_id as detail_rack_id\
 from switch, detail_location \
 where switch.location_id= detail_location.id) as switch_detail_loc,\
 (select switch.id as switch_id, start_index, location_id\
 from switch,\
 (select rack_location.location_id as rack_location_id, rack_location_for_switch.switch_id as rack_location_for_switch_id, start_index\
 from rack_location, rack_location_for_switch\
 where rack_location.id= rack_location_for_switch.id) as rack_switch\
 where rack_switch.rack_location_for_switch_id= switch.id) as switch_loc\
 where switch_loc.switch_id= switch_detail_loc.switch_id) as switch_rack_index\
 where switch_rack_index.switch_id= switch_ip.switch_id) as switch_rack_service,\
 (select manage_num, switch.id as switch_id\
 from switch, device\
 where switch.id= device.id) as switch_device\
 where switch_rack_service.detail_rack_id= rack_device.rack_id and switch_device.switch_id= switch_rack_service.switch_id')
    switch_result= result.fetchall()
    json_result['switch']=list(map(lambda x: [x[0], x[1], x[2], x[3], x[4], x[5], ''], switch_result))

    return json.dumps(json_result)


if __name__ == '__main__':
    app.run(host="0.0.0.0")
