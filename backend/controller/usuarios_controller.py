from models.usuario_model import Usuario
from extensions import db

from werkzeug.security import generate_password_hash, check_password_hash

def cadastrar_usuario(nome, email, senha, ocupacao, telefone, foto_de_perfil):
    if not email or not senha:
        return {"success": False, "data": "Faltam campos obrigatorios!"},400
    
    if Usuario.query.filter_by(email=email).first():
        return {"success": False, "data": "O email informado já está cadastrado!"},400
    
    usuario = Usuario(
        nome = nome,
        email = email,
        senha = generate_password_hash(senha),
        ocupacao = ocupacao,
        telefone = telefone,
        foto_de_perfil = foto_de_perfil
    )
    try:
        db.session.add(usuario)
        db.session.commit()
        return {"success": True, "data": "Usuário cadastrado com sucesso!"},200

    except Exception as e:
        db.session.rollback()  
        return {"success": False, "data": f"Erro ao cadastrar o usuário: {str(e)}"},400


def listar_usuarios(id_usuario=None):
    if id_usuario:
        usuario = Usuario.query.filter_by(id=id_usuario).first() 
        if usuario:
            return {"success": True, "data": usuario.to_dict()}
        else:
            return {"success": False, "data": "Usuário não encontrado!"},400
    else:
        usuarios = Usuario.query.all()
        return {"success": True, "data":[usuario.to_dict() for usuario in usuarios]}


def atualizar_usuario(id_usuario, email, senha, nome, ocupacao, telefone, foto_de_perfil, admin):
    usuario = Usuario.query.filter_by(id=id_usuario).first()

    if not usuario:
        return {"success": False, "data": "Usuário não encontrado!"},400
    
    if email: usuario.email = email
    if senha: usuario.senha = generate_password_hash(senha)
    if nome: usuario.nome = nome
    if ocupacao: usuario.ocupacao = ocupacao
    if telefone: usuario.telefone = telefone
    if foto_de_perfil: usuario.foto_de_perfil = foto_de_perfil
    if admin: 
        if admin=="true": usuario.admin = True
        elif admin=="false": usuario.admin = False
    try:
        db.session.commit()
        return {"success": True, "data": "Usuário atualizado com sucesso!"},200
    
    except Exception as e:
        db.session.rollback()
        return {"success": False, "data": f"Erro ao atualizar o usuário: {str(e)}"},400
    

def remover_usuario(id_usario):
    usuario = Usuario.query.get(id_usario)
    if not usuario:
        return {"success": False, "data": "Usuário não encontrado!"},400
    
    try:
        db.session.delete(usuario)
        db.session.commit()
        return {"success": True, "data": "Usuário removido com sucesso!"},200
       
    except Exception as e:
        db.session.rollback()
        return {"success": False, "data": f"Erro ao remover o usuário: {str(e)}"},400
    

def usuario_por_email(email):
    try:
        return Usuario.query.filter_by(email = email).first() 
    except:
        return None
    
def usuario_por_id(id):
    try:
        return Usuario.query.filter_by(id = id).first() 
    except:
        return None
    
def atualizar_admin_usuario(id_usuario, boolean):
    usuario = Usuario.query.filter_by(id=id_usuario).first()

    if not usuario:
        return {"success": False, "data": "Usuário não encontrado!"},400
    
    if boolean == True: usuario.admin = True
    else : usuario.admin = False

    try:
        db.session.commit()
        return {"success": True, "data": "Usuário atualizado com sucesso!"},200
    
    except Exception as e:
        db.session.rollback()
        return {"success": False, "data": f"Erro ao atualizar o usuário: {str(e)}"},400