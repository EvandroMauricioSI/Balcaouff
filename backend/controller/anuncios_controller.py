from models.anuncios_model import Anuncio
from extensions import db


def criar_anuncio(tipo, descricao, preco, foto, categoria, condicao_produto, avaliacao, anunciante, comprador, local):
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
        )
        db.session.add(novo_anuncio)
        db.session.commit()
        return {"success": True, "message": "Anúncio criado com sucesso!", "anuncio": novo_anuncio.json()}, 201
    except Exception as e:
        return {"success": False, "message": str(e)}, 500
    

def listar_anuncios(id_anuncio=None):
    try:
        if id_anuncio:
            anuncio = Anuncio.query.get(id_anuncio)
            if not anuncio:
                return {"success": False, "message": "Anúncio não encontrado!"}, 404
            return {"success": True, "anuncio": anuncio.json()}, 200

        anuncios = Anuncio.query.all()
        return {"success": True, "anuncios": [a.json() for a in anuncios]}, 200
    except Exception as e:
        return {"success": False, "message": str(e)}, 500

# def atualizar_anuncio(id_anuncio, data):
#     try:
#         anuncio = Anuncio.query.get(id_anuncio)
#         if not anuncio:
#             return {"success": False, "message": "Anúncio não encontrado!"}, 404

#         for key, value in data.items():
#             setattr(anuncio, key, value)

#         db.session.commit()
#         return {"success": True, "message": "Anúncio atualizado com sucesso!", "anuncio": anuncio.json()}, 200
#     except Exception as e:
#         return {"success": False, "message": str(e)}, 500

# def deletar_anuncio(id_anuncio):
#     try:
#         anuncio = Anuncio.query.get(id_anuncio)
#         if not anuncio:
#             return {"success": False, "message": "Anúncio não encontrado!"}, 404

#         db.session.delete(anuncio)
#         db.session.commit()
#         return {"success": True, "message": "Anúncio excluído com sucesso!"}, 200
#     except Exception as e:
#         return {"success": False, "message": str(e)}, 500
