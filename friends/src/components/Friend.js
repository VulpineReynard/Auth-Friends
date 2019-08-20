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
    onChange={(e) => handleChanges(e)}
    value={updatedFriend.name}
    type="text"
    name="name"
    required
    />,

    <input 
    onChange={(e) => handleChanges(e)}
    value={updatedFriend.age}
    placeholder="age"
    type="number"
    name="age"
    />,

    <input 
    onChange={(e) => handleChanges(e)}
    value={updatedFriend.email}
    type="email"
    value={updatedFriend.email}
    name="email"
    />,

    <button onClick={() => submitUpdatedFriend(friend.id)}>Submit</button>
    ]
    ) : (
    [
    <p>{friend.name || null}</p>,
    <p>{friend.age || null}</p>,
    <p>{friend.email || null}</p>,
    <button onClick={(e) => setIsEditing(!isEditing)}>Edit Friend</button>,
    <br></br>,
    <button onClick={(e) => deleteFriend(friend.id)}>Delete Friend</button>
    ]
    )}
  </div>
  );
}

export default Friend;