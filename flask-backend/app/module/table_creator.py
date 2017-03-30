from app.orm.session import engine

import sqlalchemy_utils


# init database
def init_db():
    if sqlalchemy_utils.database_exists(engine.url):
        sqlalchemy_utils.drop_database(engine.url)
    sqlalchemy_utils.create_database(engine.url)


def step_1():
    from table_model.device.spec.rack_spec_model import RackSpecModel
    from table_model.device.spec.server_spec_model import ServerSpecModel
    from table_model.device.spec.storage.storage_spec_model import StorageSpecModel
    from table_model.device.spec.storage.storage_spec_name_model import StorageSpecNameModel
    from table_model.device.spec.storage.storage_spec_type_model import StorageSpecTypeModel
    from table_model.device.spec.switch_spec_model import SwitchSpecModel

    from table_model.location.detail_location_model import DetailLocationModel
    from table_model.location.location_model import LocationModel
    from table_model.number.asset_model import AssetModel

    from table_model.number.asset_name_model import AssetNameModel
    from table_model.number.buy_model import BuyModel
    from table_model.number.standard_model import StandardModel

    AssetNameModel.metadata.create_all(engine)
    StandardModel.metadata.create_all(engine)
    BuyModel.metadata.create_all(engine)
    AssetModel.metadata.create_all(engine)

    StorageSpecNameModel.metadata.create_all(engine)
    StorageSpecTypeModel.metadata.create_all(engine)
    StorageSpecModel.metadata.create_all(engine)
    RackSpecModel.metadata.create_all(engine)
    ServerSpecModel.metadata.create_all(engine)
    SwitchSpecModel.metadata.create_all(engine)

    LocationModel.metadata.create_all(engine)
    DetailLocationModel.metadata.create_all(engine)


# 알 수 없는 에러. query error 150
# DeviceModel에서 AssetModel.id를 Foreignkey로 지정하여 에러 발생
# 대체적으로 Type Error라는 글이 많은데
# local import로 바꿨을때 동작함
# 임포트 과정에서 먼저 validation을 체크해서 그런걸지도?
def step_2():
    from table_model.device.device_model import DeviceModel
    from table_model.device.rack_model import RackModel
    from table_model.device.server_model import ServerModel
    from table_model.device.storage_model import StorageModel
    from table_model.device.switch_model import SwitchModel

    DeviceModel.metadata.create_all(engine)
    RackModel.metadata.create_all(engine)
    ServerModel.metadata.create_all(engine)
    StorageModel.metadata.create_all(engine)
    SwitchModel.metadata.create_all(engine)


def step_3():
    from table_model.rack_location.device_info import DeviceInfo
    from table_model.rack_location.for_server_model import DeviceInfoForServerModel
    from table_model.rack_location.for_switch_model import DeviceInfoForSwitchModel
    from table_model.rack_location.rack_location_for_server_model import RackLocationForServerModel
    from table_model.rack_location.rack_location_for_switch_model import RackLocationForSwitchModel
    from table_model.service.service_model import ServiceModel
    from table_model.service.service_name_model import ServiceNameModel

    DeviceInfo.metadata.create_all(engine)
    DeviceInfoForServerModel.metadata.create_all(engine)
    DeviceInfoForSwitchModel.metadata.create_all(engine)
    RackLocationForServerModel.metadata.create_all(engine)
    RackLocationForSwitchModel.metadata.create_all(engine)

    ServiceNameModel.metadata.create_all(engine)
    ServiceModel.metadata.create_all(engine)


if __name__ == '__main__':
    init_db()
    step_1()
    step_2()
    step_3()
