from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String

from app import db


class BuyModel(db.Model):
    __tablename__ = "buy"
    id = Column(Integer, primary_key=True, autoincrement=True)
    buy_name = Column(String(100))
