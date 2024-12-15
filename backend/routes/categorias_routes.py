from flask import request
from flask_restx import Namespace, Resource, fields
from controller import categorias_controller

categorias_ns = Namespace("categorias")

categoria_model = categorias_ns.model(
    "Categoria",
    {
        "nome": fields.String(required=True, description="Nome da categoria"),
    },
)


@categorias_ns.route("/", methods=["POST", "GET"])
class CategoriaResource(Resource):

    @categorias_ns.doc(description="Cadastro de novo usuário", body=categoria_model)
    def post(self):
        data = request.get_json()
        if not data:
            return {
                "success": False,
                "data": "Conteúdo da requisição não é JSON ou está vazio!",
            }

        nome = data.get("nome")

        response = categorias_controller.cadastrar_categoria(nome)

        return response

    @categorias_ns.doc(
        description="Captura dados da categoria, se tiver id_categoria, captura dados de uma categoria especifica"
    )
    def get(self):
        id_categoria = request.args.get("id_categoria", default=None, type=int)
        return categorias_controller.listar_categorias(id_categoria)


@categorias_ns.route("/<int:id_categoria>", methods=["PUT", "DELETE"])
class CategoriaDetailResource(Resource):

    @categorias_ns.doc(
        description="Atualiza uma categoria existente", body=categoria_model
    )
    def put(self, id_categoria):
        data = request.get_json()
        if not data:
            return {
                "success": False,
                "data": "Conteúdo da requisição não é JSON ou está vazio!",
            }, 400

        novo_nome = data.get("nome")

        response = categorias_controller.atualizar_categoria(id_categoria, novo_nome)
        return response

    @categorias_ns.doc(description="Exclui uma categoria pelo ID.")
    def delete(self, id_categoria):
        response = categorias_controller.deletar_categoria(id_categoria)
        return response
