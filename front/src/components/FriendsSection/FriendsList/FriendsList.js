import React from 'react';
import { useState, useEffect } from 'react';
import { faCog, faUserPlus, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import FriendsListStyle from './FriendsList.style';
import FriendComponent from './FriendComponent/FriendComponent';
import Icon from './Icons.style';
import DoneButton from './DoneButton.style';
import Input from './Input.style';
import FriendsSetModal from './FriendsSetModal/FriendsSetModal';
import getFriends from '../../../logics/getFriends';

const FriendsList = (props) => {
  const [friends, setFriends] = useState([]);
  const [configMode, switchMode] = useState(false);
  const [modalInfo, setModal] = useState({ mode: false, nickname: null });
  const [inputValue, setValue] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      const newItems = await getFriends(4); // getFriends함수 인자로 현재 user의 id 넘겨줘야함
      setFriends(newItems.data.friends);
    };
    fetchItems();
  }, []);

  function changeConfigMode() {
    switchMode(!configMode);
  }

  function modalOnOff(mode, nickname) {
    setModal({ mode, nickname });
  }

  function inputChangeHandler(e) {
    setValue(e.target.value);
  }

  return (
    <>
      {modalInfo.mode ? (
        <FriendsSetModal mode={modalInfo.mode} nickname={modalInfo.nickname} modalOff={() => modalOnOff(false)} />
      ) : null}


      <FriendsListStyle>
        {configMode
          ? (
            <>
              <FriendComponent>
                <DoneButton onClick={changeConfigMode}>완료</DoneButton>
              </FriendComponent>
              <FriendComponent>
                <Input onChange={inputChangeHandler} />
                <Icon icon={faUserPlus} onClick={() => modalOnOff('add', inputValue)} />
              </FriendComponent>
          </>
          ) : (
          <>
            <FriendComponent>
                <span>친구 목록</span>
                <Icon icon={faCog} onClick={changeConfigMode} />
              </FriendComponent>
          </>
          )
        }


        {friends.map((friend, idx) => (
          <FriendComponent key={idx}>
            {friend.nickname}
            {configMode ? (
              <Icon
                icon={faMinusCircle}
                onClick={() => modalOnOff('delete', friend.nickname)}
              />
            ) : null}
          </FriendComponent>
        ))}
      </FriendsListStyle>
    </>
  );
};

export default FriendsList;
