from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String

from app import db


class LocationModel(db.Model):
    __tablename__ = "location"
    id = Column(Integer, primary_key=True, autoincrement=True)
    location = Column(String(100))


