from models.usuario_model import Usuario
from extensions import db

def cadastrar_usuario(nome_usuario, email_usuario, senha_usuario):
    if not nome_usuario or not email_usuario or not senha_usuario:
        return {"success": False, "message": "Nome, email e senha são obrigatórios!"}
    
    if Usuario.query.filter_by(email=email_usuario).first():
        return {"success": False, "message": "O email informado já está cadastrado!"}
    
    usuario = Usuario(
        nome = nome_usuario,
        email = email_usuario,
        senha = senha_usuario
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
        return {"success": True, "message":[usuario.to_dict() for usuario in usuarios]}