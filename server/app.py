from flask import Flask, request, g
import sqlite3
import json

app = Flask(__name__)

################################## DB ######################################

DATABASE = 'alexandry_library.db'

@app.after_request
def after_request(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    response.headers["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS, PUT, DELETE"
    response.headers["Access-Control-Allow-Headers"] = "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization"
    return response

def init_db():
    with app.app_context():
        db = get_db()
        with app.open_resource('files/schema.sql', mode='r') as f:
            db.cursor().executescript(f.read())
        db.commit()
        print('Database Initialized.')

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

def execute_query_db(query, args=()):
  db = get_db()
  db.execute(query, args)
  db.commit()

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

@app.route("/books", methods=['GET'])
def get_books():
  books = []

  for book in query_db('SELECT * FROM books'):
    books.append(book)

  return json.dumps(books)

@app.route("/books/<int:book_id>", methods=['GET'])
def get_book(book_id):

  book = query_db('SELECT * FROM books WHERE book_id = ?', [book_id], one=True)

  return json.dumps(book)

@app.route("/books", methods=['POST'])
def add_book():
  if (request.json['name'] == None) or (request.json['writer'] == None) or (request.json['release_year'] == None):
    return 'Please send all a name, writer and release year for the book.'

  try:
    execute_query_db('INSERT INTO books VALUES(NULL, ?, ?, ?)', [request.json['name'], request.json['writer'], request.json['release_year']])  
  except Exception as e:
    return str(e)

  return 'New book ' + request.json['name'] + ' from ' + request.json['writer'] + ' added successfully.'

@app.route("/books/<int:book_id>", methods=['PUT'])
def update_book(book_id):
  if (request.json['name'] == None) or (request.json['writer'] == None) or (request.json['release_year'] == None):
    return 'Please send all name, writer and release year for the book.'

  try:
    execute_query_db('UPDATE books SET name = ?, writer = ?, release_year = ? WHERE book_id = ?', [request.json['name'], request.json['writer'], request.json['release_year'], book_id])  
  except Exception as e:
    return str(e)

  return 'Book with id ' + str(book_id) + ' has been updated successfully.'

@app.route("/books/<int:book_id>", methods=['DELETE'])
def delete_book(book_id):
  execute_query_db('DELETE FROM books WHERE book_id = ?', [book_id])

  return 'Book with id ' + str(book_id) + ' has been deleted successfully.'