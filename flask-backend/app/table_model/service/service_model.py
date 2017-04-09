# 서비스
from sqlalchemy import Column
from sqlalchemy import Float
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy import String

from app import db
from app.table_model.device.spec.storage.storage_spec_model import StorageSpecModel
from app.table_model.service.service_name_model import ServiceNameModel


class ServiceModel(db.Model):
    __tablename__ = "service"
    id = Column(Integer, primary_key=True, autoincrement=True)
    storage_spec_id = Column(Integer, ForeignKey(StorageSpecModel.id))
    used_size = Column(Float)
    service_name_id = Column(Integer, ForeignKey(ServiceNameModel.id))
    usage = Column(String(100))


