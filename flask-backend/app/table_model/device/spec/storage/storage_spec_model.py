from sqlalchemy import Column
from sqlalchemy import DateTime
from sqlalchemy import Float
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy import String


from orm.session import Base
from table_model.device.spec.storage.storage_spec_name_model import StorageSpecNameModel
from table_model.device.spec.storage.storage_spec_type_model import StorageSpecTypeModel


class StorageSpecModel(Base):
    __tablename__ = "storage_spec"
    id = Column(Integer, primary_key=True, autoincrement=True)
    spec_id = Column(Integer, ForeignKey(StorageSpecNameModel.id))
    registration_date = Column(DateTime)
    disk_spec = Column(String(100))
    disk_type_id = Column(Integer, ForeignKey(StorageSpecTypeModel.id))
    volume = Column(Float)


