from sqlalchemy import Column
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy import String

from orm.session import Base
from table_model.location.location_model import LocationModel


class DetailLocationModel(Base):
    __tablename__ = "detail_location"
    id = Column(Integer, primary_key=True, autoincrement=True)
    location_id = Column(Integer, ForeignKey(LocationModel.id))
    detail = Column(String(100))
