from flask import request
from flask_restx import Namespace, Resource, fields
from controller import usuarios_controller

usuarios_ns = Namespace("usuarios")

usuario_model = usuarios_ns.model('Usuario', {
    'nome': fields.String(required=True, description="Nome do usuário"),
    'email': fields.String(required=True, description="Email do usuário"),
    'senha': fields.String(required=True, description="Senha do usuário")
})

@usuarios_ns.route("/", methods=["POST"])
class UsuarioResource(Resource):
    
    @usuarios_ns.doc(
        description="Cadastro de novo usuário",
        body=usuario_model  
    )
    def post(self):
        data = request.get_json()

        if not data:
            return {"message": "Conteúdo da requisição não é JSON ou está vazio!"}, 400
        
        nome = data.get("nome")
        email = data.get("email")
        senha = data.get("senha")

        response, status_code = usuarios_controller.cadastrar_usuario(nome, email, senha)
        
        return response, status_code
