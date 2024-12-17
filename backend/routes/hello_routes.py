from flask_restx import Namespace, Resource
from controller import hello_controller, helper

hello_ns = Namespace("hello")

# Rota para testar o back-end
@hello_ns.route("/")
class Hello(Resource):
    @helper.token_required
    def get(self, usuario_atual):
        response = hello_controller.get_data(usuario_atual)
        return response