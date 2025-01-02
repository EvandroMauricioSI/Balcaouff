from extensions import db
from flask import Flask
from flask_restx import Api
from models.usuario_model import Usuario
from models.categorias_model import Categoria
from models.localizacao_model import Localizacao
from werkzeug.security import generate_password_hash

# namespaces das rotas
from routes.hello_routes import hello_ns
from routes.anuncios_routes import anuncios_ns
from routes.categorias_routes import categorias_ns
from routes.localizacao_routes import localizacao_ns
from routes.usuarios_routes import usuarios_ns

app = Flask(__name__)


# Configuração do banco de dados
DATABASE_URL="postgresql://psql:senha@localhost:5433/psqldb"
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URL

api = Api()
db.init_app(app)
api.init_app(app)

# Adicionando os namespaces corretamente
api.add_namespace(hello_ns)
api.add_namespace(usuarios_ns, path="/api/usuarios")
api.add_namespace(anuncios_ns, path="/api/anuncios")
api.add_namespace(localizacao_ns, path="/api/localizacao")
api.add_namespace(categorias_ns, path="/api/categorias")

with app.app_context():
    # Criando usuários de exemplo
    user1 = Usuario(nome="João", email="joao@example.com",
                    senha=generate_password_hash('12345'),
                    is_admin=True)
    user2 = Usuario(nome="Maria", email="maria@example.com",
                    senha=generate_password_hash('12345'), 
                    is_admin=False)
    user3 = Usuario(nome="Heleno", email="hellno@example.com",
                    senha=generate_password_hash('12345'), 
                    is_admin=False)
    user4 = Usuario(nome="Ana Maria", email="anamaria@example.com",
                    senha=generate_password_hash('12345'), 
                    is_admin=False)

    # Categorias de exemplo
    cat1 = Categoria(nome="Eletrônicos")
    cat2 = Categoria(nome="Móveis")

    # Localizações de exemplo
    loc1 = Localizacao(bairro="Ingá", cidade="Rio de Janeiro", estado="RJ")
    loc2 = Localizacao(bairro="São Paulo", cidade="São Paulo", estado="SP")

    try:
        db.session.add_all([user1, user2, user3, user4, cat1, cat2, loc1, loc2])
        db.session.commit()
        print("Banco populado com sucesso!")

    except Exception as e:
        db.session.rollback()  
        print("Erro ao popular o banco: {}".format(str(e)))
