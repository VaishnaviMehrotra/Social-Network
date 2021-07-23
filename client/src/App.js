import React, { useState, useContext } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import HomePage from './components/HomePage';
import Home from './components/Home';
import Header from './components/Header';
import { UserProvider } from "./context/UserContext";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PostProvider } from "./context/PostContext";
import Profile from "./components/profile/Profile"
import "./App.css"
export default function App() {
  return (
    <Router>
      <UserProvider>
        <PostProvider>
          <Switch>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/register" component={Register}></Route>
            <Route exact path="/profile" component={Profile}></Route>
            <Route exact path="/" component={Home}></Route>
          </Switch>  
        </PostProvider>
      </UserProvider>
    </Router>
  );
}