from flask import jsonify


def get_data():
    return jsonify({"data": "Hello World!"})
