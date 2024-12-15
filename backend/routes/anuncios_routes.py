from flask import request
from flask_restx import Namespace, Resource, fields
from controller import anuncios_controller


anuncios_ns = Namespace("anuncios")

# Definir o modelo de dados para um Anuncio
anuncio_model = anuncios_ns.model(
    "Anuncio",
    {
        "tipo": fields.String(required=True, description="Tipo do anúncio"),
        "descricao": fields.String(required=True, description="Descrição do anúncio"),
        "preco": fields.Float(required=True, description="Preço do produto ou serviço"),
        "foto": fields.String(description="URL da foto do anúncio"),
        "categoria": fields.Integer(required=True, description="ID da categoria"),
        "condicao_produto": fields.String(
            required=True, description="Condição do produto"
        ),
        "avaliacao": fields.Integer(description="Avaliação do produto ou serviço"),
        "anunciante": fields.Integer(required=True, description="ID do anunciante"),
        "comprador": fields.Integer(description="ID do comprador, pode ser Nulo"),
        "local": fields.Integer(required=True, description="ID da localização"),
    },
)


@anuncios_ns.route("/", methods=["POST", "GET"])
class AnuncioResource(Resource):

    @anuncios_ns.doc(description="Criação de um novo anúncio", body=anuncio_model)
    def post(self):
        data = request.get_json()
        if not data:
            return {
                "success": False,
                "data": "Conteúdo da requisição não é JSON ou está vazio!",
            }, 400

        tipo = data.get("tipo")
        descricao = data.get("descricao")
        preco = data.get("preco")
        foto = data.get("foto")
        categoria = data.get("categoria")
        condicao_produto = data.get("condicao_produto")
        avaliacao = data.get("avaliacao")
        anunciante = data.get("anunciante")
        comprador = None  # data.get("comprador") - Isso inicialmente é definido depois.
        local = data.get("local")

        # Chamar o controlador para criar um novo anúncio
        response = anuncios_controller.criar_anuncio(
            tipo,
            descricao,
            preco,
            foto,
            categoria,
            condicao_produto,
            avaliacao,
            anunciante,
            comprador,
            local,
        )

        return response

    @anuncios_ns.doc(
        description="Captura todos os anúncios ou um específico, dependendo do ID fornecido."
    )
    def get(self):
        id_anuncio = request.args.get("id_anuncio", default=None, type=int)
        return anuncios_controller.listar_anuncios(id_anuncio)


@anuncios_ns.route("/<int:id_anuncio>", methods=["PUT", "DELETE"])
class AnuncioDetailResource(Resource):

    @anuncios_ns.doc(description="Atualiza um anúncio existente", body=anuncio_model)
    def put(self, id_anuncio):
        data = request.get_json()
        if not data:
            return {
                "success": False,
                "data": "Conteúdo da requisição não é JSON ou está vazio!",
            }, 400

        response = anuncios_controller.atualizar_anuncio(id_anuncio, data)
        return response

    @anuncios_ns.doc(description="Exclui um anúncio pelo ID.")
    def delete(self, id_anuncio):
        response = anuncios_controller.deletar_anuncio(id_anuncio)
        return response
