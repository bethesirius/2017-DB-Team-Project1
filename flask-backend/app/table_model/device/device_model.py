from sqlalchemy import Column
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy.orm import relationship

from app import db
from app.table_model.number.asset_model import AssetModel


class DeviceModel(db.Model):
    __tablename__ = "device"
    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    asset_id = Column(Integer, ForeignKey(AssetModel.id))
    asset = relationship('AssetModel')
    manage_num = Column(Integer)




