from flask import jsonify
from models.usuario_model import Usuario

def get_data(usuario_atual):
    if isinstance(usuario_atual, Usuario):
        return jsonify({"data": f"Hello World, {usuario_atual.email}!"})
    else:
        return jsonify({"message": "Erro: usuario_atual não é do tipo correto!"})