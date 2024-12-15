from models.categorias_model import Categoria
from extensions import db


def format_response(success, data=None, status_code=200):
    """
    Formata o retorno das funções de forma consistente.
    """
    return {"success": success, "data": data}, status_code


def cadastrar_categoria(nome_categoria):
    if not nome_categoria:
        return format_response(False, "Nome é obrigatório!", status_code=400)

    if Categoria.query.filter_by(nome=nome_categoria).first():
        return format_response(
            False, "A Categoria informada já está cadastrada!", status_code=400
        )

    categoria = Categoria(nome=nome_categoria)
    try:
        db.session.add(categoria)
        db.session.commit()
        return format_response(
            True,
            data=categoria.to_dict(),
            status_code=201,
        )

    except Exception as e:
        db.session.rollback()
        return format_response(
            False, f"Erro ao cadastrar a categoria: {str(e)}", status_code=500
        )


def listar_categorias(id_categoria=None):
    if id_categoria:
        categoria = Categoria.query.filter_by(id=id_categoria).first()
        if categoria:
            return format_response(True, data=categoria.to_dict())
        else:
            return format_response(False, "Categoria não encontrada!", status_code=404)
    else:
        categorias = Categoria.query.all()
    return format_response(True, data=[categoria.to_dict() for categoria in categorias])


def atualizar_categoria(id_categoria, novo_nome):
    if not novo_nome:
        return format_response(False, "O novo nome é obrigatório!", status_code=400)

    categoria_existente = Categoria.query.filter_by(nome=novo_nome).first()
    if categoria_existente:
        return format_response(
            False, "Já existe uma categoria com este nome!", status_code=400
        )

    try:
        categoria = Categoria.query.get(id_categoria)
        if not categoria:
            return format_response(False, "Categoria não encontrada!", status_code=404)

        categoria.nome = novo_nome  # Atualização direta do atributo
        db.session.commit()
        return format_response(
            True,
            data=categoria.to_dict(),
        )
    except Exception as e:
        return format_response(False, str(e), status_code=500)


def deletar_categoria(id_categoria):
    try:
        categoria = Categoria.query.get(id_categoria)
        if not categoria:
            return format_response(False, "Categoria não encontrada!", status_code=404)

        db.session.delete(categoria)
        db.session.commit()
        return format_response(True, "Categoria excluída com sucesso!", status_code=200)
    except Exception as e:
        return format_response(False, str(e), status_code=500)
