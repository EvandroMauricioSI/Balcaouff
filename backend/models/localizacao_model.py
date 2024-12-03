from extensions import db
# from ..app import db


class Localizacao(db.Model):
    __tablename__ = 'localizacao'

    id_localizacao = db.Column(db.Integer, primary_key=True)
    bairro = db.Column(db.String(80), nullable=False)
    cidade = db.Column(db.String(100), nullable=False)
    estado = db.Column(db.String(100), nullable=False)

    def json(self):
        return {
            'id_localizacao': self.id_localizacao,
            'bairro': self.bairro,
            'cidade': self.cidade,
            'estado': self.estado
        }
