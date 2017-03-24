# 저장소
from sqlalchemy import Column
from sqlalchemy import Integer

from orm.session import Base


class StorageModel(Base):
    __tablename__ = "storage"
    id = Column(Integer, primary_key=True, autoincrement=True)



