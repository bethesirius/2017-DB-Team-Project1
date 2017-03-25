# 관리 번호
from sqlalchemy import Column
from sqlalchemy import Integer

from orm.session import Base


class ManageModel(Base):
    __tablename__ = "manage"
    id = Column(Integer, primary_key=True, autoincrement=True)






