import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css' ;

import { NavBar } from "./components/NavBar";

import { Books } from "./pages/Books";
import { BooksForm } from "./pages/Books/BooksForm";

import { Container } from 'react-bootstrap'

export default function App() {
  return (
    <Router>
      <>
        <NavBar />
        <Container className="mt-5">
          <Switch>
            <Route exact path="/">
              <Books />
            </Route>
            <Route exact path="/books">
              <Books />
            </Route>
            <Route exact path="/books/add">
              <BooksForm />
            </Route>
            <Route exact path="/books/edit/:id">
              <BooksForm />
            </Route>
          </Switch>
        </Container>
      </>
    </Router>
  );
}