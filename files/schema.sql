DROP TABLE IF EXISTS books;

CREATE TABLE books (
  book_id INTEGER PRIMARY KEY,
  name VARCHAR(100),
  writer VARCHAR(50),
  release_year INTEGER(4)
);

-- INSERT INTO books VALUES 
--   (NULL, 'First Book', 'Walter Writer', 2021),
--   (NULL, 'Second Book', 'Random Man', 2018),
--   (NULL, 'Third Book', 'John Doe', 2002),
--   (NULL, 'Fourth Book', 'Some Writer', 1992);