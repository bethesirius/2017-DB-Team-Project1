from sqlalchemy import Column
from sqlalchemy import ForeignKey
from sqlalchemy import Integer

from orm.session import Base
from table_model.location.detail_location_model import DetailLocationModel
from table_model.number.asset_model import AssetModel


class DeviceModel(Base):
    __tablename__ = "device"
    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    asset_id = Column(Integer, ForeignKey(AssetModel.id))
    manage_num = Column(Integer)
    location_id = Column(Integer, ForeignKey(DetailLocationModel.id))



