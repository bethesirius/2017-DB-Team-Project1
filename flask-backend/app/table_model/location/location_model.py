from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String

from orm.session import Base


class LocationModel(Base):
    __tablename__ = "location"
    id = Column(Integer, primary_key=True, autoincrement=True)
    location = Column(String(100))


