from sqlalchemy import Column
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy.orm import relationship

from app.table_model.rack_location.rack_location_model import RackLocationModel
from app.table_model.device.switch_model import SwitchModel


class RackLocationForSwitchModel(RackLocationModel):
    __tablename__ = "rack_location_for_switch"
    id = Column(Integer, ForeignKey(RackLocationModel.id), primary_key=True, autoincrement=True)
    switch_id = Column(Integer, ForeignKey(SwitchModel.id))
    switch = relationship('SwitchModel', backref='rack_location_for_switch')
    rack_location = relationship('RackLocationModel')
