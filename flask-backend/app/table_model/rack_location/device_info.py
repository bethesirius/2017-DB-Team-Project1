from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String

from orm.session import Base, engine


class DeviceInfo(Base):
    __tablename__ = "device_info"
    id = Column(Integer, primary_key=True, autoincrement=True)
    ip_v4 = Column(String(15))


