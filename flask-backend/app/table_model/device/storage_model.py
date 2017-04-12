# 저장소
from sqlalchemy import Column, Boolean
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy.orm import relationship, backref

from app.table_model.device.device_model import DeviceModel
from app.table_model.device.spec.storage.storage_spec_model import StorageSpecModel
from app.table_model.location.location_model import LocationModel


class StorageModel(DeviceModel):
    __tablename__ = "storage"
    id = Column(Integer, ForeignKey(DeviceModel.id), primary_key=True)
    device = relationship('DeviceModel')
    spec_id = Column(Integer, ForeignKey(StorageSpecModel.id))
    spec = relationship('StorageSpecModel', backref=backref("storage", uselist=False))
    location_id = Column(Integer, ForeignKey(LocationModel.id))
    location = relationship('LocationModel')
    on = Column(Boolean)
