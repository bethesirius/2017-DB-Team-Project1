from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session
from sqlalchemy.orm import sessionmaker

from config import DATABASE_URL


engine = create_engine(DATABASE_URL)

# 모델에선 Base를 들고 있어야 alchemy에 연결됩니다.
Base = declarative_base()

# session 범위를 제한두어 singleton 효과를 냄
session_factory = sessionmaker(bind=engine)
Session = scoped_session(session_factory)

# 외부에선 session만 끌어다 쓰면 됩니다.
session = Session()

