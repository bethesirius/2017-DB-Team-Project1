from sqlalchemy import Column
from sqlalchemy import ForeignKey
from sqlalchemy import Integer

from orm.session import Base
from table_model.location.detail_location_model import DetailLocationModel
from table_model.service.service_model import ServiceModel


class RackLocationModel(Base):
    __tablename__ = "rack_location"
    id = Column(Integer, primary_key=True, autoincrement=True)
    start_index = Column(Integer)
    end_index = Column(Integer)
    location_id = Column(Integer, ForeignKey(DetailLocationModel.id))
    service_id = Column(Integer, ForeignKey(ServiceModel.id))