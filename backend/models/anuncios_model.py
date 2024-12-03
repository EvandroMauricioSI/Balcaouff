from extensions import db
# from ..app import db

class Anuncio(db.Model):
    __tablename__ = 'anuncios'

    # id = db.Column(db.Integer, primary_key=True)
    # username = db.Column(db.String(80), unique=True, nullable=False)
    # nome = db.Column(db.String(100), nullable=False)
    # sobrenome = db.Column(db.String(100), nullable=False)
    # email = db.Column(db.String(120), unique=True, nullable=False)

    def json(self):
        pass
        # return {'id': self.id,'username': self.username, 'email': self.email}
