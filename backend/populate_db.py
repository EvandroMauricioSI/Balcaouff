from extensions import db
from flask import Flask
from flask_restx import Api
from models.usuario_model import Usuario
from models.categorias_model import Categoria
from models.localizacao_model import Localizacao
from models.anuncios_model import Anuncio
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
    user5 = Usuario(nome="Camila Alvarez", email="camialvarez@example.com",
                    senha=generate_password_hash('12345'),
                    is_admin=False)

    cat1 = Categoria(nome="Eletrônicos")
    cat2 = Categoria(nome="Livros e Material de Estudo")
    cat3 = Categoria(nome="Móveis e Decoração")
    cat4 = Categoria(nome="Roupas e Acessórios")
    cat5 = Categoria(nome="Transportes")
    cat6 = Categoria(nome="Serviços")

    loc1 = Localizacao(bairro="Ingá", cidade="Niterói", estado="RJ")
    loc2 = Localizacao(bairro="Icaraí", cidade="Niterói", estado="RJ")
    loc3 = Localizacao(bairro="São Domingos", cidade="Niterói", estado="RJ")
    loc4 = Localizacao(bairro="Santa Rosa", cidade="Niterói", estado="RJ")
    loc5 = Localizacao(bairro="Fonseca", cidade="Niterói", estado="RJ")
    loc6 = Localizacao(bairro="Alcântara", cidade="São Gonçalo", estado="RJ")
    loc7 = Localizacao(bairro="Trindade", cidade="São Gonçalo", estado="RJ")
    loc8 = Localizacao(bairro="Parada 40", cidade="São Gonçalo", estado="RJ")
    loc9 = Localizacao(bairro="Jardim Catarina", cidade="São Gonçalo", estado="RJ")
    loc10 = Localizacao(bairro="Colubandê", cidade="São Gonçalo", estado="RJ")
    loc11 = Localizacao(bairro="Centro", cidade="Rio de Janeiro", estado="RJ")
    loc12 = Localizacao(bairro="Botafogo", cidade="Rio de Janeiro", estado="RJ")
    loc13 = Localizacao(bairro="Copacabana", cidade="Rio de Janeiro", estado="RJ")
    loc14 = Localizacao(bairro="Tijuca", cidade="Rio de Janeiro", estado="RJ")
    loc15 = Localizacao(bairro="Madureira", cidade="Rio de Janeiro", estado="RJ")

    # Criando anúncios de exemplo
    anuncio1 = Anuncio(
        tipo="Venda",
        descricao="Notebook Dell Inspiron 14, excelente para estudos.",
        preco=3500.00,
        foto=None,
        categoria=1,  # Correspondente ao ID da categoria "Eletrônicos"
        condicao_produto="Usado",
        anunciante=1,  # ID do usuário João
        local=1,  # Localização Ingá
        status=True,
    )

    anuncio2 = Anuncio(
        tipo="Troca",
        descricao="Livro 'Python para Análise de Dados', ótimo estado.",
        preco=0.00,  # Troca, sem preço definido
        foto=None,
        categoria=2,  # Correspondente ao ID da categoria "Livros e Material de Estudo"
        condicao_produto="Usado",
        anunciante=2,  # ID do usuário Maria
        local=2,  # Localização Icaraí
        status=True,
    )

    anuncio3 = Anuncio(
        tipo="Venda",
        descricao="Fone de ouvido Bluetooth, novo na caixa.",
        preco=120.00,
        foto=None,
        categoria=1,  # Eletrônicos
        condicao_produto="Novo",
        anunciante=1,
        local=2,
        status=True,
    )

    try:
        db.session.add_all([
            user1, user2, user3, user4, user5,
            cat1, cat2, cat3, cat4, cat5, cat6,
            loc1, loc2, loc3, loc4, loc5,
            loc6, loc7, loc8, loc9, loc10,
            loc11, loc12, loc13, loc14, loc15
        ])
        db.session.commit()

        # Inserção de Anúncios no banco.
        db.session.add_all([
            anuncio1, anuncio2, anuncio3
        ])
        db.session.commit()

        print("Banco populado com sucesso!")

    except Exception as e:
        db.session.rollback()  
        print("Erro ao popular o banco: {}".format(str(e)))
