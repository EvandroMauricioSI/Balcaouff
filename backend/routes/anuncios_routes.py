from flask_restx import Namespace, Resource
from controller import hello_controller

anuncio_ns = Namespace("anuncios")


# Rota para testar o back-end
@anuncio_ns.route("/anuncios")
class Hello(Resource):
    def get(self):
        response = hello_controller.get_data()
        return response
