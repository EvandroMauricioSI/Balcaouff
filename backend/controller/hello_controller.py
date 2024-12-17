from flask import jsonify
from models.usuario_model import Usuario

def get_data(usuario_atual, admin=False):
    if isinstance(usuario_atual, Usuario):
        if admin==False:
            return jsonify({"data": f"Hello World, {usuario_atual.email}!"})
        else:
            return jsonify({"data": f"Hello World, administrador {usuario_atual.email}!"})

    else:
        return jsonify({"message": "Erro: usuario_atual não é do tipo correto!"})