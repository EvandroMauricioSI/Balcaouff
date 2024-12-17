import datetime
from functools import wraps
# from app import app
from config import key
from flask import request, jsonify
from .usuarios_controller import usuario_por_email, usuario_por_id
import jwt
from werkzeug.security import check_password_hash


def auth():
    auth = request.authorization
    if not auth or not auth.username or not auth.password:
        return jsonify({"success": False, "data": "Login necessario."})
    
    usuario = usuario_por_email(auth.username)
    if not usuario:
        return jsonify({"success": False, "data": "Usuario nao encontrado."})
    
    if usuario and check_password_hash(usuario.senha, auth.password):
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

