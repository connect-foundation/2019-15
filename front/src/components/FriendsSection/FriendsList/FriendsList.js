import React from 'react';
import { useState, useEffect } from 'react';
import FriendsListStyle from './FriendsList.style';
import FriendComponent from './FriendComponent/FriendComponent';
import getFriends from '../../../logics/friends'

const FriendsList = props => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const newItems = await getFriends(1);         //getFriends함수 인자로 현재 user의 id 넘겨줘야함
      setFriends(newItems.data.friends);
    };
    fetchItems();
  }, []);

  return (
    <>
      <FriendsListStyle isVisible={props.isVisible}>
        {friends.map((friend,idx)=>{
        return (<FriendComponent key={idx}>{friend.nickname}</FriendComponent>);
        })}
      </FriendsListStyle>
    </>
  );
};

export default FriendsList;
