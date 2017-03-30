from sqlalchemy import Column
from sqlalchemy import ForeignKey
from sqlalchemy import Integer

from table_model.device.device_model import DeviceModel
from table_model.device.switch_model import SwitchModel
from table_model.rack_location.device_info import DeviceInfo


class DeviceInfoForSwitchModel(DeviceInfo):
    __tablename__ = "device_info_for_switch"
    id = Column(Integer, ForeignKey(DeviceInfo.id), primary_key=True)
    switch_id = Column(Integer, ForeignKey(DeviceModel.id))
