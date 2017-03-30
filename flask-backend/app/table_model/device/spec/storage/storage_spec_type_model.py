from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String

from orm.session import Base


class StorageSpecTypeModel(Base):
    __tablename__ = "storage_spec_type"
    id = Column(Integer, primary_key=True, autoincrement=True)
    spec_type = Column(String(100))

