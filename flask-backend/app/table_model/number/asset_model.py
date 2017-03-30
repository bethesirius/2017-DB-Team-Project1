# 자산 번호
from sqlalchemy import Column
from sqlalchemy import DateTime
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy import String

from app.orm.session import Base
from table_model.number.asset_name_model import AssetNameModel
from table_model.number.buy_model import BuyModel
from table_model.number.standard_model import StandardModel


class AssetModel(Base):
    __tablename__ = "asset"
    __table_args__ = {'mysql_engine': 'InnoDB'}
    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    asset_num = Column(Integer)
    get_date = Column(DateTime)
    asset_name_id = Column(Integer, ForeignKey(AssetNameModel.id))
    standard_id = Column(Integer, ForeignKey(StandardModel.id))
    years = Column(Integer)
    price = Column(Integer)
    buy = Column(Integer, ForeignKey(BuyModel.id))
