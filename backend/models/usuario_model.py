from extensions import db

class Usuario(db.Model):
    __tablename__ = "usuarios"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    senha = db.Column(db.String(200), nullable=False)
    nome = db.Column(db.String(100), nullable=True) # dps muda pra nullable=False
    ocupacao = db.Column(db.String(100), nullable=True)
    telefone = db.Column(db.String(100), nullable=True)
    foto_de_perfil = db.Column(db.String(100), nullable=True)
    is_admin = db.Column(db.Boolean, default=False, nullable=True)

    def __init__(self, 
                 nome=None, 
                 email=None, 
                 senha=None, 
                 ocupacao=None, 
                 telefone=None, 
                 foto_de_perfil=None,
                 is_admin=False):
        self.email = email
        self.senha = senha
        self.nome = nome
        self.ocupacao = ocupacao
        self.telefone = telefone
        self.foto_de_perfil = foto_de_perfil
        self.is_admin = is_admin

    def to_dict(self):
        return {
            'id': self.id,
            'nome': self.nome,
            'email': self.email,
            'telefone': self.telefone,
        }
