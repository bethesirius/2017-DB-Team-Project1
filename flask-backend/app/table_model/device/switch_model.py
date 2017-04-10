# 스위치
from sqlalchemy import Column
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy.orm import relationship

from app.table_model.device.device_model import DeviceModel
from app.table_model.device.spec.switch_spec_model import SwitchSpecModel
from app.table_model.location.detail_location_model import DetailLocationModel


class SwitchModel(DeviceModel):
    __tablename__ = "switch"
    id = Column(Integer, ForeignKey(DeviceModel.id), primary_key=True)
    device = relationship('DeviceModel')
    spec_id = Column(Integer, ForeignKey(SwitchSpecModel.id))
    spec = relationship('SwitchSpecModel')
    location_id = Column(Integer, ForeignKey(DetailLocationModel.id))
    location = relationship('DetailLocationModel')
    size = Column(Integer)
