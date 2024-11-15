from flask import Flask, jsonify

app = Flask(__name__)

# Rota para testar o back-end
@app.route('/api/login', methods=['GET'])
def login():
    return jsonify({"message": "Login page"})

if __name__ == '__main__':
    app.run(debug=True)
