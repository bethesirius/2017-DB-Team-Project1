# storage에 할당되는 볼륨
from sqlalchemy import Column
from sqlalchemy import Integer

from orm.session import Base


class VolumeModel(Base):
    __tablename__ = "volume"
    id = Column(Integer, primary_key=True, autoincrement=True)



