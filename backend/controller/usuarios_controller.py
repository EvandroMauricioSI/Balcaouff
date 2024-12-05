from models.usuario_model import Usuario
from extensions import db

from werkzeug.security import generate_password_hash, check_password_hash

def cadastrar_usuario(nome_usuario, email_usuario, senha_usuario, ocupacao_usuario, telefone_usuario):
    if not nome_usuario or not email_usuario or not senha_usuario or not ocupacao_usuario or not telefone_usuario:
        return {"success": False, "message": "Faltam campos obrigatórios!"}
    
    if Usuario.query.filter_by(email=email_usuario).first():
        return {"success": False, "message": "O email informado já está cadastrado!"}
    
    usuario = Usuario(
        nome = nome_usuario,
        email = email_usuario,
        senha = generate_password_hash(senha_usuario),
        ocupacao = ocupacao_usuario,
        telefone = telefone_usuario
    )
    try:
        db.session.add(usuario)
        db.session.commit()
        return {"success": True, "message": "Usuário cadastrado com sucesso!"}

    except Exception as e:
        db.session.rollback()  
        return {"success": False, "message": f"Erro ao cadastrar o usuário: {str(e)}"}


def listar_usuarios(id_usuario=None):
    if id_usuario:
        usuario = Usuario.query.filter_by(id=id_usuario).first() 
        if usuario:
            return {"success": True, "message": usuario.to_dict()}
        else:
            return {"success": False, "message": "Usuário não encontrado!"}
    else:
        usuarios = Usuario.query.all()
        return {"success": True, "data":[usuario.to_dict() for usuario in usuarios]}


def atualizar_usuario(id_usuario, nome_usuario, email_usuario, senha_usuario):
    usuario = Usuario.query.filter_by(id=id_usuario).first()

    if not usuario:
        return {"success": False, "message": "Usuário não encontrado!"}
    
    if nome_usuario: usuario.nome = nome_usuario
    if email_usuario: usuario.email = email_usuario
    if senha_usuario: usuario.senha = senha_usuario
    try:
        db.session.commit()
        return {"success": True, "message": "Usuário atualizado com sucesso!"}
    
    except Exception as e:
        db.session.rollback()
        return {"success": False, "message": f"Erro ao atualizar o usuário: {str(e)}"}
    

def remover_usuario(id_usario):
    usuario = Usuario.query.get(id_usario)
    if not usuario:
        return {"success": False, "message": "Usuário não encontrado!"}
    
    try:
        db.session.delete(usuario)
        db.session.commit()
        return {"success": True, "message": "Usuário removido com sucesso!"}
       
    except Exception as e:
        db.session.rollback()
        return {"success": False, "message": f"Erro ao remover o usuário: {str(e)}"}
    

def login_usuario(email, senha):
    if not email or not senha:
        return {"success": False, "message": "Email e senha são obrigatórios!"}
    
    usuario = Usuario.query.filter_by(email=email).first() 
    if not usuario:
        return {"success": False, "message": "Email ou senha inválido!"}
    
    if not check_password_hash(usuario.senha, senha):
        return {"success": False, "message": "Email ou senha inválido!"}
    
    return {"success": True, "message": f"Bem vindo, {usuario.nome}!"}
    