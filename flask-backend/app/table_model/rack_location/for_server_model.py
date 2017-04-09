from sqlalchemy import Column
from sqlalchemy import ForeignKey
from sqlalchemy import Integer

from app.table_model.device.device_model import DeviceModel
from app.table_model.device.server_model import ServerModel
from app.table_model.rack_location.device_info import DeviceInfo


class DeviceInfoForServerModel(DeviceInfo):
    __tablename__ = "device_info_for_server"
    id = Column(Integer, ForeignKey(DeviceInfo.id), primary_key=True)
    server_id = Column(Integer, ForeignKey(ServerModel.id))
