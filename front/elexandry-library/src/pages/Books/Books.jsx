import React, { useState, useEffect } from 'react';
import useFetch from 'use-http'
import { StyledContainer } from './Books.style'
import { Alert, Table, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom';

const Books = () => {
  const [books, setBooks] = useState([]);
  const { get, response } = useFetch(`${process.env.REACT_APP_API_URL}/books`);
  const history = useHistory();


  useEffect(() => {
    get().then(data => {
      if (response.ok) {
        setBooks(data);
      }
    })

  }, []);

  return (
    <StyledContainer>
      <Button
        type="submit"
        variant="success"
        onClick={() => history.push('books/add/')}
        className="mb-5"
      >
         Ajouter un livre
      </Button>
      {books.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nom du livre</th>
              <th>Autheur</th>
              <th>Année de publication</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {books?.map(book => {
              return (
                <tr>
                  <td>{book.name}</td>
                  <td>{book.writer}</td>
                  <td>{book.release_year}</td>
                  <td>
                    <Button
                      type="submit"
                      variant="primary"
                      onClick={(e) => history.push(`books/edit/${book.id}`)}
                    >
                       <FontAwesomeIcon icon={faEdit} />
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>)
        : (
          <Alert variant="danger">
            {"Aucun livre pour le moment ! Reviens plus tard :)"}
          </Alert>
        )
      }
    </StyledContainer>
  )
}

export { Books };
