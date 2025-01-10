from models.anuncios_model import Anuncio
from extensions import db


def criar_anuncio(
    tipo,
    descricao,
    preco,
    foto,
    categoria,
    condicao_produto,
    avaliacao,
    anunciante,
    comprador,
    local,
    status,
):
    try:
        novo_anuncio = Anuncio(
            tipo=tipo,
            descricao=descricao,
            preco=preco,
            foto=foto,
            categoria=categoria,
            condicao_produto=condicao_produto,
            avaliacao=avaliacao,
            anunciante=anunciante,
            comprador=comprador,
            local=local,
            status=status,
        )
        db.session.add(novo_anuncio)
        db.session.commit()
        return {"success": True, "data": novo_anuncio.json()}, 201
    except Exception as e:
        return {"success": False, "data": str(e)}, 500


def listar_anuncios(id_anuncio=None):
    try:
        if id_anuncio:
            anuncio = Anuncio.query.get(id_anuncio)
            if not anuncio:
                return {"success": False, "data": "Anúncio não encontrado!"}, 404
            return {"success": True, "data": anuncio.json()}, 200

        anuncios = Anuncio.query.all()

        return {"success": True, "data": [a.json() for a in anuncios]}, 200
    except Exception as e:
        return {"success": False, "data": str(e)}, 500


def atualizar_anuncio(id_anuncio, data):
    try:
        anuncio = Anuncio.query.get(id_anuncio)
        if not anuncio:
            return {"success": False, "data": "Anúncio não encontrado!"}, 404

        for key, value in data.items():
            setattr(anuncio, key, value)

        db.session.commit()
        return {"success": True, "data": anuncio.json()}, 200
    except Exception as e:
        return {"success": False, "data": str(e)}, 500


def deletar_anuncio(id_anuncio):
    try:
        anuncio = Anuncio.query.get(id_anuncio)
        if not anuncio:
            return {"success": False, "data": "Anúncio não encontrado!"}, 404

        db.session.delete(anuncio)
        db.session.commit()
        return {"success": True, "data": "Anúncio excluído com sucesso!"}, 200
    except Exception as e:
        return {"success": False, "data": str(e)}, 500


def listar_anuncios_ativos():
    try:
        anuncios_ativos = Anuncio.query.filter_by(status=True).all()
        return {
            "success": True,
            "data": [anuncio.json() for anuncio in anuncios_ativos]
        }, 200
    except Exception as e:
        return {"success": False, "data": str(e)}, 500
    
    
def listar_anuncios_por_usuario(usuario_id):
    try:
        anuncios_usuario = Anuncio.query.filter_by(anunciante=usuario_id).all()        
        return {
            "success": True,
            "data": [anuncio.json() for anuncio in anuncios_usuario]
        }, 200
    except Exception as e:
        return {"success": False, "data": str(e)}, 500


def processar_compra(id_anuncio):
    try:
        anuncio = Anuncio.query.get(id_anuncio)
        if not anuncio:
            return {"success": False, "data": "Anúncio não encontrado!"}, 404

        # Atualizar o status para "inativo"
        anuncio.status = "inativo"

        db.session.commit()
        return {"success": True, "data": anuncio.json()}, 200
    except Exception as e:
        return {"success": False, "data": str(e)}, 500


def registrar_avaliacao(id_anuncio, avaliacao):
    try:
        anuncio = Anuncio.query.get(id_anuncio)
        if not anuncio:
            return {"success": False, "data": "Anúncio não encontrado!"}, 404

        # Atualizar a avaliação com a nota recebida
        anuncio.avaliacao = avaliacao

        db.session.commit()
        return {"success": True, "data": anuncio.json()}, 200
    except Exception as e:
        return {"success": False, "data": str(e)}, 500