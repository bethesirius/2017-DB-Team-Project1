# Rack
from sqlalchemy import Column
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy.orm import relationship

from app.table_model.device.device_model import DeviceModel
from app.table_model.device.spec.rack_spec_model import RackSpecModel


class RackModel(DeviceModel):
    __tablename__ = "rack"
    id = Column(Integer, ForeignKey(DeviceModel.id), primary_key=True)
    device = relationship('DeviceModel')
    spec_id = Column(Integer, ForeignKey(RackSpecModel.id))
    spec = relationship('RackSpecModel')
    rack_size = Column(Integer)
