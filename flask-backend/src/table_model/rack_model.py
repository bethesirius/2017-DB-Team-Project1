# Rack
from sqlalchemy import Column
from sqlalchemy import Integer

from orm.session import Base


class RackModel(Base):
    __tablename__ = "rack"
    id = Column(Integer, primary_key=True, autoincrement=True)



