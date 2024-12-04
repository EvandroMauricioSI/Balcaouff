from models.usuario_model import Usuario
from extensions import db

def cadastrar_usuario(nome_usuario, email_usuario, senha_usuario):
    if not nome_usuario or not email_usuario or not senha_usuario:
        return {"message": "Nome, email e senha são obrigatórios!"}, 400
    
    if Usuario.query.filter_by(email=email_usuario).first():
        return {"message": "O email informado já está cadastrado!"}, 400
    
    usuario = Usuario(
        nome = nome_usuario,
        email = email_usuario,
        senha = senha_usuario
    )
    try:
        db.session.add(usuario)
        db.session.commit()

        return {"message": "Usuário cadastrado com sucesso!"}, 201

    except Exception as e:
        db.session.rollback()  
        return {"message": f"Erro ao cadastrar o usuário: {str(e)}"}, 500