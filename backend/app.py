from flask import Flask, jsonify
from flask_restx import Api

# namespaces das rotas
from routes.hello_routes import hello_ns

def create_app():
    app = Flask(__name__)

    # conexao com banco

    api.init_app(app)

    # adiciona namespaces 
    api.add_namespace(hello_ns)

    return app


# with app.app_context():
#     db.create_all()

api = Api()
app = create_app()

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
