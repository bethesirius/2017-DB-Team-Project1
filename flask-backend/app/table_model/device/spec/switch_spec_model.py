from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String

from orm.session import Base


class SwitchSpecModel(Base):
    __tablename__ = "switch_spec"
    id = Column(Integer, primary_key=True, autoincrement=True)
    spec = Column(String(100))

