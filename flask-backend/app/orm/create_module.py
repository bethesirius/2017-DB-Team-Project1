from app.orm.session import engine, Base


def create_table():
    Base.metadata.create_all(engine)