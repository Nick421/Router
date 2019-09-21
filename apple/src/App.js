<<<<<<< HEAD
import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppRouter from "./AppRouter"

function App() {
  return (
    <AppRouter/>
=======
import React from "react";
import NavBar from "./components/NavBar";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import Profile from "./components/Profile";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <NavBar />
        </header>
        <Switch>
          <Route path="/" exact />
          <PrivateRoute path="/profile" component={Profile} />
        </Switch>
      </BrowserRouter>
    </div>
>>>>>>> 70066711d4363eb61695ac44abbafa76c0920a8f
  );
}

export default App;
