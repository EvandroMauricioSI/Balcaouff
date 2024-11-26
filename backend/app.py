import os
from dotenv import load_dotenv

from flask import Flask
from flask_restx import Api
from sqlalchemy import create_engine
# from extensions import db
from flask_sqlalchemy import SQLAlchemy

load_dotenv()

# namespaces das rotas
# from routes.hello_routes import hello_ns


# def create_app():
#     app = Flask(__name__)

#     print("POSTGRES_USER:", os.getenv("POSTGRES_USER"))
#     print("POSTGRES_PASSWORD:", os.getenv("POSTGRES_PASSWORD"))
#     print("POSTGRES_HOST:", os.getenv("POSTGRES_HOST"))
#     print("POSTGRES_PORT:", os.getenv("POSTGRES_PORT"))
#     print("POSTGRES_DB:", os.getenv("POSTGRES_DB"))
#     print("DATABASE_URL:", os.getenv("DATABASE_URL"))

#     # configure_database(app) 
#     # app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
#     app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://psql:senha@localhost:5432/psqldb"
#     db = SQLAlchemy(app)

#     api.init_app(app)

#     # adiciona namespaces 
#     api.add_namespace(hello_ns)

#     return app, db


# api = Api()
# app, db = create_app()

# try:
#     with app.app_context():
#         db.create_all()
#     print("Tabelas criadas com sucesso!")
# except Exception as e:
#     print(f"Erro ao criar as tabelas: {e}")

db = SQLAlchemy()
app = Flask(__name__)
print("aaaaaaaaaaaaaaaaaa", os.getenv('DATABASE_URL'))
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
db.init_app(app)

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    def json(self):
        return {'id': self.id,'username': self.username, 'email': self.email}

try:
    with app.app_context():
        db.create_all()
    print("Tabelas criadas com sucesso!")
except Exception as e:
    print(f"Erro ao criar as tabelas: {e}")

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
