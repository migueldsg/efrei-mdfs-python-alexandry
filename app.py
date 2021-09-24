from flask import Flask, request
import json

app = Flask(__name__)

data_path = 'files/books.json'
data = json.loads(open(data_path, "r").read())

@app.route("/")
def index():
  return "<h1>Hello, World!</h1></br><h3>ALEXANDRY API </br> developped by Miguel Dos Santos Goncalves, Lokman Aydogan and Adama Bayo</h3>"

#Recuperer tous les livres depuis le json : files/books.json
@app.route("/books", methods=['GET'])
def get_books():
    return data

#Recuperer un livre depuis le json : files/books.json
@app.route("/books/<int:book_id>", methods=['GET'])
def get_book(book_id):
    return 'book'

#Ajouter un nouveau livre dans le json : files/books.json
@app.route("/books", methods=['POST'])
def add_book():

  return 'new book'

#Modifier un livre du json : files/books.json
@app.route("/books/<int:book_id>", methods=['PUT'])
def update_book(book_id):

  return 'updated book'

#Supprimer un livre du json : files/books.json
@app.route("/books/<int:book_id>", methods=['DELETE'])
def delete_book(book_id):

  return 'book deleted'
