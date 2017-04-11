from sqlalchemy import create_engine

from app.config import DATABASE_URL

from sqlalchemy.orm import sessionmaker, scoped_session



engine = create_engine(DATABASE_URL)
session_factory = sessionmaker(bind=engine)
Session = scoped_session(session_factory)
session = Session()
# #
# # # 모델에선 db를 들고 있어야 alchemy에 연결됩니다.
# db = declarative_base()
# #
# # # session 범위를 제한두어 singleton 효과를 냄
# session_factory = sessionmaker(bind=engine)
# Session = scoped_session(session_factory)
# #
# # # 외부에선 session만 끌어다 쓰면 됩니다.
# session = Session()
#
# #db = flask_sqlalchemy.SQLAlchemy(app)

