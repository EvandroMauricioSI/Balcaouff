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
                    senha=generate_password_hash('admin'),
                    admin=True)
    user2 = Usuario(nome="Maria", email="maria@example.com",
                    senha=generate_password_hash('12345'),
                    admin=False)
    user3 = Usuario(nome="Heleno", email="hellno@example.com",
                    senha=generate_password_hash('12345'),
                    admin=False)
    user4 = Usuario(nome="Ana Maria", email="anamaria@example.com",
                    senha=generate_password_hash('12345'),
                    admin=False)
    user5 = Usuario(nome="Camila Alvarez", email="camialvarez@example.com",
                    senha=generate_password_hash('12345'),
                    admin=False)
    user6 = Usuario(nome="Pedro Silva", email="pedro.silva@example.com",
                    senha=generate_password_hash('12345'),
                    admin=False)
    user7 = Usuario(nome="Juliana Costa", email="juliana.costa@example.com",
                    senha=generate_password_hash('admin'),
                    admin=True)

    cat1 = Categoria(nome="Eletrônicos")
    cat2 = Categoria(nome="Livros e Material de Estudo")
    cat3 = Categoria(nome="Móveis e Decoração")
    cat4 = Categoria(nome="Roupas e Acessórios")
    cat5 = Categoria(nome="Transportes")
    cat6 = Categoria(nome="Serviços")
    cat7 = Categoria(nome="Esportes e Lazer")
    cat8 = Categoria(nome="Imóveis")
    cat9 = Categoria(nome="Tecnologia")


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
    loc16 = Localizacao(bairro="Laranjeiras", cidade="Rio de Janeiro", estado="RJ")
    loc17 = Localizacao(bairro="Centro", cidade="São Gonçalo", estado="RJ")
    loc18 = Localizacao(bairro="Méier", cidade="Rio de Janeiro", estado="RJ")
    loc19 = Localizacao(bairro="Santa Teresa", cidade="Rio de Janeiro", estado="RJ")
    loc20 = Localizacao(bairro="Recreio", cidade="Rio de Janeiro", estado="RJ")


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

    anuncio4 = Anuncio(
        tipo="Doação",
        descricao="Roupa de bebê, vários tamanhos e boas condições.",
        preco=0.00,  # Doação, sem preço
        foto=None,
        categoria=4,  # Roupas e Acessórios
        condicao_produto="Usado",
        anunciante=3,  # ID do usuário Heleno
        local=3,  # São Domingos
        status=True,
    )

    anuncio5 = Anuncio(
        tipo="Venda",
        descricao="Apartamento de 2 quartos no centro de São Gonçalo.",
        preco=180000.00,
        foto=None,
        categoria=8,  # Imóveis
        condicao_produto="Novo",
        anunciante=4,  # Ana Maria
        local=17,  # Centro - São Gonçalo
        status=True,
    )

    anuncio6 = Anuncio(
        tipo="Troca",
        descricao="Bicicleta de montanha em bom estado, troca por notebook.",
        preco=0.00,
        foto=None,
        categoria=7,  # Esportes e Lazer
        condicao_produto="Usado",
        anunciante=5,  # Camila Alvarez
        local=16,  # Laranjeiras
        status=True,
    )

    anuncio7 = Anuncio(
        tipo="Venda",
        descricao="Cadeira de escritório ergonômica, pouco usada.",
        preco=450.00,
        foto=None,
        categoria=3,  # Móveis e Decoração
        condicao_produto="Usado",
        anunciante=2,  # Maria
        local=5,  # Fonseca
        status=True,
    )

    anuncio8 = Anuncio(
        tipo="Doação",
        descricao="Livros de romance, boa condição.",
        preco=0.00,  # Doação
        foto=None,
        categoria=2,  # Livros e Material de Estudo
        condicao_produto="Usado",
        anunciante=3,  # Heleno
        local=8,  # Parada 40
        status=True,
    )

    anuncio9 = Anuncio(
        tipo="Venda",
        descricao="Console PlayStation 4 com dois controles e 5 jogos.",
        preco=1500.00,
        foto=None,
        categoria=1,  # Eletrônicos
        condicao_produto="Usado",
        anunciante=4,  # Ana Maria
        local=13,  # Copacabana
        status=True,
    )

    anuncio10 = Anuncio(
        tipo="Troca",
        descricao="Smartphone Samsung Galaxy S21, troca por iPhone.",
        preco=0.00,  # Troca
        foto=None,
        categoria=1,  # Eletrônicos
        condicao_produto="Usado",
        anunciante=5,  # Camila Alvarez
        local=12,  # Botafogo
        status=True,
    )

    anuncio11 = Anuncio(
        tipo="Venda",
        descricao="Mesa de jantar de madeira maciça, 6 lugares.",
        preco=2000.00,
        foto=None,
        categoria=3,  # Móveis e Decoração
        condicao_produto="Usado",
        anunciante=1,  # João
        local=4,  # Santa Rosa
        status=True,
    )

    anuncio12 = Anuncio(
        tipo="Doação",
        descricao="Cachorro Labrador adulto, vacinado e saudável.",
        preco=0.00,  # Doação
        foto=None,
        categoria=7,  # Esportes e Lazer
        condicao_produto="Novo",
        anunciante=6,  # Pedro Silva
        local=16,  # Laranjeiras
        status=True,
    )

    anuncio13 = Anuncio(
        tipo="Venda",
        descricao="MacBook Pro 16 polegadas, modelo 2021, novo na caixa.",
        preco=14000.00,
        foto=None,
        categoria=9,  # Tecnologia
        condicao_produto="Novo",
        anunciante=7,  # Juliana Costa
        local=11,  # Centro (RJ)
        status=True,
    )

    anuncio14 = Anuncio(
        tipo="Troca",
        descricao="Moto Honda CG 160, troca por carro popular.",
        preco=0.00,  # Troca
        foto=None,
        categoria=5,  # Transportes
        condicao_produto="Usado",
        anunciante=2,  # Maria
        local=19,  # Santa Teresa
        status=True,
    )

    anuncio15 = Anuncio(
        tipo="Venda",
        descricao="Ar-condicionado Split, 12.000 BTUs, semi-novo.",
        preco=1200.00,
        foto=None,
        categoria=1,  # Eletrônicos
        condicao_produto="Usado",
        anunciante=4,  # Ana Maria
        local=14,  # Tijuca
        status=True,
    )

    try:
        db.session.add_all([
            user1, user2, user3, user4, user5,user6, user7,
            cat1, cat2, cat3, cat4, cat5, cat6,cat7,cat8, cat9,
            loc1, loc2, loc3, loc4, loc5,
            loc6, loc7, loc8, loc9, loc10,
            loc11, loc12, loc13, loc14, loc15, loc16, loc17, loc18, loc19, loc20
        ])
        db.session.commit()

        # Inserção de Anúncios no banco.
        db.session.add_all([
            anuncio1, anuncio2, anuncio3, anuncio4, anuncio5, anuncio6, anuncio7, anuncio8, anuncio9, anuncio10, anuncio11, anuncio12, anuncio13, anuncio14, anuncio15
        ])
        db.session.commit()

        print("Banco populado com sucesso!")

    except Exception as e:
        db.session.rollback()  
        print("Erro ao popular o banco: {}".format(str(e)))
