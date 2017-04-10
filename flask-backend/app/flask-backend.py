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

# @app.route('/')
# def hello_world():
#     return 'Hello World!'


if __name__ == '__main__':
    app.run(host="0.0.0.0")
