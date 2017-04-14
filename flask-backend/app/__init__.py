import flask_sqlalchemy
from flask import Flask
from flask_restful import Api
from flask_restless import APIManager

from app.config import DATABASE_URL

app = Flask(__name__, template_folder="../template")
api = Api(app)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
app.config['STATIC_FOLDER'] = 'static'
db = flask_sqlalchemy.SQLAlchemy(app)
manager = APIManager(app, flask_sqlalchemy_db=db)
