from sqlalchemy import ForeignKey, Integer, Column, String, Boolean
from sqlalchemy.orm import relationship

from table_model.device.device_model import DeviceModel
from table_model.device.spec.ups_spec_model import UpsSpecModel
from table_model.location.location_model import LocationModel


class UpsModel(DeviceModel):
    __tablename__ = "ups"
    id = Column(Integer, ForeignKey(DeviceModel.id), primary_key=True)
    device = relationship('DeviceModel')
    spec_id = Column(Integer, ForeignKey(UpsSpecModel.id))
    location_id = Column(Integer, ForeignKey(LocationModel.id))
    location = relationship('LocationModel')