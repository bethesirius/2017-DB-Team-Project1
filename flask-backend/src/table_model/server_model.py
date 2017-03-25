# 서버
from sqlalchemy import Column
from sqlalchemy import Integer

from orm.session import Base


class ServerModel(Base):
    __tablename__ = "server"
    id = Column(Integer, primary_key=True, autoincrement=True)



