from app import manager, app
from app.table_model.number.asset_model import AssetModel

manager.create_api(AssetModel, methods=['GET', 'POST', 'DELETE'])


# @app.route('/')
# def hello_world():
#     return 'Hello World!'


if __name__ == '__main__':
    app.run(host="0.0.0.0")
