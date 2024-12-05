from extensions import db

# from ..app import db


class Usuario(db.Model):
    __tablename__ = "usuarios"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nome = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    senha = db.Column(db.String(200), nullable=False)
    ocupacao = db.Column(db.String(100), nullable=False)
    telefone = db.Column(db.String(100), nullable=False)

    def __init__(self, nome=None, email=None, senha=None, ocupacao=None, telefone=None):
        self.nome = nome
        self.email = email
        self.senha = senha
        self.ocupacao = ocupacao
        self.telefone = telefone

    def to_dict(self):
        return {
            'id': self.id,
            'nome': self.nome,
            'email': self.email,
            'senha': self.senha
        }
