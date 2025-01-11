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
        "status": fields.Boolean(required=True, description="Status do anuncio, se ativo ou não.")
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
        status = True

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
            status
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



@anuncios_ns.route("/ativos", methods=["GET"])
class AnunciosAtivosResource(Resource):

    @anuncios_ns.doc(description="Lista todos os anúncios com status ativo.")
    def get(self):
        return anuncios_controller.listar_anuncios_ativos()


@anuncios_ns.route("/usuario/<int:usuario_id>", methods=["GET"])
class AnunciosPorUsuarioResource(Resource):

    @anuncios_ns.doc(description="Lista todos os anúncios de um usuário específico pelo ID.")
    def get(self, usuario_id):
        return anuncios_controller.listar_anuncios_por_usuario(usuario_id)


@anuncios_ns.route("/<int:id_anuncio>/comprar", methods=["PUT"])
class ProcessarCompraResource(Resource):

    @anuncios_ns.doc(
        description="Atualiza o status de um anúncio para inativo após a compra.",
        params={"id_anuncio": "ID do anúncio a ser processado"}
    )
    def put(self, id_anuncio):
        response = anuncios_controller.processar_compra(id_anuncio)
        return response


@anuncios_ns.route("/<int:id_anuncio>/avaliar", methods=["PUT"])
class RegistrarAvaliacaoResource(Resource):

    @anuncios_ns.expect(anuncios_ns.model('RegistrarAvaliacao', {
        'avaliacao': fields.Integer(required=True, description='Nota de avaliação do anúncio')
    }))
    @anuncios_ns.doc(
        description="Registra uma avaliação para um anúncio.",
        params={"id_anuncio": "ID do anúncio a ser avaliado"}
    )
    def put(self, id_anuncio):
        data = request.get_json()
        if not data:
            return {"success": False, "data": "Conteúdo da requisição não é JSON ou está vazio!"}, 400

        avaliacao = data.get("avaliacao")
        if avaliacao is None:
            return {"success": False, "data": "Nota de avaliação não fornecida!"}, 400

        response = anuncios_controller.registrar_avaliacao(id_anuncio, avaliacao)
        return response

