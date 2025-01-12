from flask import request
from flask_restx import Namespace, Resource, fields
from controller import localizacao_controller, helper


localizacao_ns = Namespace("localizacao")


# Definir o modelo de dados para localizacao
localizacao_model = localizacao_ns.model(
    "Localizacao",
    {
        "bairro": fields.String(required=True, description="Bairro"),
        "cidade": fields.String(required=True, description="Cidade"),
        "estado": fields.String(required=True, description="Estado"),
    },
)


@localizacao_ns.route("/", methods=["POST", "GET"])
class LocalizacaoResource(Resource):

    @localizacao_ns.doc(
        description="Criação de uma nova localização", 
        params={"token": helper.token_param},
        body=localizacao_model
    )
    @helper.token_required_admin
    def post(self, usuario_atual):
        data = request.get_json()
        if not data:
            return {
                "success": False,
                "data": "Conteúdo da requisição não é JSON ou está vazio!",
            }, 400

        bairro = data.get("bairro")
        cidade = data.get("cidade")
        estado = data.get("estado")

        # Chamar o controlador para criar localizacao
        response = localizacao_controller.criar_localizacao(bairro, cidade, estado)

        return response

    @localizacao_ns.doc(
        description="Captura todas as localizações, dependendo do ID fornecido."
    )
    def get(self):
        id_localizacao = request.args.get("id_localizacao", default=None, type=int)
        return localizacao_controller.listar_localizacoes(id_localizacao)


@localizacao_ns.route("/<int:id_localizacao>", methods=["PUT", "DELETE"])
class LocalizacaoDetailResource(Resource):

    @localizacao_ns.doc(
        description="Atualiza uma localização existente", 
        params={"token": helper.token_param},
        body=localizacao_model
    )
    @helper.token_required_admin
    def put(self, usuario_atual, id_localizacao):
        data = request.get_json()
        if not data:
            return {
                "success": False,
                "data": "Conteúdo da requisição não é JSON ou está vazio!",
            }, 400

        response = localizacao_controller.atualizar_localizacao(id_localizacao, data)
        return response

    @localizacao_ns.doc(
        description="Exclui uma localização pelo ID.",
        params={"token": helper.token_param}
    )
    @helper.token_required_admin
    def delete(self, usuario_atual, id_localizacao):
        response = localizacao_controller.deletar_localizacao(id_localizacao)
        return response
