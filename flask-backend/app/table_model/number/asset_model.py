# 자산 번호
from sqlalchemy import Column, BigInteger
from sqlalchemy import DateTime
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy.orm import relationship

from app import db
from app.table_model.number.asset_name_model import AssetNameModel
from app.table_model.number.buy_model import BuyModel
from app.table_model.number.standard_model import StandardModel


class AssetModel(db.Model):
    __tablename__ = "asset"
    __table_args__ = {'mysql_engine': 'InnoDB'}
    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    asset_num = Column(Integer)
    get_date = Column(DateTime)
    asset_name_id = Column(Integer, ForeignKey(AssetNameModel.id))
    asset_name = relationship("AssetNameModel")
    standard_id = Column(Integer, ForeignKey(StandardModel.id))
    standard = relationship("StandardModel")
    years = Column(Integer)
    price = Column(BigInteger)
    buy = Column(Integer, ForeignKey(BuyModel.id))
    buy_ = relationship("BuyModel")
