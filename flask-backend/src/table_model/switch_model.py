# 스위치
from sqlalchemy import Column
from sqlalchemy import Integer

from orm.session import Base


class SwitchModel(Base):
    __tablename__ = "switch"
    id = Column(Integer, primary_key=True, autoincrement=True)



