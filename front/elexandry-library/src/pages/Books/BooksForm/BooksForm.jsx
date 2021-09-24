import React, { useState, useEffect } from 'react';
import useFetch from 'use-http'
import { StyledContainer } from './BooksForm.style'
import { useParams } from 'react-router-dom';
import { InputGroup, FormControl, Button, Alert } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const BooksForm = () => {
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState(null);
  const { get, put, post, del, response } = useFetch(`${process.env.REACT_APP_API_URL}/books`, { cachePolicy: 'network-only'});
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      get(`/${id}`).then(data => {
        if (response.ok) {
          setFormData({
            writer: data.writer,
            name: data.name,
            release_year: data.release_year
          });
        }
      })
    }
  }, []);

  const callBackResponse = (result) => {
    if (response.ok) {
      setSuccesMessage(result?.message || 'L\'opération s\'est déroulé avec succès.');
      return
    }
    return setErrorMessage(result?.message || 'Une erreur est survenue, veuillez réessayer plus tard.');
  }

  const setSuccesMessage = (message) => {
    setMessage({
      variant: 'success',
      message
    });

    setTimeout(() => setMessage(null), 2000)
  }

  const setErrorMessage = (message) => {
    setMessage({
      variant: 'danger',
      message
    });
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      put(`/${id}`, formData).then(result => callBackResponse(result));
      return
    }
  
    post(formData).then(result => callBackResponse(result));
  }

  const handleDelete = (e, id) => {
    e.preventDefault();
    del(`/${id}`).then(result => callBackResponse(result));
    history.push('/books');
  }

  return (
    <StyledContainer>
      <Button
        type="submit"
        variant="primary"
        onClick={() => history.goBack()}
        className="mb-5"
      >
         <FontAwesomeIcon icon={faArrowAltCircleLeft} />
         &ensp;retour
      </Button>
        {!!message && (
          <Alert
            variant={message.variant}
            onClose={() => setMessage(null)}
            dismissible={message.variant === 'danger'}
          >
            {message.message}
          </Alert>
        )}
        <h2>Ajouter un livre</h2>
        <form>
          <InputGroup className="mb-3">
            <InputGroup.Text>Nom du livre</InputGroup.Text>
              <FormControl
                name="name"
                onChange={handleChange}
                value={formData?.name || ''}
                placeholder="Les Misérables.."
              />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Nom de l'écrivain</InputGroup.Text>
              <FormControl
                name="writer"
                onChange={handleChange}
                value={formData?.writer || ''}
                placeholder="Victor Hugo."
              />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Année de publication</InputGroup.Text>
              <FormControl
                name="release_year"
                onChange={handleChange}
                value={formData?.release_year || ''}
                placeholder="1862"
              />
          </InputGroup>
          <div className="btn-container">
            <Button
              type="submit"
              variant="success"
              onClick={(e) => handleSubmit(e)}
            >
              {id ? 'Modifer': 'Ajouter'}
            </Button>
            {id && (
              <Button
                type="submit"
                variant="danger"
                onClick={(e) => handleDelete(e, id)}
              >
                Supprimer
              </Button>
            )}
          </div>
        </form>
    </StyledContainer>
  )
}

export { BooksForm };
