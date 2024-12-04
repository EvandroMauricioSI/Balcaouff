from extensions import db
# from ..app import db


class Categoria(db.Model):
    __tablename__ = 'categoria'

    id_categoria = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(80), unique=True, nullable=False)

    def json(self):
        return {'id_categoria': self.id_categoria, 'nome': self.nome}
