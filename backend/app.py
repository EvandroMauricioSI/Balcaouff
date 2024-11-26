import os
from dotenv import load_dotenv

from flask import Flask
from flask_restx import Api
from flask_sqlalchemy import SQLAlchemy

from extensions import db

load_dotenv()

# namespaces das rotas
from routes.hello_routes import hello_ns

# models
from models import usuario_model

api = Api()

# db = SQLAlchemy()
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')

api.add_namespace(hello_ns)

api.init_app(app)
db.init_app(app)

# class User(db.Model):
#     __tablename__ = 'users'

#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String(80), unique=True, nullable=False)
#     email = db.Column(db.String(120), unique=True, nullable=False)

#     def json(self):
#         return {'id': self.id,'username': self.username, 'email': self.email}

try:
    with app.app_context():
        db.create_all()
    print("Tabelas criadas com sucesso!")
except Exception as e:
    print(f"Erro ao criar as tabelas: {e}")

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
