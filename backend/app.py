from flask import Flask, jsonify

app = Flask(__name__)

# Rota para testar o back-end
@app.route('/', methods=['GET'])
def start():
    return jsonify({"message": "Hello World!"})

if __name__ == '__main__':
    app.run(debug=True)
