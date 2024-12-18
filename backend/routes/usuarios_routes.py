from flask import request
from flask_restx import Namespace, Resource, fields
from controller import usuarios_controller, helper

usuarios_ns = Namespace("usuarios")

usuario_model = usuarios_ns.model(
    "Usuario",
    {
        "email": fields.String(required=True, description="Email do usuário"),
        "senha": fields.String(required=True, description="Senha do usuário"),
        "nome": fields.String(required=True, description="Nome do usuário"),
        "ocupacao": fields.String(required=False, description="Ocupação do usuário"),
        "telefone": fields.String(required=False, description="Telefone do usuário"),
        "foto_de_perfil": fields.String(required=False, description="Foto de perfil do usuário")
    }
)

usuario_login_model = usuarios_ns.model(
    "UsuarioLogin",
    {
        "email": fields.String(required=True, description="Email do usuário"),
        "senha": fields.String(required=True, description="Senha do usuário"),
    },
)

@usuarios_ns.route("/login", methods=["GET", "POST"])
class UsuarioAuth(Resource):
    @usuarios_ns.doc(
        description = "Retorno de Token",
        body=usuario_login_model
    )
    def post(self):
        data = request.get_json()
        email = data.get("email")
        senha = data.get("senha")

        return helper.auth(email, senha)

# Cadastrar novo usuario
@usuarios_ns.route("/cadastrar", methods=["POST"])
class UsuarioCadastrar(Resource):
    @usuarios_ns.doc(description="Cadastro de novo usuário", body=usuario_model)
    def post(self):
        data = request.get_json()
        if not data:
            return {
                "success": False,
                "data": "Conteudo da requisição nao e JSON ou esta vazio!",
            }

        email = data.get("email")
        senha = data.get("senha")
        nome = data.get("nome")
        ocupacao = data.get("ocupacao")
        telefone = data.get("telefone")
        foto_de_perfil = data.get("foto_de_perfil")

        response = usuarios_controller.cadastrar_usuario(
            nome, email, senha, ocupacao, telefone, foto_de_perfil
        )
        return response

# Captura usuarios
@usuarios_ns.route("/listar", methods=["GET"])
class UsuarioCapturaUsuarios(Resource):
    @usuarios_ns.doc(
        description="Captura dados de usuários, se tiver usuario_id, captura dados de um usuario especifico",
        params={"token": helper.token_param}
    )
    @helper.token_required
    def get(self, usuario_atual):
        id_usuario = request.args.get("id", default=None, type=int)
        return usuarios_controller.listar_usuarios(id_usuario)


@usuarios_ns.route("/", methods=["PUT", "DELETE"])
class UsuarioUpdateResource(Resource):

    # atualiza dados
    @usuarios_ns.doc(
        description="Atualiza os dados de um usuario específico dado um ID",
        params={"token": helper.token_param},
        body=usuario_model
    )
    @helper.token_required
    def put(self, usuario_atual):
        data = request.get_json()
        if not data:
            return {
                "success": False,
                "data": "Conteúdo da requisição nao e JSON ou esta vazio!",
            }

        email = data.get("email")
        senha = data.get("senha")
        nome = data.get("nome")
        ocupacao = data.get("ocupacao")
        telefone = data.get("telefone")
        foto_de_perfil = data.get("foto_de_perfil")
        
        response = usuarios_controller.atualizar_usuario(usuario_atual.id, email, senha, nome, ocupacao, telefone, foto_de_perfil, None)
        return response

    # remover conta
    @usuarios_ns.doc(
        description="Remover conta",
        params={"token": helper.token_param}
    )
    @helper.token_required
    def delete(self, usuario_atual):
        response = usuarios_controller.remover_usuario(usuario_atual.id)
        return response


@usuarios_ns.route("/admin/atualizar/<int:id_usuario>/<string:admin_boleano>", methods=["PUT"])
class UsuarioAdminAtualizar(Resource):
    @usuarios_ns.doc(
        description = "Atualizar um usuario para admin",
        params={"token": helper.token_param}
    )
    @helper.token_required_admin
    def put(self, usuario_atual, id_usuario, admin_boleano):
        response = usuarios_controller.atualizar_usuario(id_usuario, None, None, None, None, None, None, admin_boleano)
        return response
    
@usuarios_ns.route("/admin/remover/<int:id_usuario>", methods=["DELETE"])
class UsuarioAdminRemover(Resource):
    @usuarios_ns.doc(
        description = "Remover um usuario",
        params={"token": helper.token_param}
    )
    @helper.token_required_admin
    def delete(self, usuario_atual, id_usuario):
        response = usuarios_controller.remover_usuario(id_usuario)
        return response
    
