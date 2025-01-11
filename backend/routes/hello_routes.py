from flask_restx import Namespace, Resource
from controller import hello_controller, helper

hello_ns = Namespace("hello")

# Rota para testar o back-end
@hello_ns.route("")
class Hello(Resource):
    @hello_ns.doc(params={"token": helper.token_param})
    @helper.token_required
    def get(self, usuario_atual):
        response = hello_controller.get_data(usuario_atual)
        return response
    
@hello_ns.route("/admin")
class Hello(Resource):
    @hello_ns.doc(params={"token": helper.token_param})
    @helper.token_required_admin
    def get(self, usuario_atual):
        response = hello_controller.get_data(usuario_atual, admin=True)
        return response