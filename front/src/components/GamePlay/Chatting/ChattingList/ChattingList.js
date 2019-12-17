import React, { useRef, useState, useEffect, useContext } from 'react';
import GlobalContext from 'global.context';
import GamePlayContext from 'components/GamePlay/GamePlay.context';
import useGameSocket from 'hooks/Socket/useGameSocket';
import ChattingListStyle from './ChattingList.style';
import Div from './Div.style';

export default function ChattingList() {
  const { gameSocket } = useContext(GlobalContext);
  const { userList } = useContext(GamePlayContext);
  const scrollRef = useRef(null);
  const [message, setMessage] = useState('');
  const [filteredMessageArr, pushFilteredMessage] = useState([]);
  const isPrivileged = userList.findIndex((user) => {
    if (user.socketId === gameSocket.id) {
      return user.privileged;
    }
    return false;
  });
  useGameSocket('getMessage', ({ content, privileged }) => {
    const splitRes = content.split(' : ');
    if (splitRes.length === 2 && splitRes[1] === '') return;
    setMessage({ content, privileged });
  });

  useEffect(() => {
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
  }, [filteredMessageArr, message, isPrivileged]);

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
