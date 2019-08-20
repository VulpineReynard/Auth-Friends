import React, { useState, useEffect } from 'react';
import Friend from './Friend';
import NewFriendsForm from './NewFriendForm';
import { axiosWithAuth } from '../Utilities/axiosWithAuth';

const FriendsList = () => {
  const [friendsList, setFriendsList] = useState([]);

  useEffect(() => {
    axiosWithAuth().get('http://localhost:5000/api/friends')
      .then(res => {
        console.log(res);
        setFriendsList(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])
  return (
    <div className="friends-view">
      <NewFriendsForm friendsList={friendsList} setFriendsList={setFriendsList}/>
      <div className="friends-container">
        <h2>My Friends</h2>
        {friendsList.map((friend, index) => <Friend friend={friend} key={index} setFriendsList={setFriendsList}/>)}
      </div>
    </div>
  );
}

export default FriendsList;