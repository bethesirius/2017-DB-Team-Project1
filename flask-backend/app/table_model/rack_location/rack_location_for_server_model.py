from sqlalchemy import Column
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy.orm import relationship

from app.table_model.rack_location.rack_location_model import RackLocationModel
from app.table_model.device.server_model import ServerModel


class RackLocationForServerModel(RackLocationModel):
    __tablename__ = "rack_location_for_server"
    id = Column(Integer, ForeignKey(RackLocationModel.id), primary_key=True, autoincrement=True)
    server_id = Column(Integer, ForeignKey(ServerModel.id))
    server = relationship('ServerModel', backref='rack_location_for_server')
    rack_location = relationship('RackLocationModel')
