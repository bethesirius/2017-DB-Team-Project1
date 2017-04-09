# Rack
from sqlalchemy import Column
from sqlalchemy import ForeignKey
from sqlalchemy import Integer

from app.table_model.device.device_model import DeviceModel
from app.table_model.device.spec.rack_spec_model import RackSpecModel


class RackModel(DeviceModel):
    __tablename__ = "rack"
    id = Column(Integer, ForeignKey(DeviceModel.id), primary_key=True)
    rack_size = Column(Integer)
    spec_id = Column(Integer, ForeignKey(RackSpecModel.id))


