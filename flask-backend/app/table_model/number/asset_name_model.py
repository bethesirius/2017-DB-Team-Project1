from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String

from orm.session import Base


class AssetNameModel(Base):
    __tablename__ = "asset_name"
    id = Column(Integer, primary_key=True, autoincrement=True)
    asset_name = Column(String(100))

