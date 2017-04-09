from sqlalchemy import Column
from sqlalchemy import ForeignKey
from sqlalchemy import Integer

from app import db
from app.table_model.rack_location.device_info import DeviceInfo
from app.table_model.rack_location.for_server_model import DeviceInfoForServerModel
from app.table_model.rack_location.rack_location_model import RackLocationModel


class RackLocationForServerModel(RackLocationModel):
    __tablename__ = "rack_location_for_server"
    id = Column(Integer, ForeignKey(RackLocationModel.id), primary_key=True, autoincrement=True)
    device_info_id = Column(Integer, ForeignKey(DeviceInfoForServerModel.id))
