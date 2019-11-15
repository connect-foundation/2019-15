import React from 'react';
import { useState, useEffect } from 'react';
import FriendsListStyle from './FriendsList.style';
import FriendComponent from './FriendComponent/FriendComponent';

//friendslist는 아직 friends db와 연동을 못시켜서
//users db의 nickname을 불러옵니다.
const query = `{
  users{
    nickname
  }
}`;

const opts = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query }),
};

async function getAllUsers() {
  const response = await fetch('/api', opts);
  const responseJson = await response.json();
  return responseJson;
}

const FriendsList = props => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const newItems = await getAllUsers();
      setUsers(newItems.data.users||[]);
    };
    fetchItems();
  }, []);

  return (
    <>
      <FriendsListStyle isVisible={props.isVisible}>
        {users.map((user, index)=>{
          return (<FriendComponent key={index}>{user.nickname}</FriendComponent>);
        })}
      </FriendsListStyle>
    </>
  );
};

export default FriendsList;
