from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String

from orm.session import Base


class StandardModel(Base):
    __tablename__ = "standard"
    id = Column(Integer, primary_key=True, autoincrement=True)
    standard_name = Column(String(100))

