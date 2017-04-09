from sqlalchemy import Column
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy import String

from app import db
from app.table_model.device.rack_model import RackModel
from app.table_model.location.location_model import LocationModel


class DetailLocationModel(db.Model):
    __tablename__ = "detail_location"
    id = Column(Integer, primary_key=True, autoincrement=True)
    location_id = Column(Integer, ForeignKey(LocationModel.id))
    detail = Column(String(100))
    rack_id = Column(Integer, ForeignKey(RackModel.id))
