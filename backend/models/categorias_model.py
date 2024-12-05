from extensions import db

# from ..app import db


class Categoria(db.Model):
    __tablename__ = "categorias"

    id_categoria = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nome = db.Column(db.String(80), unique=True, nullable=False)

    def to_dict(self):
        return {"id_categoria": self.id_categoria, "nome": self.nome}
