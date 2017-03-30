# 서버
from sqlalchemy import Column
from sqlalchemy import ForeignKey
from sqlalchemy import Integer

from table_model.device.device_model import DeviceModel
from table_model.device.spec.server_spec_model import ServerSpecModel


class ServerModel(DeviceModel):
    __tablename__ = "server"
    id = Column(Integer, ForeignKey(DeviceModel.id), primary_key=True)
    core_num = Column(Integer)
    spec_id = Column(Integer, ForeignKey(ServerSpecModel.id))

