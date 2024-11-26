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

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')

api.add_namespace(hello_ns)

api.init_app(app)
db.init_app(app)

try:
    with app.app_context():
        db.create_all()
    print("Tabelas criadas com sucesso!")
except Exception as e:
    print(f"Erro ao criar as tabelas: {e}")

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
