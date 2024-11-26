import os
from dotenv import load_dotenv

from flask import Flask
from flask_restx import Api
from sqlalchemy import create_engine
from extensions import db

load_dotenv()

# namespaces das rotas
from routes.hello_routes import hello_ns

def configure_database(app):
    database_uri = 'postgresql://{username}:{password}@{host}:{port}/{database}'.format(
        username=os.getenv('POSTGRES_USER'),
        password=os.getenv('POSTGRES_PASSWORD'),
        host=os.getenv('POSTGRES_HOST'),
        port=os.getenv('POSTGRES_PORT'),
        database=os.getenv('POSTGRES_DB')
    )
    
    app.config['SQLALCHEMY_DATABASE_URI'] = database_uri
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
        'connect_args': {'options': '-c client_encoding=UTF8'}
    }

    db.init_app(app)

def create_app():
    app = Flask(__name__)

    print("POSTGRES_USER:", os.getenv("POSTGRES_USER"))
    print("POSTGRES_PASSWORD:", os.getenv("POSTGRES_PASSWORD"))
    print("POSTGRES_HOST:", os.getenv("POSTGRES_HOST"))
    print("POSTGRES_PORT:", os.getenv("POSTGRES_PORT"))
    print("POSTGRES_DB:", os.getenv("POSTGRES_DB"))

    
    configure_database(app) 

    api.init_app(app)

    # adiciona namespaces 
    api.add_namespace(hello_ns)

    return app


# with app.app_context():
#     db.create_all()

api = Api()
app = create_app()

try:
    with app.app_context():
        db.create_all()
    print("Tabelas criadas com sucesso!")
except Exception as e:
    print(f"Erro ao criar as tabelas: {e}")

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
