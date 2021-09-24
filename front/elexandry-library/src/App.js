import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { NavBar } from "./components/NavBar";

import { Books } from "./pages/Books";

export default function App() {
  return (
    <Router>
      <>
        <NavBar />
        <Switch>
          <Route exact path="/books">
            <Books />
          </Route>
          <Route exact path="/books/add">
            <Users />
          </Route>
          <Route exact path="/books/edit/:id">
            <Home />
          </Route>
        </Switch>
      </>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function Users() {
  return <h2>Users</h2>;
}