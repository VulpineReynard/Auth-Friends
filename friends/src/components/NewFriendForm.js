import React, { useState } from 'react';
import { axiosWithAuth } from '../Utilities/axiosWithAuth';

const NewFriendForm = ({ friendsList, setFriendsList }) => {
  const [isAddingNewFriend, toggleIsAddingNewFriend] = useState(false);
  const [newFriend, setNewFriend] = useState({
    name: '',
    email: ''
  });

  const handleChanges = (e) => {
    console.log(newFriend);
    if (e.target.name === 'age') {
      setNewFriend({
        ...newFriend,
        [e.target.name]: parseInt(e.target.value)
      });

    } else {
      setNewFriend({
        ...newFriend,
        [e.target.name]: e.target.value
      });
    }
  }

  const addNewFriend = (e) => {
    e.preventDefault();
    axiosWithAuth().post('http://localhost:5000/api/friends', newFriend)
      .then(res => {
        console.log(res);
        toggleIsAddingNewFriend(!isAddingNewFriend);
        setFriendsList(res.data);
        setNewFriend({
          name: '',
          email: ''
        });
      })
      .catch(err => {
        console.log(err);
      })
  }
  
  if (isAddingNewFriend) {
    return (
      <form 
      onSubmit={(e) => addNewFriend(e)} 
      className="new-friend-form"
      >
        <h2>Add A New Friend</h2>

        <input 
        name="name"
        placeholder="New Friend's Name"
        onChange={(e) => handleChanges(e)}
        value={newFriend.name}
        type="text"
        required
        />

        <input 
        name="age"
        placeholder="New Friend's Age"
        onChange={(e) => handleChanges(e)}
        type="number"
        />

        <input 
        name="email"
        placeholder="New Friend's Email"
        onChange={(e) => handleChanges(e)}
        type="email"
        value={newFriend.email}
        />

        <button>Submit</button>
        <button onClick={(e) => {e.preventDefault(); toggleIsAddingNewFriend(!isAddingNewFriend)}}>Go Back</button>
      </form>
    );
  } else {
    return (
      <button className="add-friend-btn" onClick={(e) => toggleIsAddingNewFriend(!isAddingNewFriend)}>
        Add New Friend
      </button>
    );
  }
}

export default NewFriendForm;