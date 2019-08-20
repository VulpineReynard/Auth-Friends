import React, { useState } from 'react';
import axios from 'axios';
import { axiosWithAuth } from '../Utilities/axiosWithAuth';

const Friend = ({ friend, setFriendsList }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedFriend, setUpdatedFriend] = useState({
    name: friend.name,
    email: friend.email || '',
    age: friend.age || ''
  });

  const submitUpdatedFriend = (id) => {
    if(updatedFriend.name === '') {alert('Name cannot be empty'); return true;}
    axiosWithAuth().put(`http://localhost:5000/api/friends/${id}`, updatedFriend)
      .then(res => {
        console.log(res);
        setIsEditing(!isEditing);
        setFriendsList(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  };

  const handleChanges = (e) => {
    if (e.target.name === 'age') {
      setUpdatedFriend({
        ...updatedFriend,
        [e.target.name]: parseInt(e.target.value)
      });

    } else {
      setUpdatedFriend({
        ...updatedFriend,
        [e.target.name]: e.target.value
      });
    }
  }

  const deleteFriend = (id) => {
    axiosWithAuth().delete(`http://localhost:5000/api/friends/${id}`)
      .then(res => {
        console.log(res);
        setFriendsList(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
  <div className="friend-container">
    {isEditing === true ? (
    [
    <input 
    key={1}
    onChange={(e) => handleChanges(e)}
    value={updatedFriend.name}
    type="text"
    name="name"
    required
    />,

    <input 
    key={2}
    onChange={(e) => handleChanges(e)}
    value={updatedFriend.age}
    placeholder="age"
    type="number"
    name="age"
    />,

    <input 
    key={3}
    onChange={(e) => handleChanges(e)}
    value={updatedFriend.email}
    type="email"
    value={updatedFriend.email}
    name="email"
    />,

    <button key={4} onClick={() => submitUpdatedFriend(friend.id)}>Submit</button>
    ]
    ) : (
    [
    <p key={1}>{friend.name || null}</p>,
    <p key={2}>{friend.age || null}</p>,
    <p key={3}>{friend.email || null}</p>,
    <button key={4} onClick={(e) => setIsEditing(!isEditing)}>Edit Friend</button>,
    <br key={5}></br>,
    <button key={6} onClick={(e) => deleteFriend(friend.id)}>Delete Friend</button>
    ]
    )}
  </div>
  );
}

export default Friend;