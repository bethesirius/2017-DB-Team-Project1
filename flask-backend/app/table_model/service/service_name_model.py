from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String

from orm.session import Base


class ServiceNameModel(Base):
    __tablename__ = "service_name"
    id = Column(Integer, primary_key=True, autoincrement=True)
    service_name = Column(String(100))
