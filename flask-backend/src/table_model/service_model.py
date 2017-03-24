# 서비스
from sqlalchemy import Column
from sqlalchemy import Integer

from orm.session import Base


class ServiceModel(Base):
    __tablename__ = "service"
    id = Column(Integer, primary_key=True, autoincrement=True)



