from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String

from app import db


class StandardModel(db.Model):
    __tablename__ = "standard"
    id = Column(Integer, primary_key=True, autoincrement=True)
    standard_name = Column(String(100))

