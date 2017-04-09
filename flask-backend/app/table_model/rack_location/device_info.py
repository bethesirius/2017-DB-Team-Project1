from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String

from app import db


class DeviceInfo(db.Model):
    __tablename__ = "device_info"
    id = Column(Integer, primary_key=True, autoincrement=True)
    ip_v4 = Column(String(15))


