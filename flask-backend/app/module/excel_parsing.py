import os

import xlrd as xlrd

from app.config import RESOURCE_PATH

ASSET_SHEETS = ['TOTAL', 'SERVER', 'SWITCH', 'STORAGE', 'RACK']


def parsing_asset():
    x = xlrd.open_workbook(os.path.join(RESOURCE_PATH, "1_Asset-201703.xlsx"))
    sheet = x.sheet_by_name(ASSET_SHEETS[0])
    
    # print(sheet.cell_value(2, 2))
    # print()
    pass


if __name__ == '__main__':
    parsing_asset()
    pass
