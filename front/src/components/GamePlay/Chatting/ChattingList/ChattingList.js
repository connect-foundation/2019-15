import React, { useRef, useState, useEffect, useContext } from 'react';
import GlobalContext from 'global.context';
import GamePlayContext from 'components/GamePlay/GamePlay.context';
import { initChattingHandler } from 'logics/socketLogic';
import ChattingListStyle from './ChattingList.style';
import Div from './Div.style';

export default function ChattingList() {
  const { gameSocket } = useContext(GlobalContext);
  const { userList } = useContext(GamePlayContext);
  const scrollRef = useRef(null);
  const [message, setMessage] = useState('');
  const [filteredMessageArr, pushFilteredMessage] = useState([]);
  const [init, setInit] = useState(true);
  const isPrivileged = userList.findIndex((user) => {
    if (user.socketId === gameSocket.id) {
      return user.privileged;
    }
    return false;
  });

  useEffect(() => {
    const initSocket = async () => {
      initChattingHandler(gameSocket, {
        setMessage,
      });
    };
    if (init) {
      setInit(false);
      initSocket();
    }

    if (!(isPrivileged === -1 && message.privileged === true)) {
      const isMessageIn = filteredMessageArr.findIndex((value) => {
        return value === message;
      });

      if (isMessageIn === -1) {
        pushFilteredMessage([...filteredMessageArr, message]);
      }
    }

    scrollRef.current.scrollTop =
      scrollRef.current.scrollHeight - scrollRef.current.clientHeight;
  }, [filteredMessageArr, init, gameSocket, message, isPrivileged, userList]);

  return (
    <ChattingListStyle ref={scrollRef}>
      {filteredMessageArr.map((value, idx) => {
        const order = idx + 1;
        return (
          <Div key={order} order={order} privileged={value.privileged}>
            {value.content}
          </Div>
        );
      })}
    </ChattingListStyle>
  );
}
