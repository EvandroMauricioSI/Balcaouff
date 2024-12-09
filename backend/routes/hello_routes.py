from flask_restx import Namespace, Resource
from controller import hello_controller

hello_ns = Namespace("hello")

# Rota para testar o back-end
@hello_ns.route("/")
class Hello(Resource):
    def get(self):
        response = hello_controller.get_data()
        return response