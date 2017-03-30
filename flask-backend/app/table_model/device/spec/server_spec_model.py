from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String

from orm.session import Base


class ServerSpecModel(Base):
    __tablename__ = "server_spec"
    id = Column(Integer, primary_key=True, autoincrement=True)
    spec = Column(String(100))

