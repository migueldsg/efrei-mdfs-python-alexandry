from flask import Flask, request, g
import sqlite3
import json

app = Flask(__name__)

################################## DB ######################################

DATABASE = 'alexandry_library.db'

def init_db():
    with app.app_context():
        db = get_db()
        with app.open_resource('files/schema.sql', mode='r') as f:
            db.cursor().executescript(f.read())
        db.commit()

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
        db.row_factory = make_dicts
    return db

def query_db(query, args=(), one=False):
    cur = get_db().execute(query, args)
    rv = cur.fetchall()
    cur.close()
    return (rv[0] if rv else None) if one else rv    

def make_dicts(cursor, row):
    return dict((cursor.description[idx][0], value)
                for idx, value in enumerate(row))

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

with app.app_context():
  init_db()

################################ DB ########################################

@app.route("/")
def index():
  return "<h1>Hello, World!</h1></br><h3>ALEXANDRY API </br> developped by Miguel Dos Santos Goncalves, Lokman Aydogan and Adama Bayo</h3>"

#Recuperer tous les livres depuis le json : files/books.json
@app.route("/books", methods=['GET'])
def get_books():
  books = []

  for book in query_db('SELECT * FROM books'):
    books.append(book)

  return json.dumps(books)

#Recuperer un livre depuis le json : files/books.json
@app.route("/books/<int:book_id>", methods=['GET'])
def get_book(book_id):

  book = query_db('SELECT * FROM books WHERE book_id = ?', [book_id], one=True)

  return json.dumps(book)

#Ajouter un nouveau livre dans le json : files/books.json
@app.route("/books", methods=['POST'])
def add_book():
  if (request.json['name'] == None) or (request.json['writer'] == None) or (request.json['release_year'] == None):
    return 'Please send all a name, writer and release year for the book.'

  query_db('INSERT INTO books VALUES(NULL, ?, ?, ?)', [request.json['name'], request.json['writer'], request.json['release_year']])  

  return 'New book ' + request.json['name'] + ' from ' + request.json['writer'] + ' added successfully.'

#Modifier un livre du json : files/books.json
@app.route("/books/<int:book_id>", methods=['PUT'])
def update_book(book_id):

  return 'updated book'

#Supprimer un livre du json : files/books.json
@app.route("/books/<int:book_id>", methods=['DELETE'])
def delete_book(book_id):

  query_db('DELETE FROM books WHERE book_id = ?', [book_id], one=True)

  return 'Book with which id is ' + str(book_id) + ' has been deleted successfully.'
