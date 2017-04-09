from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String

from app import db


class SwitchSpecModel(db.Model):
    __tablename__ = "switch_spec"
    id = Column(Integer, primary_key=True, autoincrement=True)
    spec = Column(String(100))

