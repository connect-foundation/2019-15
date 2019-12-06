import React, { useRef, useState, useEffect, useContext } from 'react';
import GlobalContext from 'global.context';
import { initChattingHandler } from 'logics/socketLogic';
import ChattingListStyle from './ChattingList.style';
import Div from './Div.style';

export default function ChattingList() {
  const { gameSocket } = useContext(GlobalContext);

  const scrollRef = useRef(null);
  const [messages, pushMessage] = useState([]);
  const [init, setInit] = useState(true);

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
        return (
          <Div key={order} order={order} privileged={value.privileged}>
            {value.content}
          </Div>
        );
      })}
    </ChattingListStyle>
  );
}
