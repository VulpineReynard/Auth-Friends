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
          <div className="login-logout-container">
            <Link to="/login" className="login-btn">Login</Link>
            <Link onClick={() => localStorage.clear()} to="/login" className="logout-btn">Logout</Link>
          </div>
          <img src={logo} className="App-logo" alt="logo" />
          <div className="nav-container">
            <Link to="/protected" className="friends-btn">Friends</Link>
            <Link to="/protected"className="wip-btn">WIP</Link>
          </div>
        </header>
        <Route path="/login" component={LoginForm}/>
        <PrivateRoute path="/protected" component={FriendsList}/>
      </div>
    </Router>
  );
}

export default App;
