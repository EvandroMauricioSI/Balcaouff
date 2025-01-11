from extensions import db
from models.categorias_model import Categoria
from models.localizacao_model import Localizacao
from models.usuario_model import Usuario
# from ..app import db


class Anuncio(db.Model):
    __tablename__ = "anuncios"

    id_anuncio = db.Column(db.Integer, primary_key=True, autoincrement=True)
    tipo = db.Column(db.String(255), nullable=False)
    descricao = db.Column(db.String(255), nullable=False)
    preco = db.Column(db.Float, nullable=False)
    foto = db.Column(db.String(500000), nullable=True)
    status = db.Column(db.Boolean, default=True, nullable=True)
    categoria = db.Column(
        db.Integer, db.ForeignKey("categorias.id_categoria"), nullable=False
    )
    condicao_produto = db.Column(db.String(255), nullable=False)
    avaliacao = db.Column(db.Integer, nullable=True)
    anunciante = db.Column(db.Integer, db.ForeignKey("usuarios.id"), nullable=False)
    comprador = db.Column(db.Integer, db.ForeignKey("usuarios.id"), nullable=True)
    local = db.Column(
        db.Integer, db.ForeignKey("localizacao.id_localizacao"), nullable=False
    )

    def json(self):
        return {
            "id_anuncio": self.id_anuncio,
            "tipo": self.tipo,
            "descricao": self.descricao,
            "preco": self.preco,
            "foto": self.foto,
            "categoria": Categoria.query.get(self.categoria).to_dict() if self.categoria else None,
            "condicao_produto": self.condicao_produto,
            "avaliacao": self.avaliacao,
            "anunciante": Usuario.query.get(self.anunciante).to_dict() if self.anunciante else None,
            "comprador": Usuario.query.get(self.comprador).to_dict() if self.comprador else None,
            "local": Localizacao.query.get(self.local).to_dict() if self.local else None,
            "status": self.status
    }
