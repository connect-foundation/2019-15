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
  const [messages, pushMessage] = useState([]);
  const [init, setInit] = useState(true);
  const isPrivileged = userList.findIndex((user) => {
    if (user.socketId === gameSocket.id) {
      return user.privileged;
    }
    return false;
  });

  useEffect(() => {
    const initSocket = async () => {
      initChattingHandler(gameSocket, { messages, pushMessage });
    };
    if (init) {
      setInit(false);
      initSocket();
    }

    scrollRef.current.scrollTop =
      scrollRef.current.scrollHeight - scrollRef.current.clientHeight;
  }, [messages, init, gameSocket]);

  return (
    <ChattingListStyle ref={scrollRef}>
      {messages.map((value, idx) => {
        const order = idx + 1;
        if (isPrivileged === -1 && value.privileged === true) return null;
        return (
          <Div key={order} order={order} privileged={value.privileged}>
            {value.content}
          </Div>
        );
      })}
    </ChattingListStyle>
  );
}
