from sqlalchemy import Column, Boolean
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy.orm import relationship

from app import db
from app.table_model.location.detail_location_model import DetailLocationModel
from app.table_model.service.service_model import ServiceNameModel


class RackLocationModel(db.Model):
    __tablename__ = "rack_location"
    id = Column(Integer, primary_key=True, autoincrement=True)
    location_id = Column(Integer, ForeignKey(DetailLocationModel.id))
    service_id = Column(Integer, ForeignKey(ServiceNameModel.id))
    service_on_off = Column(Boolean)
    index = Column(Integer)
    service_name = relationship('ServiceNameModel')
