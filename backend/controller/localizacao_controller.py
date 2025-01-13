from models.localizacao_model import Localizacao
from extensions import db


def criar_localizacao(bairro, cidade, estado):
    try:
        nova_localizacao = Localizacao(bairro=bairro, cidade=cidade, estado=estado)
        db.session.add(nova_localizacao)
        db.session.commit()
        return {"success": True, "data": nova_localizacao.to_dict()}, 201
    except Exception as e:
        return {"success": False, "data": str(e)}, 500


def listar_localizacoes(id_localizacao=None):
    try:
        if id_localizacao:
            localizacao = Localizacao.query.get(id_localizacao)
            if not localizacao:
                return {"success": False, "data": "Local não encontrado!"}, 404
            return {"success": True, "data": localizacao.to_dict()}, 200

        localizacao = Localizacao.query.all()
        return {"success": True, "data": [a.to_dict() for a in localizacao]}, 200
    except Exception as e:
        return {"success": False, "data": str(e)}, 500


def atualizar_localizacao(id_localizacao, data):
    try:
        localizacao = Localizacao.query.get(id_localizacao)
        if not localizacao:
            return {"success": False, "data": "Local não encontrado!"}, 404

        for key, value in data.items():
            setattr(localizacao, key, value)

        db.session.commit()
        return {
            "success": True,
            "data": localizacao.to_dict(),
        }, 200
    except Exception as e:
        return {"success": False, "data": str(e)}, 500


def deletar_localizacao(id_localizacao):
    try:
        localizacao = Localizacao.query.get(id_localizacao)
        if not localizacao:
            return {"success": False, "data": "Local não encontrado!"}, 404

        db.session.delete(localizacao)
        db.session.commit()
        return {"success": True, "data": "Localização excluída com sucesso!"}, 200
    except Exception as e:
        return {"success": False, "data": str(e)}, 500
