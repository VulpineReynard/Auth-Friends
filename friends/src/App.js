import React from 'react';
import LoginForm from './components/LoginForm';
import FriendsList from './components/FriendsList';
import {BrowserRouter as Router, Route, Link } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import logo from './logo.svg';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Link to="/login" className="login-btn">Login</Link>
          <img src={logo} className="App-logo" alt="logo" />
          <Link to="/protected" className="friends-btn">Friends</Link>
        </header>
        <Route path="/login" component={LoginForm}/>
        <PrivateRoute exact path="/protected" component={FriendsList}/>
      </div>
    </Router>
  );
}

export default App;
