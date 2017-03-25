# 자산 번호
from sqlalchemy import Column
from sqlalchemy import Integer

from orm.session import Base


class AssetsModel(Base):
    __tablename__ = "assets"
    id = Column(Integer, primary_key=True, autoincrement=True)



