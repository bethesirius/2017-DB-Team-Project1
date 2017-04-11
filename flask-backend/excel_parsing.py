import os
import datetime

import xlrd as xlrd
import os 
from app.table_model.number.asset_name_model import AssetNameModel
from app.table_model.number.standard_model import StandardModel
from app.table_model.number.buy_model import BuyModel
from app.table_model.number.asset_model import AssetModel
from app.table_model.device.spec.rack_spec_model import RackSpecModel
from app.table_model.device.spec.server_spec_model import ServerSpecModel
from app.table_model.device.spec.storage.storage_spec_model import StorageSpecModel
from app.table_model.device.spec.storage.storage_spec_name_model import StorageSpecNameModel
from app.table_model.device.spec.storage.storage_spec_type_model import StorageSpecTypeModel
from app.table_model.device.spec.switch_spec_model import SwitchSpecModel
from app.table_model.location.detail_location_model import DetailLocationModel
from app.table_model.location.location_model import LocationModel
from app.table_model.device.device_model import DeviceModel
from app.table_model.device.rack_model import RackModel
from app.table_model.device.server_model import ServerModel
from app.table_model.device.storage_model import StorageModel
from app.table_model.device.switch_model import SwitchModel
from app.table_model.rack_location.device_info import DeviceInfo
from app.table_model.rack_location.for_server_model import DeviceInfoForServerModel
from app.table_model.rack_location.for_switch_model import DeviceInfoForSwitchModel
from app.table_model.service.service_model import ServiceModel
from app.table_model.service.service_name_model import ServiceNameModel
from app.table_model.rack_location.rack_location_for_server_model import RackLocationForServerModel
from app.table_model.rack_location.rack_location_for_switch_model import RackLocationForSwitchModel
from app.table_model.rack_location.rack_location_model import RackLocationModel



from sqlalchemy.orm import sessionmaker, scoped_session
from app.orm.session import engine

session_factory = sessionmaker(bind=engine)
Session = scoped_session(session_factory)
session = Session()

ASSET_SHEETS = ['TOTAL', 'SERVER', 'SWITCH', 'STORAGE', 'RACK']

def parsing_asset():
    x = xlrd.open_workbook(os.path.join(os.path.dirname(os.path.abspath(__file__)), "1_Asset-201703.xlsx"))
    sheet = x.sheet_by_name(ASSET_SHEETS[0])
    assetServerSheet = x.sheet_by_name(ASSET_SHEETS[1])
    assetSwitchSheet = x.sheet_by_name(ASSET_SHEETS[2])
    assetStorageSheet = x.sheet_by_name(ASSET_SHEETS[3])
    assetRackSheet = x.sheet_by_name(ASSET_SHEETS[4])
    storageFile = xlrd.open_workbook(os.path.join(os.path.dirname(os.path.abspath(__file__)), "2_Storage-201703.xlsx"))
    storageSheet = storageFile.sheet_by_name('Sheet2')
    ServiceFile = xlrd.open_workbook(os.path.join(os.path.dirname(os.path.abspath(__file__)), "Service Resources-201703.xlsx"))
    ServiceSheet = ServiceFile.sheet_by_name('2016.10자원현황')

    ncol = sheet.ncols
    nlow = sheet.nrows
    
    """ 
    #####################################
    print("-------- "+ASSET_SHEETS[0]+" --------")
    print("Number of col: " + str(ncol))
    print("Number of low: " + str(nlow))
    
    print("-------- Values of Excel file --------")
    values = set()
    for row in range(1,278):
        val = sheet.row_values(row)[2]
        values.add(val) 
    print(values)
    for value in values:
        newData = AssetNameModel(asset_name=value)
        session.add(newData)
    session.commit()

    values = set()
    for row in range(2,278):
        val = sheet.row_values(row)[3]
        values.add(val)
    print(values)
    for value in values:
        newData = StandardModel(standard_name=value)
        session.add(newData)
    session.commit()

    values = set()
    for row in range(2,278):
        val = sheet.row_values(row)[5]
        values.add(val)
    print(values)
    for value in values:
        newData = BuyModel(buy_name=value)
        session.add(newData)
    session.commit()
    
    for row in range(2,278):
        asset_num = sheet.row_values(row)[0]
        get_date = sheet.row_values(row)[1]
        asset_name = sheet.row_values(row)[2]
        standard_id = sheet.row_values(row)[3]
        years = sheet.row_values(row)[6]
        price = sheet.row_values(row)[4]
        buy = sheet.row_values(row)[5]
        get_date = datetime.datetime.strptime(get_date, '%Y-%m-%d')
        asset_name_id = session.query(AssetNameModel).filter_by(asset_name=asset_name).first().id
        standard_id = session.query(StandardModel).filter_by(standard_name=standard_id).first().id
        buy = session.query(BuyModel).filter_by(buy_name=buy).first().id
        newData = AssetModel(asset_num=asset_num, get_date=get_date, years=years, price=price)
        newData.asset_name_id = asset_name_id
        newData.standard_id = standard_id
        newData.buy = buy
        session.add(newData)
    session.commit()

    values = set()
    for row in range(6,114):
        val = storageSheet.row_values(row)[0]
        values.add(val)
    values.remove('') 
    print(values)
    for value in values:
        newData = StorageSpecNameModel(spec_name=value)
        session.add(newData)
    session.commit()
    
    values = set()
    for row in range(6,114):
        val = storageSheet.row_values(row)[3]
        values.add(val)
    values.remove('') 
    print(values)
    for value in values:
        newData = StorageSpecTypeModel(spec_type=value)
        session.add(newData)
    session.commit()
    
    for row in range(6,114):
        spec_id = storageSheet.row_values(row)[0]
        if spec_id == '':
            continue
        disk_spec = storageSheet.row_values(row)[2]
        disk_type_id = storageSheet.row_values(row)[3]
        volume = storageSheet.row_values(row)[4]
        spec_id = session.query(StorageSpecNameModel).filter_by(spec_name=spec_id).first().id
        disk_type_id = session.query(StorageSpecTypeModel).filter_by(spec_type=disk_type_id).first().id
        newData = StorageSpecModel(disk_spec=disk_spec, volume=volume)
        newData.spec_id = spec_id
        newData.disk_type_id = disk_type_id
        session.add(newData)
    session.commit()
    
    values = set()
    for row in range(1,23):
        val = assetRackSheet.row_values(row)[4]
        values.add(val)
    print(values)
    for value in values:
        newData = RackSpecModel(spec=value)
        session.add(newData)
    session.commit()
    
    values = set()
    for row in range(1,535):
        val = assetServerSheet.row_values(row)[4]
        values.add(val)
    print(values)
    for value in values:
        newData = ServerSpecModel(spec=value)
        session.add(newData)
    session.commit()

    values = set()
    for row in range(1,62):
        val = assetSwitchSheet.row_values(row)[4]
        values.add(val)
    print(values)
    for value in values:
        newData = SwitchSpecModel(spec=value)
        session.add(newData)
    session.commit()

    value = set()
    for row in range(1,23):
        asset_id = assetRackSheet.row_values(row)[0]
        manage_num = assetRackSheet.row_values(row)[1]
        spec_id = assetRackSheet.row_values(row)[4]
        rack_size = 42
        asset_id = session.query(AssetModel).filter_by(asset_num=asset_id).first().id
        spec_id = session.query(RackSpecModel).filter_by(spec=spec_id).first().id
        newData = RackModel(asset_id=asset_id, manage_num=manage_num, rack_size=rack_size, spec_id=spec_id)
        session.add(newData)
    session.commit()
    
    values = set()
    for row in range(4,39):
        val = ServiceSheet.row_values(row)[1]
        values.add(val)
    values.remove('') 
    print(values)
    for value in values:
        newData = ServiceNameModel(service_name=value)
        session.add(newData)
    session.commit()
    """ 
    


    
    """
    #######################################################
    #으아아앙 이건ㄴ 이따가 다시 꼭 봐서 으아ㅓ이ㅏㅇ해야함
    values = set()
    values_detail_location = set()
    for row in range(1,23):
        val = assetRackSheet.row_values(row)[3]
        location, detail_location = val.split("-")
        values.add(location)
        values_detail_location.add(detail_location)
    for row in range(1,535):
        val = assetServerSheet.row_values(row)[3]
        location, detail_location = val.split("-")
        values.add(location)
        values_detail_location.add(detail_location)
    for row in range(1,62):
        val = assetSwitchSheet.row_values(row)[3]
        location, detail_location = val.split("-")
        values.add(location)
        values_detail_location.add(detail_location)
    print(values)
    print(values_detail_location)
    for value in values:
        newData = LocationModel(location=value)
        session.add(newData)
    session.commit()
    for value in values_detail_location:
        location_id = session.query(LocationModel).filter_by(spec_type=disk_type_id).first().id
        newData = DetailLocationModel(detail=value)
        newData.location_id = 
        session.add(newData)
    session.commit()


    values = set()
    for row in range(1,62):
        asset_id = assetStorageSheet.row_values(row)[0]
        manage_num = assetStorageSheet.row_values(row)[1]
        spec_id = assetStorageSheet.row_values(row)[4]
        asset_id = session.query(AssetModel).filter_by(asset_num=asset_id).first().id
        spec_id = session.query(StorageSpecModel).filter_by(spec_id=spec_id).first().id
        newData = StorageModel(asset_id=asset_id, manage_num=manage_num, spec_id=spec_id)
        session.add(newData)
    session.commit()
 
    value = set()
    for row in range(1,535):
        asset_id = assetServerSheet.row_values(row)[0]
        manage_num = assetServerSheet.row_values(row)[1]
        asset_id = session.query(AssetModel).filter_by(asset_num=asset_id).first().id
        newData = DeviceModel(manage_num=manage_num)
        newData.asset_id = asset_id
        session.add(newData)
    session.commit()
    value = set()
    for row in range(1,62):
        asset_id = assetSwitchSheet.row_values(row)[0]
        manage_num = assetSwitchSheet.row_values(row)[1]
        asset_id = session.query(AssetModel).filter_by(asset_num=asset_id).first().id
        newData = DeviceModel(manage_num=manage_num)
        newData.asset_id = asset_id
        session.add(newData)
    session.commit()
    
    
    for row in range(1,23):
        manage_num = assetRackSheet.row_values(row)[1]
        rack_size = 42
        print(manage_num)
        spec_id = assetRackSheet.row_values(row)[4]
        print(session.query(DeviceModel).filter_by(manage_num=manage_num).first())
        manage_num = session.query(DeviceModel).filter_by(manage_num=manage_num).first().id
        print(1)
        spec_id = session.query(RackSpecModel).filter_by(spec=spec_id).first().id
        print(2)
        newData = RackModel(rack_size=3)
        print(3)
        newData.id = manage_num
        print(4)
        newData.spec_id = spec_id
        print(5)
        session.add(newData)
        print(newData)
        print(newData.id)
        print(newData.rack_size)
        print(newData.spec_id)
        session.commit()
        print(7)
    

    ############################################# 
    """

    # print(sheet.cell_value(2, 2))
    # print()
    pass


if __name__ == '__main__':
    parsing_asset()
    pass
