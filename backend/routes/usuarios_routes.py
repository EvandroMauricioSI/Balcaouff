from flask import request
from flask_restx import Namespace, Resource, fields
from controller import usuarios_controller

usuarios_ns = Namespace("usuarios")

usuario_model = usuarios_ns.model('Usuario', {
    'nome': fields.String(required=True, description="Nome do usuário"),
    'email': fields.String(required=True, description="Email do usuário"),
    'senha': fields.String(required=True, description="Senha do usuário")
})


@usuarios_ns.route("/", methods=["POST", "GET"])
class UsuarioResource(Resource):
    
    @usuarios_ns.doc(
        description="Cadastro de novo usuário",
        body=usuario_model  
    )
    def post(self):
        data = request.get_json()
        if not data:
            return {"success": False, "message": "Conteúdo da requisição não é JSON ou está vazio!"}
        
        nome = data.get("nome")
        email = data.get("email")
        senha = data.get("senha")

        response = usuarios_controller.cadastrar_usuario(nome, email, senha)
        
        return response
    
    @usuarios_ns.doc(
        description = "Captura dados de usuários, se tiver usuario_id, captura dados de um usuario especifico"
    )
    def get(self):
        id_usuario = request.args.get("id", default=None, type=int)
        return usuarios_controller.listar_usuarios(id_usuario)
