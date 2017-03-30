# 스위치
from sqlalchemy import Column
from sqlalchemy import ForeignKey
from sqlalchemy import Integer

from app.orm.session import Base
from table_model.device.device_model import DeviceModel
from table_model.device.spec.switch_spec_model import SwitchSpecModel
from table_model.location.detail_location_model import DetailLocationModel


class SwitchModel(Base):
    __tablename__ = "switch"
    id = Column(Integer, ForeignKey(DeviceModel.id), primary_key=True)
    spec_id = Column(Integer, ForeignKey(SwitchSpecModel.id))
    location_id = Column(Integer, ForeignKey(DetailLocationModel.id))


