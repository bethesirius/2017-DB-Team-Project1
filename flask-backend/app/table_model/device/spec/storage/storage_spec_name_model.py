from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String

from orm.session import Base


class StorageSpecNameModel(Base):
    __tablename__ = "storage_spec_name"
    id = Column(Integer, primary_key=True, autoincrement=True)
    spec_name = Column(String(100))

