# 유닛(서버, 스토리지, 스위치, 랙 리스트)
from sqlalchemy import Column
from sqlalchemy import Integer

from orm.session import Base


class UnitModel(Base):
    __tablename__ = "unit"
    id = Column(Integer, primary_key=True, autoincrement=True)



