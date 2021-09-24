DROP TABLE IF EXISTS books;

CREATE TABLE books (
  book_id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(100) UNIQUE NOT NULL,
  writer VARCHAR(50) NOT NULL,
  release_year INTEGER(4) NOT NULL
);

INSERT INTO books VALUES 
  (NULL, 'First Book', 'Walter Writer', 2021),
  (NULL, 'Second Book', 'Random Man', 2018),
  (NULL, 'Third Book', 'John Doe', 2002),
  (NULL, 'Fourth Book', 'Some Writer', 1992);