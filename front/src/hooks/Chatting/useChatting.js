import { useState, useEffect, useContext } from 'react';
import GlobalContext from 'global.context';
import GamePlayContext from 'components/GamePlay/GamePlay.context';
import useGameSocket from 'hooks/Socket/useGameSocket';

export default function useChatting() {
  const { gameSocket } = useContext(GlobalContext);
  const { gameState } = useContext(GamePlayContext);
  const { userList } = gameState;
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
  }, [filteredMessageArr, message, isPrivileged]);

  return filteredMessageArr;
}
