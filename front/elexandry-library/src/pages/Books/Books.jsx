import React, { useState, useEffect } from 'react';
import useFetch from 'use-http'
import { StyledContainer } from './Books.style'

const Books = () => {
  const [books, setBooks] = useState([]);
  const { get, response } = useFetch(`${process.env.REACT_APP_API_URL}/books`);


  useEffect(() => {
    get().then(data => {
      if (response.ok) {
        setBooks(data);
      }
    })
  }, []);

  return (
    <StyledContainer>
      {books?.map(book => {
        return (
          <div>
            <div>{book.name}</div>
            <div>{book.author}</div>
            <div>{book.year}</div>
          </div>
        )
      })}
    </StyledContainer>
  )
}

export { Books };
