from flask import request
from flask_restx import Namespace, Resource, fields
from controller import usuarios_controller, helper

usuarios_ns = Namespace("usuarios")

usuario_model = usuarios_ns.model(
    "Usuario",
    {
        "nome": fields.String(required=True, description="Nome do usuário"),
        "email": fields.String(required=True, description="Email do usuário"),
        "senha": fields.String(required=True, description="Senha do usuário"),
        # 'ocupacao': fields.String(required=False, description="Ocupação do usuário"),
        # 'telefone': fields.String(required=False, description="Telefone do usuário"),
        # 'foto_de_perfil': fields.String(required=False, description="Foto de perfil do usuário")
    },
)

usuario_login_model = usuarios_ns.model(
    "Usuario",
    {
        "email": fields.String(required=True, description="Email do usuário"),
        "senha": fields.String(required=True, description="Senha do usuário"),
    },
)

@usuarios_ns.route("/auth", methods=["POST", "GET"])
class UsuarioAuth(Resource):
    def post(self):
        return helper.auth()

@usuarios_ns.route("/", methods=["POST", "GET"])
class UsuarioResource(Resource):

    @usuarios_ns.doc(description="Cadastro de novo usuário", body=usuario_login_model)
    def post(self):
        data = request.get_json()
        if not data:
            return {
                "success": False,
                "data": "Conteudo da requisição nao e JSON ou esta vazio!",
            }

        # !!!!! MUDAR PARAMETROS DPS !!!!!

        email = data.get("email")
        senha = data.get("senha")
        nome = None  # nome = data.get("nome")
        ocupacao = None  # nome = data.get("nome")
        telefone = None  # nome = data.get("nome")
        foto_de_perfil = None  # nome = data.get("nome")

        response = usuarios_controller.cadastrar_usuario(
            nome, email, senha, ocupacao, telefone, foto_de_perfil
        )
        return response

    @usuarios_ns.doc(
        description="Captura dados de usuários, se tiver usuario_id, captura dados de um usuario especifico"
    )
    def get(self):
        id_usuario = request.args.get("id", default=None, type=int)
        return usuarios_controller.listar_usuarios(id_usuario)


@usuarios_ns.route("/<int:id_usuario>", methods=["PUT", "DELETE"])
class UsuarioUpdateResource(Resource):

    @usuarios_ns.doc(
        description="Atualiza os dados de um usuario específico dado um ID",
        body=usuario_model,
    )
    def put(self, id_usuario):
        data = request.get_json()
        if not data:
            return {
                "success": False,
                "data": "Conteúdo da requisição nao e JSON ou esta vazio!",
            }

        nome = data.get("nome")
        email = data.get("email")
        senha = data.get("senha")

        response = usuarios_controller.atualizar_usuario(id_usuario, nome, email, senha)
        return response

    @usuarios_ns.doc(
        description="Remover um usuario específico dado um ID",
    )
    def delete(self, id_usuario):
        response = usuarios_controller.remover_usuario(id_usuario)
        return response


@usuarios_ns.route("/login", methods=["POST"])
class UsuarioResource(Resource):

    @usuarios_ns.doc(description="Login de usuário", body=usuario_login_model)
    def post(self):
        data = request.get_json()
        if not data:
            return {
                "success": False,
                "data": "Conteúdo da requisição nao e JSON ou esta vazio!",
            }

        email = data.get("email")
        senha = data.get("senha")

        response = usuarios_controller.login_usuario(email, senha)
        return response
