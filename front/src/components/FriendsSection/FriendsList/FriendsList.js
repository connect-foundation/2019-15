import React from 'react';
import { useState, useEffect } from 'react';
import { faCog, faUserPlus, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import FriendsListStyle from './FriendsList.style';
import FriendComponent from './FriendComponent/FriendComponent';
import IconStyle from './Icons.style';
import DoneButtonStyle from './DoneButton.style';
import InputStyle from './Input.style';
import getFriends from '../../../logics/friends';

const FriendsList = (props) => {
  const [friends, setFriends] = useState([]);
  const [configMode, switchMode] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      const newItems = await getFriends(4); // getFriends함수 인자로 현재 user의 id 넘겨줘야함
      setFriends(newItems.data.friends);
    };
    fetchItems();
  }, []);

  function changeMode() {
    switchMode(!configMode);
  }

  return (
    <>
      <FriendsListStyle>
        {configMode
          ? (
          <>
            <FriendComponent>
              <DoneButtonStyle onClick={changeMode}>완료</DoneButtonStyle>
            </FriendComponent>
            <FriendComponent>
              <InputStyle type="text" />
              <IconStyle icon={faUserPlus}/>
            </FriendComponent>
          </>
          ) : (
          <>
            <FriendComponent>
              <span>친구 목록</span>
              <IconStyle icon={faCog} onClick={changeMode} />
            </FriendComponent>
          </>
        )}
        {friends.map((friend, idx) => (
          <FriendComponent key={idx}>
            {friend.nickname}
            {configMode ? <IconStyle icon={faMinusCircle}/> : null}
          </FriendComponent>
        ))}
      </FriendsListStyle>
    </>
  );
};

export default FriendsList;
