# DATAdb CONFIG
# 기본 인코딩(charset = utf8)
import os

DATABASE_URL = '%(engine)s://%(user)s:%(password)s@%(host)s:%(port)s/%(datadb)s?charset=utf8' % {
    'engine': 'mysql+pymysql',
    'host': 'db-project.c9piytoc4vtx.ap-northeast-2.rds.amazonaws.com',
    'port': '3306',
    'user': 'ming',
    'password': '1q2w3e4r!!',
    'datadb': 'jasan'
}

RESOURCE_PATH = \
    os.path.join(os.path.join(os.path.dirname(__file__), os.pardir), "resource")
