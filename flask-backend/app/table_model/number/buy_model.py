from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String

from orm.session import Base


class BuyModel(Base):
    __tablename__ = "buy"
    id = Column(Integer, primary_key=True, autoincrement=True)
    buy_name = Column(String(100))
