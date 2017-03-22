from flask import Flask
from flask.ext.restful import Api

app = Flask(__name__)
api = Api(app)


@app.route('/')
def hello_world():
    return 'Hello World!'


if __name__ == '__main__':
    app.run()
