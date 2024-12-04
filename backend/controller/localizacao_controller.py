from flask import jsonify


def get_data():
    return jsonify({"message": "Hello World!"})
