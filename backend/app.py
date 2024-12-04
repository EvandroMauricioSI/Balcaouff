import os
from dotenv import load_dotenv
from extensions import db
from flask import Flask
from flask_restx import Api
from flask_sqlalchemy import SQLAlchemy

# namespaces das rotas
from routes.hello_routes import hello_ns
from routes.anuncios_routes import anuncios_ns
from routes.categorias_routes import categorias_ns
from routes.localizacao_routes import localizacao_ns
from routes.usuarios_routes import usuarios_ns

# adicionando namespaces
api.add_namespace(hello_ns)
api.add_namespace(usuarios_ns)
api.add_namespace(anuncios_ns)
api.add_namespace(localizacao_ns)
api.add_namespace(categorias_ns)

# Importar todos os models
from models.anuncios_model import Anuncio
from models.usuario_model import Usuario
from models.localizacao_model import Localizacao
from models.categorias_model import Categoria


load_dotenv()

api = Api()

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")



api.init_app(app)
db.init_app(app)

try:
    with app.app_context():
        db.create_all()
    print("Tabelas criadas com sucesso!")
except Exception as e:
    print(f"Erro ao criar as tabelas: {e}")

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
