import datetime
from functools import wraps
# from app import app
from config import key
from flask import request, jsonify
from .usuarios_controller import usuario_por_email, usuario_por_id
import jwt
from werkzeug.security import check_password_hash


def auth(email_usuario, senha_usuario):
    if not email_usuario or not senha_usuario:
        return jsonify({"success": False, "data": "Faltam campos obrigatorios."})
    
    usuario = usuario_por_email(email_usuario)
    if not usuario:
        return jsonify({"success": False, "data": "Usuario nao encontrado."})
    
    if usuario and check_password_hash(usuario.senha, senha_usuario):
        token = jwt.encode({
            "id": usuario.id, 
            "exp": (datetime.datetime.now() + datetime.timedelta(hours=12))
            }, key)
        
        return jsonify({
                        "success": True, 
                        "data": {
                            "message": "Usuario autenticado",
                            "token": token,
                            "exp": datetime.datetime.now() + datetime.timedelta(hours=12)
                        }
                        })
    
    return jsonify({"success": False, "data": "Login necessario."})

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if args:
            self = args[0]  
            args = args[1:] 

        token = request.args.get("token")
        if not token:
            return jsonify({"success": False, "data": "Token e necessario."})
        
        try: 
            data = jwt.decode(token, key, algorithms=["HS256"])
            usuario_atual = usuario_por_id(id=data["id"])

        except jwt.ExpiredSignatureError:
            return jsonify({"success": False, "data": "Token expirado."})
        
        except jwt.DecodeError:
            return jsonify({"success": False, "data": "Erro ao decodificar o token."})
        
        except Exception as e:
            print(f"Erro inesperado: {e}")
            return jsonify({"success": False, "data": "Token inválido ou erro ao processar."})
        
        return f(self, usuario_atual, *args, **kwargs)
    
    return decorated

def token_required_admin(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if args:
            self = args[0]  
            args = args[1:] 

        token = request.args.get("token")
        if not token:
            return jsonify({"success": False, "data": "Token e necessario."})
        
        try: 
            data = jwt.decode(token, key, algorithms=["HS256"])
            usuario_atual = usuario_por_id(id=data["id"])

            if usuario_atual.admin == True:
                return f(self, usuario_atual, *args, **kwargs)
            else:
                return jsonify({"success": False, "data": "Acesso negado."})

        except jwt.ExpiredSignatureError:
            return jsonify({"success": False, "data": "Token expirado."})
        
        except jwt.DecodeError:
            return jsonify({"success": False, "data": "Erro ao decodificar o token."})
        
        except Exception as e:
            print(f"Erro inesperado: {e}")
            return jsonify({"success": False, "data": "Token inválido ou erro ao processar."})
    
    return decorated