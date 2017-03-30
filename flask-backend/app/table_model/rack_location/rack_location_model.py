from sqlalchemy import Column
from sqlalchemy import Integer

from orm.session import Base


class RackLocationModel(Base):
    __tablename__ = "rack_location"
    id = Column(Integer, primary_key=True, autoincrement=True)
    start_index = Column(Integer)
    end_index = Column(Integer)
