from sqlalchemy import Column
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy.orm import relationship

from app.table_model.rack_location.device_info import DeviceInfo
from table_model.device.ups_model import UpsModel


class DeviceInfoForUpsModel(DeviceInfo):
    __tablename__ = "device_info_for_server"
    id = Column(Integer, ForeignKey(DeviceInfo.id), primary_key=True)
    ups_id = Column(Integer, ForeignKey(UpsModel.id))
    ups = relationship('UpsModel')
