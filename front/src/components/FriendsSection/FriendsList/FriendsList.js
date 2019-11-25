import React, { useState } from 'react';

import { faCog, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import FriendsListStyle from './FriendsList.style';
import FriendComponents from './FriendComponents/FriendComponents';
import FriendComponentStyle from './FriendComponent.style';
import Icon from './Icons.style';
import DoneButton from './DoneButton.style';
import Input from './Input.style';
import FriendsSetModal from './FriendsSetModal/FriendsSetModal';

const FriendsList = () => {
  const [configMode, switchMode] = useState(false);
  const [modalInfo, setModal] = useState({ mode: false, nickname: null });
  const [inputValue, setValue] = useState('');
  const [refresh, setRefresh] = useState(true);

  function changeConfigMode() {
    switchMode((currentConfigMode) => !currentConfigMode);
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
        <FriendsSetModal
          mode={modalInfo.mode}
          nickname={modalInfo.nickname}
          modalOff={() => modalOnOff(false)}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      ) : null}

      <FriendsListStyle>
        {configMode ? (
          <>
            <FriendComponentStyle>
              <DoneButton onClick={changeConfigMode}>완료</DoneButton>
            </FriendComponentStyle>
            <FriendComponentStyle>
              <Input onChange={inputChangeHandler} />
              <Icon
                icon={faUserPlus}
                onClick={() => modalOnOff('add', inputValue)}
              />
            </FriendComponentStyle>
          </>
        ) : (
          <>
            <FriendComponentStyle>
              <span>친구 목록</span>
              <Icon icon={faCog} onClick={changeConfigMode} />
            </FriendComponentStyle>
          </>
        )}
        <FriendComponents
          modalOnOff={modalOnOff}
          configMode={configMode}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      </FriendsListStyle>
    </>
  );
};

export default FriendsList;
