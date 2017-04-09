from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String

from app import db


class StorageSpecNameModel(db.Model):
    __tablename__ = "storage_spec_name"
    id = Column(Integer, primary_key=True, autoincrement=True)
    spec_name = Column(String(100))

