from sqlalchemy import Column, Integer, String

from app import db


class UpsSpecModel(db.Model):
    __tablename__ = "ups_spec"
    id = Column(Integer, primary_key=True, autoincrement=True)
    spec = Column(String(100))