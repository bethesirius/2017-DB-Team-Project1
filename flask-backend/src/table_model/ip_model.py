# IP 리스트
from sqlalchemy import Column
from sqlalchemy import Integer

from orm.session import Base


class IpModel(Base):
    __tablename__ = "ip"
    id = Column(Integer, primary_key=True, autoincrement=True)



