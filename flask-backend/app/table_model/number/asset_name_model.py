from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy.orm import relationship, backref

from app import db


class AssetNameModel(db.Model):
    __tablename__ = "asset_name"
    id = Column(Integer, primary_key=True, autoincrement=True)
    asset_name = Column(String(100))
